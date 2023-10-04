import { types } from '../../token-maps/types.js'
import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { ParserError } from '../parser-error.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * string foo
 * boolean isEnabled
 */
export class ParameterExpression extends Statement {
  public readonly type: string
  public readonly identifier: string

  public constructor(context: Context) {
    super(context)

    this.type = context.next().value
    if (!(this.type in types)) {
      throw new ParserError(context, 'Expected type')
    }

    this.identifier = context.next(TokenType.identifier).value
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
