import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { ParametersList } from '../blocks/parameters-list.js'
import { Context } from '../context.js'
import { Statement } from '../statement.js'
import { Reference } from './reference.js'

/**
 * foo[stuff is str]
 * foo.buzz.bip[a is bool, b is obj]
 */
export class ParameterizedReference extends Statement {
  public readonly end: number
  public readonly to: string[]
  public readonly parameters?: ParametersList
  public readonly children: undefined

  public constructor(reference: Reference, context: Context) {
    super(context)

    this.to = reference.to

    this.parameters = new ParametersList(context)

    this.end = this.parameters.end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    throw new Error('Method not implemented.')
  }
}
