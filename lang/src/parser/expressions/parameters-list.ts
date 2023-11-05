import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { TypeAssertionExpression } from './parameter-expression.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * [foo is str, bar is bool]
 */
export class ParametersList extends Statement {
  public readonly end: number
  public readonly children: TypeAssertionExpression[]

  public constructor(context: Context) {
    super(context)

    this.children = []

    context.next(TokenType.left_bracket)

    while (!context.isEof()) {
      this.children.push(new TypeAssertionExpression(context))

      if (context.peek().type === TokenType.right_bracket) {
        // End of param list
        break
      }

      context.next(TokenType.comma)
    }

    const finalToken = context.next(TokenType.right_bracket)

    this.end = finalToken.end
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
