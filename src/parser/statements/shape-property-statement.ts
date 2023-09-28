import { Statement } from '../statement.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { types } from '../../types.js'
import { ParserError } from '../parser-error.js'

export class ShapePropertyStatement extends Statement {
  public readonly type: string
  public readonly identifier: string

  public constructor(context: Context) {
    super(context)

    this.type = context.next().value

    if (!(this.type in types)) {
      throw new ParserError(context, 'Expected type')
    }

    this.identifier = context.next(TokenType.identifier).value
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
