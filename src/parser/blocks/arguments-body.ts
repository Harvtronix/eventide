import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { BinaryExpression } from '../expressions/binary-expression.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * [foo='bar', baz=false]
 */
export class ArgumentsBody extends Statement {
  public readonly arguments: BinaryExpression[]

  public constructor(context: Context) {
    super(context)

    this.arguments = []

    context.next(TokenType.left_bracket)

    while (!context.isEof()) {
      this.arguments.push(new BinaryExpression(context))

      if (context.peek().type === TokenType.right_bracket) {
        // End of param list
        break
      }

      context.next(TokenType.comma)
    }

    context.next(TokenType.right_bracket)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
