import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * // some text
 */
export class CommentStatement extends Statement {
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

  public accept(visitor: StatementVisitor, parent: Statement): void {
    return visitor.visitComment(this, parent)
  }
}
