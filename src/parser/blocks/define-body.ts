import { Statement } from '../statement.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { ParamStatement } from '../statements/param-statement.js'
import { ParserError } from '../parser-error.js'
import { LookStatement } from '../statements/look-statement.js'
import { ShowStatement } from '../statements/show-statement.js'
import { CommentStatement } from '../statements/comment-statement.js'

export class DefineBody extends Statement {
  public readonly statements: Statement[]

  public constructor(context: Context) {
    super(context)

    this.statements = []

    context.next(TokenType.left_bracket)

    while (
      !context.isEof() &&
      context.peek().type !== TokenType.right_bracket
    ) {
      switch (context.peek().type) {
        case TokenType.keyword_param:
          this.statements.push(new ParamStatement(context))
          break
        case TokenType.keyword_look:
          this.statements.push(new LookStatement(context))
          break
        case TokenType.keyword_show:
          this.statements.push(new ShowStatement(context))
          break
        case TokenType.comment:
          this.statements.push(new CommentStatement(context))
          break
        default:
          throw new ParserError(context)
      }
    }

    context.next(TokenType.right_bracket)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
