import { Statement } from '../statement.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { ParserError } from '../parser-error.js'
import { Reference } from '../reference.js'
import { LookBody } from '../blocks/look-body.js'

/**
 * look foo
 * look [
 *   ...
 * ]
 */
export class LookStatement extends Statement {
  public readonly end: number
  public readonly value: Reference | LookBody

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_look)

    switch (context.peek().type) {
      case TokenType.identifier:
        this.value = new Reference(context)
        break
      case TokenType.left_bracket:
        this.value = new LookBody(context)
        break
      default:
        throw new ParserError(context)
    }

    this.end = this.value.end
  }

  public accept(visitor: StatementVisitor): void {
    visitor.visitLookStatement(this)
  }
}