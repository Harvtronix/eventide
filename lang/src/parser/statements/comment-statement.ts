import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { AstNodeVisitor } from '../../interpreter/ast-node-visitor.js'
import { AstNode } from '../ast-node.js'

/**
 * // some text
 */
export class CommentStatement extends AstNode {
  public readonly end: number
  public readonly value: string
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    const finalToken = context.next(TokenType.comment)

    this.value = finalToken.value

    this.end = finalToken.end
  }

  public static consumeComments(context: Context) {
    const comments = []

    while (context.peek().type === TokenType.comment) {
      comments.push(new CommentStatement(context))
    }

    return comments
  }

  public accept(visitor: AstNodeVisitor, parent: AstNode): void {
    return visitor.visitComment(this, parent)
  }
}
