import { createConnection } from 'net'

import { ProtocolMessage, MessageType } from './protocol-message.js'

export class ProtocolSocket {
  _callbacks = {
    message: undefined,
    error: undefined,
    close: undefined
  }

  host
  filePath
  _socket

  constructor(host, filePath) {
    this.host = host
    this.filePath = filePath
  }

  connect() {
    this._socket = createConnection({
      port: 8088,
      host: this.host,
      timeout: 30
    })
    console.log('connecting to server')

    let state = 'reading_header'
    let messageHeader = []
    let messageBody = []
    let messageBodyLength = 0

    this._socket.on('connect', () => {
      console.log('server connected')
      const message = new ProtocolMessage(
        0,
        MessageType.client.QUERY,
        this.filePath
      )
      this._socket.write(message.toBytes())
    })
    this._socket.on('data', (data) => {
      console.log('received data from server')
      data.forEach((val) => {
        switch (state) {
          case 'reading_header':
            messageHeader.push(val)
            if (messageHeader.length === 6) {
              messageBodyLength |= messageHeader[2] << 0o30
              messageBodyLength |= messageHeader[3] << 0o20
              messageBodyLength |= messageHeader[4] << 0o10
              messageBodyLength |= messageHeader[5] << 0o00
              state = 'reading_body'
            }
            break
          case 'reading_body':
            messageBody.push(val)
            if (messageBody.length === messageBodyLength) {
              const msg = new ProtocolMessage(
                messageHeader[0],
                messageHeader[1],
                Buffer.from(messageBody).toString('utf8')
              )
              this._callbacks.message?.(msg)
              state = 'reading_header'
              messageHeader = []
              messageBody = []
              messageBodyLength = 0
            }
            break
          default:
            throw new Error('unknown state: ' + state)
        }
      })
    })
    this._socket.on('close', () => {
      this._callbacks.close?.()
    })
    this._socket.on('error', () => {
      this._callbacks.error?.('oops')
    })
  }

  /**
   *
   * @param {keyof ProtocolSocket._callbacks} type
   * @param {(val: any) => void} callback
   */
  on(type, callback) {
    this._callbacks[type] = callback
  }
}
