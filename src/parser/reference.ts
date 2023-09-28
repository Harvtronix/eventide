import { TokenType } from '../token-type.js'
import { Context } from './context.js'

export class Reference {
  public readonly to: string[]

  public constructor(context: Context) {
    this.to = []

    while (context.peek().type === TokenType.dot) {
      context.next(TokenType.dot)
      this.to.push(context.next(TokenType.identifier).value)
    }
  }
}
