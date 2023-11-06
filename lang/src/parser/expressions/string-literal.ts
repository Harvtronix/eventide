import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { AstNodeVisitor } from '../../interpreter/ast-node-visitor.js'
import { AstNode } from '../ast-node.js'

/**
 * 'some text'
 */
export class StringLiteral extends AstNode {
  public readonly end: number
  public readonly value: string
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    const finalToken = context.next(TokenType.string_literal)

    this.value = finalToken.value

    this.end = finalToken.end
  }

  public accept(visitor: AstNodeVisitor, parent: AstNode): void {
    visitor.visitStringLiteral(this, parent)
  }
}
