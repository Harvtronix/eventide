import { Statement } from '../statement.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
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
  public readonly end: number
  public readonly identifier: string
  public readonly parameters?: ParametersBody
  public readonly children: [DefineBody]

  public constructor(context: Context) {
    super(context)

    context.next(TokenType.keyword_define)

    this.identifier = context.next(TokenType.identifier).value

    if (context.peek().type === TokenType.left_bracket) {
      this.parameters = new ParametersBody(context)
    }

    context.next(TokenType.equals)

    this.children = [new DefineBody(context)]

    this.end = this.children[0].end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    return visitor.visitDefineStatement(this, parent)
  }
}
