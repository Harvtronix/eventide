import { MessageType } from './protocol/protocol-message.js'
import { ProtocolSocket } from './protocol/protocol-socket.js'

const testPage = `
//
// BEGIN BUILT-IN OBJECTS
//
look = obj[
  background-color = 'white'
  color = 'black'
]
show = obj[
  show = ''
]
ui = obj[
  look[]
  show[]
]
//
// END BUILT-IN OBJECTS
//
root = ui[
  look[
    background-color = 'green'
  ]
  show[
    show='hello'
    nested=obj[
      foo='bar'
    ]
  ]
]
`

export async function loadPageData(_event, url) {
  return Promise.resolve(testPage)

  // const parts = /^(even:\/\/)(.+)\/(.+)$/.exec(url)

  // if (!parts) {
  //   return undefined
  // }

  // const [, protocol, host, filePath] = parts

  // console.log(`${protocol}, ${host}, ${filePath}`)

  // let resolve, reject
  // const promise = new Promise((res, rej) => {
  //   resolve = res
  //   reject = rej
  // })

  // const socket = new ProtocolSocket(host, filePath)
  // socket.on('message', (msg) => {
  //   if (msg.type === MessageType.server.OK) {
  //     resolve(msg.body)
  //   } else {
  //     reject(msg)
  //   }
  // })
  // socket.connect()

  // return promise
}
