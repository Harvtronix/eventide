import { TokenType } from '../token-type.js'

export const keywords = {
  [TokenType.keyword_is]: TokenType.keyword_is,
  [TokenType.keyword_look]: TokenType.keyword_look,
  [TokenType.keyword_show]: TokenType.keyword_show
} as const
