import { TokenType } from '../token-type.js'
import { Token } from '../token.js'
import { ParserError } from './parser-error.js'

export class Context {
  public tokens: Token[]
  public pos: number

  public constructor(tokens: Context['tokens']) {
    this.tokens = tokens
    this.pos = 0
  }

  public isEof() {
    return this.pos >= this.tokens.length
  }

  public peek<T extends TokenType = TokenType>(tokenType?: T): Token<T> {
    if (tokenType && this.tokens[this.pos].type !== tokenType) {
      throw new ParserError(this, `Expected "${tokenType}"`)
    }

    return this.tokens[this.pos] as Token<T>
  }

  public next<T extends TokenType = TokenType>(tokenType?: T): Token<T> {
    if (tokenType && this.tokens[this.pos].type !== tokenType) {
      throw new ParserError(this, `Expected "${tokenType}"`)
    }

    return this.tokens[this.pos++] as Token<T>
  }
}
