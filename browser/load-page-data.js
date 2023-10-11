const { createConnection } = require('node:net')

function loadPageData(_event, url) {
  const parts = /^(evn:\/\/)(.+)\/(.+)$/.exec(url)

  if (!parts) {
    return undefined
  }

  const [, protocol, host, filePath] = parts

  console.log(`${protocol}, ${host}, ${filePath}`)

  const socket = createConnection(8088, host)

  socket.on('connect', () => {
    socket.end()
  })

  return 'hello world'
}

module.exports = {
  loadPageData
}
