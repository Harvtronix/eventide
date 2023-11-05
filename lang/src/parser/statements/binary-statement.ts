import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { ParserError } from '../parser-error.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Statement } from '../statement.js'
import { StringLiteral } from '../expressions/string-literal.js'
import { Reference } from '../references/reference.js'
import { ObjectLiteral } from '../expressions/object-literal.js'

/**
 * this = that
 * this = 'foo'
 * stuff = obj[...]
 * foo[text is str] = ui[...] <-- maybe
 */
export class BinaryStatement extends Statement {
  public readonly end: number
  public readonly left: Reference
  public readonly right: ObjectLiteral | StringLiteral | Reference // | DecimalLiteral | BooleanLiteral
  public readonly children: undefined

  public constructor(context: Context, reference?: Reference) {
    super(context)

    this.left = reference ?? new Reference(context)

    context.next(TokenType.equals)

    switch (context.peek().type) {
      case TokenType.string_literal:
        this.right = new StringLiteral(context)
        break

      case TokenType.identifier:
        this.right = new Reference(context)

        if (context.peek().type === TokenType.left_bracket) {
          this.right = new ObjectLiteral(context, this.right)
        }
        break

      default:
        throw new ParserError(context, 'Expected string or object literal')
    }

    this.end = this.right.end
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
