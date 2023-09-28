import { keywords } from './keywords.js'
import { TokenType } from './token-type.js'
import { Token } from './token.js'
import { types } from './types.js'

export class Lexer {
  private readonly source: string
  private readonly chars: string[]

  private i: number
  private line: number
  private col: number

  private readonly tokens: Token[]

  public constructor(source: string) {
    this.source = source
    this.chars = Array.from(this.source)

    this.i = 0
    this.line = 1
    this.col = 1

    this.tokens = []
  }

  public tokenize(): typeof this.tokens {
    while (!this.isEof()) {
      switch (this.peek()) {
        case '/':
          this.handleComment()
          break
        case "'":
          this.handleString()
          break
        case ' ':
          this.next()
          break
        case '\n':
          this.line++
          this.col = 0
          this.next()
          break
        case '[':
          this.addToken(
            TokenType.left_bracket,
            this.i,
            this.i + 1,
            this.line,
            this.col
          )
          this.next()
          break
        case ']':
          this.addToken(
            TokenType.right_bracket,
            this.i,
            this.i + 1,
            this.line,
            this.col
          )
          this.next()
          break
        case '.':
          this.addToken(TokenType.dot, this.i, this.i + 1, this.line, this.col)
          this.next()
          break
        case '=':
          this.addToken(
            TokenType.equals,
            this.i,
            this.i + 1,
            this.line,
            this.col
          )
          this.next()
          break

        default:
          this.handleIdentifier()
          break
      }
    }

    return this.tokens
  }

  private isEof() {
    return this.i >= this.chars.length
  }

  private isIdentifierStartChar(c: string) {
    return (
      'a'.charCodeAt(0) <= c.charCodeAt(0) &&
      c.charCodeAt(0) <= 'z'.charCodeAt(0)
    )
  }

  private isIdentifierChar(c: string) {
    return (
      ('a'.charCodeAt(0) <= c.charCodeAt(0) &&
        c.charCodeAt(0) <= 'z'.charCodeAt(0)) ||
      c === '-'
    )
  }

  private peek() {
    return this.isEof() ? '' : this.chars[this.i]
  }

  private next() {
    this.col++
    return this.isEof() ? '' : this.chars[this.i++]
  }

  private handleComment() {
    const tokenStart = this.i

    this.next()
    if (this.peek() !== '/') {
      this.report('Comment expected')
    }

    while (this.peek() !== '\n' && !this.isEof()) this.next()
    this.addToken(TokenType.comment, tokenStart, this.i, this.line, this.col)
  }

  private handleString() {
    this.next()

    const tokenStart = this.i

    while (this.peek() !== "'" && !this.isEof()) {
      this.next()
    }

    if (this.isEof()) {
      this.report('End of string expected')
    }

    this.addToken(
      TokenType.string_literal,
      tokenStart,
      this.i,
      this.line,
      this.col
    )
    this.next()
  }

  private handleIdentifier() {
    if (!this.isIdentifierStartChar(this.peek())) {
      this.report('Identifier expected')
    }
    // consume full identifier
    const identifier = []
    const tokenStart = this.i
    let c = this.peek()

    while (this.isIdentifierChar(c)) {
      identifier.push(c)
      this.next()
      c = this.peek()
    }

    const identifierString = identifier.join('')

    if (identifierString in keywords) {
      this.addToken(
        keywords[identifierString as keyof typeof keywords],
        tokenStart,
        this.i,
        this.line,
        this.col
      )
    } else if (identifierString in types) {
      this.addToken(
        types[identifierString as keyof typeof types],
        tokenStart,
        this.i,
        this.line,
        this.col
      )
    } else {
      this.addToken(
        TokenType.identifier,
        tokenStart,
        this.i,
        this.line,
        this.col
      )
    }
  }

  private addToken(
    type: TokenType,
    tokenStart: number,
    tokenEnd: number,
    line: number,
    col: number
  ) {
    this.tokens.push({
      type,
      value: this.chars.slice(tokenStart, tokenEnd).join(''),
      tokenStart,
      tokenEnd,
      line,
      col
    })
  }

  private report(msg: string) {
    throw new Error(`Ln ${this.line}, Col ${this.col} ${msg}`)
  }
}
