/*
message format:
  channel_id[1]
  message_type[1]: client: [EMIT, QUERY], server: [OK, ERROR, DATA, END]
                    EMIT -> OK|ERROR, QUERY->ERROR|DATA|END
  message_length[4]
  message_body[message_length]
*/

export const MessageType = {
  client: {
    EMIT: 0,
    QUERY: 1
  },
  server: {
    OK: 0,
    ERROR: 1,
    DATA: 2,
    END: 3
  }
}

export class ProtocolMessage {
  channelId
  type
  length
  body

  /**
   * Default constructor.
   *
   * @param {number} channelId
   * @param {number} type
   * @param {string} body
   */
  constructor(channelId, type, body) {
    this.channelId = channelId
    this.type = type
    this.body = body
    this.length = body.length
  }

  toBytes() {
    return new Buffer.from([
      0,
      MessageType.client.QUERY,
      (this.length >> 0o30) & 0xff,
      (this.length >> 0o20) & 0xff,
      (this.length >> 0o10) & 0xff,
      (this.length >> 0o00) & 0xff,
      ...Buffer.from(this.body)
    ])
  }
}
