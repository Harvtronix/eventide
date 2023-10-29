import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { ParserError } from '../parser-error.js'
import { Reference } from '../reference.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'
import { StringLiteral } from '../statements/string-literal.js'

/**
 * this = that
 * this = 'foo'
 */
export class BinaryExpression extends Statement {
  public readonly end: number
  public readonly left: string
  public readonly right: StringLiteral | Reference // | DecimalLiteral | BooleanLiteral
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    this.left = context.next(TokenType.identifier).value

    context.next(TokenType.equals)

    switch (context.peek().type) {
      case TokenType.string_literal:
        this.right = new StringLiteral(context)
        break

      case TokenType.identifier:
        this.right = new Reference(context)
        break

      default:
        throw new ParserError(context, 'Expected string or identifier')
    }

    this.end = this.right.end
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
