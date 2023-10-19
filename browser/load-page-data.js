const { createConnection } = require('node:net')

async function loadPageData(_event, url) {
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

  const socket = createConnection({
    port: 8088,
    host,
    timeout: 3
  })

  /*
  message format:
    channel_id[1]
    message_type[1]: client: [EMIT, QUERY], server: [OK, ERROR, DATA, END]
                      EMIT -> OK|ERROR, QUERY->ERROR|DATA|END
    message_length[4]
    message_body[message_length]
  */
  socket.on('connect', () => {
    socket.end()
  })
  socket.on('close', () => {
    resolve('ooga booga')
  })
  socket.on('error', () => {
    reject('oops')
  })

  return promise
}

module.exports = {
  loadPageData
}
