import { StatementVisitor } from '../interpreter/statement-visitor.js'
import { Context } from './context.js'

abstract class Statement {
  public readonly type: string
  public readonly start: number
  public abstract readonly end: number

  protected constructor(context: Context) {
    this.type = this.constructor.name
    this.start = context.peek().start
  }

  public abstract accept(visitor: StatementVisitor): void
}

export { Statement }
