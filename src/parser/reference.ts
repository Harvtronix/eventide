import { TokenType } from '../token-type.js'
import { ArgumentsBody } from './blocks/arguments-body.js'
import { Context } from './context.js'

/**
 * foo
 * foo.bar.baz
 * foo[stuff='wow']
 * foo[bar='baz', bot=bleep]
 */
export class Reference {
  public readonly to: string[]
  public readonly arguments?: ArgumentsBody

  public constructor(context: Context) {
    this.to = []

    do {
      this.to.push(context.next(TokenType.identifier).value)
    } while (context.peek().type === TokenType.dot)

    if (context.peek().type === TokenType.left_bracket) {
      this.arguments = new ArgumentsBody(context)
    }
  }
}
