import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'

export class CommentStatement extends Statement {
  public readonly value: string

  public constructor(context: Context) {
    super(context)

    this.value = context.next(TokenType.comment).value
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
