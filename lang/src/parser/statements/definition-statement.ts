import { Statement } from '../statement.js'
import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { DefinitionBody } from '../blocks/definition-body.js'
import { ParameterizedReference } from '../references/parameterized-reference.js'
import { Reference } from '../references/reference.js'
import { StringLiteral } from './string-literal.js'
import { types } from '../../token-maps/types.js'

/**
 * foo = ui[
 *   ...
 * ]
 *
 * foo[text is str] = ui[
 *   ...
 * ]
 */
export class DefinitionStatement extends Statement {
  public readonly end: number
  public readonly reference: Reference | ParameterizedReference
  public readonly children: [DefinitionBody | StringLiteral]

  public constructor(context: Context) {
    super(context)

    this.reference = new Reference(context)

    if (context.peek().type === TokenType.left_bracket) {
      this.reference = new ParameterizedReference(this.reference, context)
    }

    context.next(TokenType.equals)

    switch (
      context.peek([
        TokenType.string_literal,
        TokenType.identifier,
        ...Object.values(types)
      ]).type
    ) {
      case TokenType.string_literal:
        this.children = [new StringLiteral(context)]
        break

      default:
        this.children = [new DefinitionBody(context)]
        break
    }

    this.end = this.children[0].end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    return visitor.visitDefinitionStatement(this, parent)
  }
}
