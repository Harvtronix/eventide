import { TokenType } from '../token-type.js'

export const literals = {
  [TokenType.boolean_literal]: TokenType.boolean_literal,
  [TokenType.decimal_literal]: TokenType.decimal_literal,
  [TokenType.integer_literal]: TokenType.integer_literal,
  [TokenType.string_literal]: TokenType.string_literal
} as const
