import { types } from '../../token-maps/types.js'
import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { ParserError } from '../parser-error.js'
import { AstNodeVisitor } from '../../interpreter/ast-node-visitor.js'
import { AstNode } from '../ast-node.js'

/**
 * foo is str
 * is-enabled is bool
 */
export class TypeAssertionStatement extends AstNode {
  public readonly end: number
  public readonly type: string
  public readonly value: string
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    this.value = context.next(TokenType.identifier).value

    context.next(TokenType.keyword_is)

    const finalToken = context.next()

    this.type = finalToken.value

    if (!(this.type in types)) {
      throw new ParserError(context, 'Expected type')
    }

    this.end = finalToken.end
  }

  public accept(visitor: AstNodeVisitor, parent: AstNode): void {
    visitor.visitTypeAssertionStatement(this, parent)
  }
}
