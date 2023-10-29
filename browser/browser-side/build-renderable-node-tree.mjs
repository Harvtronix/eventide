import * as Eventide from '../../lang/dist/index.js'

/**
 * Builds a tree of renderable page nodes based off of an eventide AST.
 *
 * @param {Ast} ast
 */
export function buildRenderableNodeTree(ast) {
  ast.accept(wow, undefined)
}

/** @type {Eventide.StatementVisitor} */
const wow = {
  visitAst(ast) {
    ast.children.forEach((s) => s.accept(wow, ast))
  },
  visitDefineStatement(defineStatement, parent) {
    defineStatement.children[0].children.forEach((s) =>
      s.accept(wow, defineStatement.children[0])
    )
  },
  visitShowStatement(showStatement, parent) {
    showStatement.children[0].accept(wow, showStatement)
  },
  visitStringLiteral(stringLiteral, parent) {
    if (parent.type == Eventide.ShowStatement.name) {
      console.log('hey we found a string to show!', stringLiteral.value)
    }
  }
}
