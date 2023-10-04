import { Statement } from '../statement.js'
import { StatementVisitor } from '../statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { DefineBody } from '../blocks/define-body.js'
import { ParametersBody } from '../blocks/parameters-body.js'

/**
 * def foo = [
 *   ...
 * ]
 */
export class DefineStatement extends Statement {
  public readonly identifier: string
  public readonly parametersBody?: ParametersBody
  public readonly defineBody: DefineBody

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_define)

    this.identifier = context.next(TokenType.identifier).value

    if (context.peek().type === TokenType.left_bracket) {
      this.parametersBody = new ParametersBody(context)
    }

    context.next(TokenType.equals)

    this.defineBody = new DefineBody(context)
  }

  public accept(visitor: StatementVisitor): void {
    throw new Error('Method not implemented.')
  }
}
