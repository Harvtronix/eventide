import { TokenType } from '../token-type.js'
import { Token } from '../token.js'
import { CommentStatement } from './statements/comment-statement.js'
import { Context } from './context.js'
import { DefineStatement } from './statements/define-statement.js'
import { StatementVisitor } from './statement-visitor.js'
import { Statement } from './statement.js'
import { ParserError } from './parser-error.js'
import { ShapeStatement } from './statements/shape-statement.js'

export class Program extends Statement {
  public readonly statements: Statement[]

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

        case TokenType.keyword_shape:
          this.statements.push(new ShapeStatement(context))
          break

        // case TokenType.keyword_function:
        //   this.statements.push(new FunctionStatement(context))
        //   break

        default:
          throw new ParserError(context)
      }
    }
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
