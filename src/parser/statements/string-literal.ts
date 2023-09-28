import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'

export class StringLiteral extends Statement {
  public readonly value: string

  public constructor(context: Context) {
    super(context)

    this.value = context.next(TokenType.string_literal).value
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
