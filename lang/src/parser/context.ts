import { TokenType } from '../token-type.js'
import { Token } from '../token.js'
import { ParserError } from './parser-error.js'

export class Context {
  public tokens: Token[]
  public curTokenIndex: number

  public constructor(tokens: Context['tokens']) {
    this.tokens = tokens
    this.curTokenIndex = 0
  }

  public isEof() {
    return this.peek().type === TokenType.eof
  }

  public peek<T extends TokenType = TokenType>(tokenType?: T): Token<T> {
    if (tokenType && this.tokens[this.curTokenIndex].type !== tokenType) {
      throw new ParserError(this, `Expected "${tokenType}"`)
    }

    return this.tokens[this.curTokenIndex] as Token<T>
  }

  public next<T extends TokenType = TokenType>(tokenType?: T): Token<T> {
    if (tokenType && this.tokens[this.curTokenIndex].type !== tokenType) {
      throw new ParserError(this, `Expected "${tokenType}"`)
    }

    return this.tokens[this.curTokenIndex++] as Token<T>
  }
}
