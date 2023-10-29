import { StatementVisitor } from '../interpreter/statement-visitor.js'
import { Context } from './context.js'

abstract class Statement {
  public readonly type: string
  public readonly start: number
  public abstract readonly end: number
  public abstract readonly children?: Statement[]
  public readonly value?: string | number | boolean

  protected constructor(context: Context) {
    this.type = this.constructor.name
    this.start = context.peek().start
  }

  public abstract accept(visitor: StatementVisitor, parent: Statement): void
}

export { Statement }
