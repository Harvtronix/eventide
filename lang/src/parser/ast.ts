import { TokenType } from '../token-type.js'
import { Token } from '../token.js'
import { CommentStatement } from './statements/comment-statement.js'
import { Context } from './context.js'
import { DefineStatement } from './statements/define-statement.js'
import { StatementVisitor } from '../interpreter/statement-visitor.js'
import { Statement } from './statement.js'
import { ParserError } from './parser-error.js'
import { Renderable } from '../interpreter/renderable.js'

export class Ast extends Statement {
  public readonly end: number
  public readonly statements: Array<CommentStatement | DefineStatement>

  public constructor(tokens: Token[]) {
    const context = new Context(tokens)
    super(context)

    this.statements = []

    while (!context.isEof()) {
      switch (context.peek().type) {
        case TokenType.comment:
          this.statements.push(new CommentStatement(context))
          break

        case TokenType.keyword_define:
          this.statements.push(new DefineStatement(context))
          break

        default:
          throw new ParserError(context)
      }
    }

    this.end = context.peek().end
  }

  public override accept(visitor: StatementVisitor): void {
    visitor.visitAst(this)
  }
}
