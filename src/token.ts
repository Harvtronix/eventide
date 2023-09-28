import { TokenType } from './token-type.js'

export interface Token<T extends TokenType = TokenType> {
  type: T
  value: string
  tokenStart: number
  tokenEnd: number
  line: number
  col: number
}
