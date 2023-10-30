import { TokenType } from '../token-type.js'

export const types = {
  [TokenType.type_boolean]: TokenType.type_boolean,
  [TokenType.type_decimal]: TokenType.type_decimal,
  [TokenType.type_integer]: TokenType.type_integer,
  [TokenType.type_string]: TokenType.type_string

  // [TokenType.type_array]: TokenType.type_array,
  // [TokenType.type_function]: TokenType.type_function,
  // [TokenType.type_object]: TokenType.type_object,
  // [TokenType.type_ui]: TokenType.type_ui
} as const
