import { TokenType } from '../../token-type.js'
import { Context } from '../context.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Statement } from '../statement.js'
import { StringLiteral } from '../statements/string-literal.js'

export class BinaryExpression extends Statement {
  public readonly left: string
  public readonly right: StringLiteral

  public constructor(context: Context) {
    super(context)

    this.left = context.next(TokenType.identifier).value
    context.next(TokenType.equals)
    this.right = new StringLiteral(context)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
