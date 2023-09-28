import { Statement } from '../statement.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { ShapeBody } from '../blocks/shape-body.js'

export class ShapeStatement extends Statement {
  public readonly identifier: string
  public readonly body: ShapeBody

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_shape)
    this.identifier = context.next(TokenType.identifier).value

    this.body = new ShapeBody(context)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
