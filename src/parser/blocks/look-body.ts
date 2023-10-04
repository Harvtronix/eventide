import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { BinaryExpression } from '../expressions/binary-expression.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'
import { CommentStatement } from '../statements/comment-statement.js'

/**[
 *   background = bar
 *   foreground = 'green'
 * ]
 */
export class LookBody extends Statement {
  public readonly statements: Statement[]

  public constructor(context: Context) {
    super(context)

    this.statements = []

    context.next(TokenType.left_bracket)

    while (
      !context.isEof() &&
      context.peek().type !== TokenType.right_bracket
    ) {
      switch (context.peek().type) {
        case TokenType.comment:
          this.statements.push(new CommentStatement(context))
          break

        default:
          this.statements.push(new BinaryExpression(context))
          break
      }
    }

    context.next(TokenType.right_bracket)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
