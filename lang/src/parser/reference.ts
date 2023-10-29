import { StatementVisitor } from '../interpreter/statement-visitor.js'
import { TokenType } from '../token-type.js'
import { Token } from '../token.js'
import { ArgumentsBody } from './blocks/arguments-body.js'
import { Context } from './context.js'
import { Statement } from './statement.js'

/**
 * foo
 * foo.bar.baz
 * foo[stuff='wow']
 * foo[bar='baz', bot=bleep]
 */
export class Reference extends Statement {
  public readonly end: number
  public readonly to: string[]
  public readonly arguments?: ArgumentsBody
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    let curToken: Token = context.next(TokenType.identifier)
    this.to = [curToken.value]

    while (context.peek().type === TokenType.dot) {
      context.next(TokenType.dot)
      curToken = context.next(TokenType.identifier)
      this.to.push(curToken.value)
    }

    this.end = curToken.end

    if (context.peek().type === TokenType.left_bracket) {
      this.arguments = new ArgumentsBody(context)
      this.end = this.arguments.end
    }
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    visitor.visitReference(this, parent)
  }
}
