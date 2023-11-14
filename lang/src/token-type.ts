export enum TokenType {
  comment = 'comment',

  boolean_literal = 'boolean_literal',
  decimal_literal = 'decimal_literal',
  integer_literal = 'integer_literal',
  string_literal = 'string_literal',

  identifier = 'identifier',

  // keywords
  keyword_is = 'is',

  // primitive types
  // type_boolean = 'bool',
  // type_decimal = 'dec',
  // type_integer = 'int',
  // type_string = 'str',

  // single chars
  left_bracket = '[',
  right_bracket = ']',
  dot = '.',
  comma = ',',
  equals = '=',
  eof = '\0'
}
