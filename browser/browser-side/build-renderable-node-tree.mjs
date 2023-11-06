import * as Eventide from '../../lang/dist/index.js'

/**
 * Builds a tree of renderable page nodes based off of an eventide AST.
 *
 * @param {Ast} ast
 */
export function buildRenderableNodeTree(ast) {
  const program = {
    obj: {}
  }
  Object.defineProperty(program, '_parent', {
    enumerable: false,
    value: undefined
  })
  let curScope = program
  let curProperty

  /** @type {Eventide.AstNodeVisitor} */
  const visitor = {
    visitAst(ast) {
      ast.children.forEach((s) => s.accept(visitor, ast))
    },
    visitReference(reference, parent) {
      // NOOP for now
    },
    visitBinaryStatement(binaryStatement, parent) {
      const prevScope = curScope
      curProperty = binaryStatement.left.to.join('.')

      if (curProperty.includes('.')) {
        throw new Error('Expected property name')
      }

      binaryStatement.left.accept(visitor, binaryStatement)
      binaryStatement.right.accept(visitor, binaryStatement)

      curScope = prevScope
    },
    visitObjectLiteral(objectLiteral, parent) {
      const prevScope = curScope

      if (parent.type === Eventide.BinaryStatement.name) {
        if (!curScope[curProperty]) {
          curScope[curProperty] = {}
          Object.defineProperty(curScope[curProperty], '_parent', {
            enumerable: false,
            value: curScope
          })
        }

        curScope = curScope[curProperty]
      }

      // sprinkle in the referenced object's properties
      const inheritedObj = findNearestRef(
        objectLiteral.objectType.to.join('.'),
        curScope
      )
      Object.entries(inheritedObj).forEach(([k, v]) => {
        curScope[k] = v
      })

      objectLiteral.children.forEach((c) => {
        c.accept(visitor, objectLiteral)
      })

      curScope = prevScope
    },
    visitStringLiteral(stringLiteral, parent) {
      curScope[curProperty] = stringLiteral.value
    }
  }

  ast.accept(visitor, undefined)

  return program
}

/**
 * Finds the closest ref (depth-wise) with the given refName.
 *
 * @param {string} refName
 * @param {*} scope
 */
function findNearestRef(refName, scope) {
  const ref = scope[refName]

  if (ref) {
    return ref
  }

  if (scope._parent === undefined) {
    throw new Error('Ref not found: ' + refName)
  }

  return findNearestRef(refName, scope._parent)
}
