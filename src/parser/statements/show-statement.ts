import { Statement } from '../statement.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { Reference } from '../reference.js'
import { StringLiteral } from './string-literal.js'
import { ParserError } from '../parser-error.js'

export class ShowStatement extends Statement {
  public readonly value: Reference | StringLiteral

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_show)

    switch (context.peek().type) {
      case TokenType.string_literal:
        this.value = new StringLiteral(context)
        break
      case TokenType.dot:
        this.value = new Reference(context)
        break
      default:
        throw new ParserError(context)
    }
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
