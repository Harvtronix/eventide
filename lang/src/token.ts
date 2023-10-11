import { TokenType } from './token-type.js'

export interface Token<T extends TokenType = TokenType> {
  type: T
  value: string
  start: number
  end: number
  line: number
  col: number
}
