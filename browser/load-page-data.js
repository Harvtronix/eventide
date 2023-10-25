import { MessageType } from './protocol/protocol-message.js'
import { ProtocolSocket } from './protocol/protocol-socket.js'

export async function loadPageData(_event, url) {
  const parts = /^(evn:\/\/)(.+)\/(.+)$/.exec(url)

  if (!parts) {
    return undefined
  }

  const [, protocol, host, filePath] = parts

  console.log(`${protocol}, ${host}, ${filePath}`)

  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  const socket = new ProtocolSocket(host, filePath)
  socket.on('message', (msg) => {
    if (msg.type === MessageType.server.OK) {
      resolve(msg.body)
    } else {
      reject(msg)
    }
  })
  socket.connect()

  return promise
}
