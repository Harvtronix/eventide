import { types } from '../../token-maps/types.js'
import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { ParserError } from '../parser-error.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * string foo
 * boolean isEnabled
 */
export class ParameterExpression extends Statement {
  public readonly end: number
  public readonly type: string
  public readonly value: string
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    this.type = context.next().value
    if (!(this.type in types)) {
      throw new ParserError(context, 'Expected type')
    }

    const finalToken = context.next(TokenType.identifier)
    this.value = finalToken.value

    this.end = finalToken.end
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
