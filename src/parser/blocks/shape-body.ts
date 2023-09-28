import { TokenType } from '../../token-type.js'
import { types } from '../../types.js'
import { Context } from '../context.js'
import { ParserError } from '../parser-error.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'
import { CommentStatement } from '../statements/comment-statement.js'
import { ShapePropertyStatement } from '../statements/shape-property-statement.js'
import { ShapeStatement } from '../statements/shape-statement.js'

export class ShapeBody extends Statement {
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
        case TokenType.keyword_shape:
          this.statements.push(new ShapeStatement(context))
          break

        case TokenType.comment:
          this.statements.push(new CommentStatement(context))
          break

        default:
          if (context.peek().type.valueOf() in types) {
            this.statements.push(new ShapePropertyStatement(context))
          } else {
            throw new ParserError(context)
          }
      }
    }

    context.next(TokenType.right_bracket)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
