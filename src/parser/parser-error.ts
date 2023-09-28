import { Context } from './context.js'

export class ParserError extends Error {
  public constructor(context: Context, message?: string) {
    if (message) {
      message = ' ' + message
    } else {
      message = ''
    }

    super(
      `Ln ${context.peek().line}, Col ${
        context.peek().col
      }: Unexpected token: ${context.peek().value}${message}`
    )
  }
}
