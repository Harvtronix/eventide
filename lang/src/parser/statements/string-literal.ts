import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * 'some text'
 */
export class StringLiteral extends Statement {
  public readonly end: number
  public readonly value: string

  public constructor(context: Context) {
    super(context)

    const finalToken = context.next(TokenType.string_literal)

    this.value = finalToken.value

    this.end = finalToken.end
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
