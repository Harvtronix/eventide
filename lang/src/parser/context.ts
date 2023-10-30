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

  public peek<T extends TokenType = TokenType>(tokenType?: T | T[]): Token<T> {
    if (!tokenType) {
      return this.tokens[this.curTokenIndex] as Token<T>
    }

    const validTokenTypes: T[] = []

    if (tokenType instanceof Array) {
      validTokenTypes.push(...tokenType)
    } else {
      validTokenTypes.push(tokenType)
    }

    const matchedTokenType = validTokenTypes.find(
      (t) => this.tokens[this.curTokenIndex].type === t
    )

    if (!matchedTokenType) {
      throw new ParserError(
        this,
        `Expected "${JSON.stringify(validTokenTypes)}"`
      )
    }

    return this.tokens[this.curTokenIndex] as Token<typeof matchedTokenType>
  }

  public next<T extends TokenType = TokenType>(tokenType?: T | T[]): Token<T> {
    const token = this.peek(tokenType)

    this.curTokenIndex++

    return token
  }
}
