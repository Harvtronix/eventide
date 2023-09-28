import { Statement } from '../statement.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'

export class ParamStatement extends Statement {
  public readonly type: string
  public readonly identifier: string

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_param)
    this.type = context.next(TokenType.identifier).value
    this.identifier = context.next(TokenType.identifier).value
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
