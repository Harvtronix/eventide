export enum TokenType {
  comment = 'comment',
  string_literal = 'string_literal',

  // keywords
  // keyword_look = 'look',
  keyword_is = 'is',
  // keyword_show = 'show',
  // keyword_define = 'def',
  // keyword_from = 'from',
  // keyword_function = 'function',
  // keyword_on = 'on',
  // keyword_param = 'param',
  // keyword_shape = 'shape',

  // primitive types
  type_boolean = 'bool',
  type_decimal = 'dec',
  type_integer = 'int',
  type_string = 'str',

  // complex types
  // type_object = 'obj',
  // type_array = 'arr',
  // type_ui = 'ui',
  // type_function = 'fn',

  // single chars
  left_bracket = '[',
  right_bracket = ']',
  dot = '.',
  comma = ',',
  equals = '=',

  identifier = 'identifier',
  eof = '\0'
}
