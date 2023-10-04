import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'

/**
 * // some text
 */
export class CommentStatement extends Statement {
  public readonly value: string

  public constructor(context: Context) {
    super(context)

    this.value = context.next(TokenType.comment).value
  }

  public accept(visitor: StatementVisitor): void {
    visitor.visitComment(this)
  }
}
