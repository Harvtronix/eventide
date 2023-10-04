import { Context } from './context.js'
import { StatementVisitor } from '../interpreter/statement-visitor.js'

export abstract class Statement {
  protected context: Context

  protected constructor(context: Context) {
    this.context = context
  }

  public abstract accept(visitor: StatementVisitor): void
}
