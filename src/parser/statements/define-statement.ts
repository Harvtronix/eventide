import { Statement } from '../statement.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { DefineBody } from '../blocks/define-body.js'

export class DefineStatement extends Statement {
  public readonly identifier: string
  public readonly body: DefineBody

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_define)
    this.identifier = context.next(TokenType.identifier).value

    this.body = new DefineBody(context)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
