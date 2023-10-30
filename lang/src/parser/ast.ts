import { TokenType } from '../token-type.js'
import { Token } from '../token.js'
import { CommentStatement } from './statements/comment-statement.js'
import { Context } from './context.js'
import { DefinitionStatement } from './statements/definition-statement.js'
import { StatementVisitor } from '../interpreter/statement-visitor.js'
import { Statement } from './statement.js'
import { ParserError } from './parser-error.js'

export class Ast extends Statement {
  public readonly end: number
  public readonly children: Array<CommentStatement | DefinitionStatement>

  public constructor(tokens: Token[]) {
    const context = new Context(tokens)
    super(context)

    this.children = []

    while (!context.isEof()) {
      switch (context.peek().type) {
        case TokenType.comment:
          this.children.push(new CommentStatement(context))
          break

        case TokenType.identifier:
          this.children.push(new DefinitionStatement(context))
          break

        default:
          throw new ParserError(context)
      }
    }

    this.end = context.peek().end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    visitor.visitAst(this, undefined)
  }
}
