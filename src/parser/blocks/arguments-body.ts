import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { BinaryExpression } from '../expressions/binary-expression.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * [foo='bar', baz=false]
 */
export class ArgumentsBody extends Statement {
  public readonly end: number
  public readonly entries: BinaryExpression[]

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.left_bracket)

    this.entries = [new BinaryExpression(context)]

    while (context.peek().type !== TokenType.right_bracket) {
      context.next(TokenType.comma)
      this.entries.push(new BinaryExpression(context))
    }

    const finalToken = context.next(TokenType.right_bracket)

    this.end = finalToken.end
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
