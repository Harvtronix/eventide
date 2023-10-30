import { types } from '../../token-maps/types.js'
import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { ParserError } from '../parser-error.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * foo is str
 * is-enabled is bool
 */
export class TypeAssertionExpression extends Statement {
  public readonly end: number
  public readonly type: string
  public readonly value: string
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    this.value = context.next(TokenType.identifier).value

    context.next(TokenType.keyword_is)

    const finalToken = context.next()

    this.type = finalToken.value

    if (!(this.type in types)) {
      throw new ParserError(context, 'Expected type')
    }

    this.end = finalToken.end
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
