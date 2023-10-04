import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { ParameterExpression } from '../expressions/parameter-expression.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * [string foo, boolean bar]
 */
export class ParametersBody extends Statement {
  public readonly parameters: ParameterExpression[]

  public constructor(context: Context) {
    super(context)

    this.parameters = []

    context.next(TokenType.left_bracket)

    while (!context.isEof()) {
      this.parameters.push(new ParameterExpression(context))

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
