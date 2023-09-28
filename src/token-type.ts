export enum TokenType {
  comment = 'comment',
  string_literal = 'string_literal',

  // keywords
  keyword_define = 'define',
  keyword_function = 'function',
  keyword_shape = 'shape',
  keyword_from = 'from',
  keyword_look = 'look',
  keyword_on = 'on',
  keyword_param = 'param',
  keyword_show = 'show',

  // types
  type_boolean = 'boolean',
  type_decimal = 'decimal',
  type_int = 'int',
  type_string = 'string',

  // single chars
  left_bracket = 'left_bracket',
  right_bracket = 'right_bracket',
  dot = 'dot',
  equals = 'equals',

  identifier = 'identifier'
}
