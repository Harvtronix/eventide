import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { types } from '../../token-maps/types.js'
import { TokenType } from '../../token-type.js'
import { Token } from '../../token.js'
import { Context } from '../context.js'
import { Statement } from '../statement.js'

/**
 * foo
 * foo.buzz.bip
 */
export class Reference extends Statement {
  public readonly end: number
  public readonly to: string[]
  public readonly children: undefined

  public constructor(context: Context) {
    super(context)

    let curToken: Token = context.next([
      TokenType.identifier,
      ...Object.values(types)
    ])
    this.to = [curToken.value]

    while (context.peek().type === TokenType.dot) {
      context.next(TokenType.dot)
      curToken = context.next([TokenType.identifier, ...Object.values(types)])
      this.to.push(curToken.value)
    }

    this.end = curToken.end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    throw new Error('Method not implemented.')
  }
}
