import { Statement } from '../statement.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { ParserError } from '../parser-error.js'
import { LookStatement } from '../statements/look-statement.js'
import { ShowStatement } from '../statements/show-statement.js'
import { CommentStatement } from '../statements/comment-statement.js'
import { DefineStatement } from '../statements/define-statement.js'

/**
 * [
 *   look foo
 *   show 'hello'
 * ]
 */
export class DefineBody extends Statement {
  public readonly end: number
  public readonly children: Statement[]

  public constructor(context: Context) {
    super(context)

    this.children = []

    context.next(TokenType.left_bracket)

    while (
      !context.isEof() &&
      context.peek().type !== TokenType.right_bracket
    ) {
      switch (context.peek().type) {
        case TokenType.keyword_define:
          this.children.push(new DefineStatement(context))
          break

        case TokenType.keyword_look:
          this.children.push(new LookStatement(context))
          break

        case TokenType.keyword_show:
          this.children.push(new ShowStatement(context))
          break

        case TokenType.comment:
          this.children.push(new CommentStatement(context))
          break

        default:
          throw new ParserError(context)
      }
    }

    const finalToken = context.next(TokenType.right_bracket)

    this.end = finalToken.end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    visitor.visitDefineBody(this, parent)
  }
}
