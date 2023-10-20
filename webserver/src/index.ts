import { createServer } from 'net'

const server = createServer()

server.on('connection', (socket) => {
  socket.on('data', (data) => {
    const channel = data.at(0)
    const type = data.at(1)
    const length =
      ((data.at(2) ?? 0) << 0o30) |
      ((data.at(3) ?? 0) << 0o20) |
      ((data.at(4) ?? 0) << 0o10) |
      ((data.at(5) ?? 0) << 0o00)
    const body = data.subarray(6, 6 + length).toString('utf-8')

    console.log(channel, type, length, body)

    socket.write(Buffer.from([0, 0, 0, 0, 0, 5, ...Buffer.from('joeee')]))
    socket.end()
  })
})

server.listen(8088, () => {
  console.log('\\{^_^}/ server is listening on port 8088')
})
