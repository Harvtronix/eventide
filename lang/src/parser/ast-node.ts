import { AstNodeVisitor } from '../interpreter/ast-node-visitor.js'
import { Context } from './context.js'

export abstract class AstNode {
  public readonly type: string
  public readonly start: number
  public abstract readonly end: number
  public abstract readonly children?: AstNode[]
  public readonly value?: string | number | boolean

  protected constructor(context: Context) {
    this.type = this.constructor.name
    this.start = context.peek().start
  }

  public abstract accept(visitor: AstNodeVisitor, parent: AstNode): void
}
