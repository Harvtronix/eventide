import { Statement } from '../statement.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { ParserError } from '../parser-error.js'
import { Reference } from '../references/reference.js'
import { LookBody } from '../blocks/look-body.js'

/**
 * look foo
 * look [
 *   ...
 * ]
 */
export class LookStatement extends Statement {
  public readonly end: number
  public readonly children: [LookBody] | [Reference]

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_look)

    switch (context.peek().type) {
      case TokenType.identifier:
        this.children = [new Reference(context)]
        break
      case TokenType.left_bracket:
        this.children = [new LookBody(context)]
        break
      default:
        throw new ParserError(context)
    }

    this.end = this.children[0].end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    visitor.visitLookStatement(this, parent)
  }
}
