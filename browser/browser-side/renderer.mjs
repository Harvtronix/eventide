import { Ast, Lexer } from '../../lang/dist/index.js'
import { buildRenderableNodeTree } from './build-renderable-node-tree.mjs'

window.addEventListener('load', () => {
  const urlInput = document.getElementById('url-input')

  urlInput.addEventListener('change', async (e) => {
    let page
    try {
      page = await window.electronAPI.pageLoadRequest(e.target.value)
    } catch (e) {
      alert(e)
      return
    }

    const ast = new Ast(new Lexer(page).tokenize())

    const renderableNodeTree = buildRenderableNodeTree(ast)

    // TODO: render renderable nodes to main-content canvas

    console.log(ast)
    console.log(renderableNodeTree)
  })
})
