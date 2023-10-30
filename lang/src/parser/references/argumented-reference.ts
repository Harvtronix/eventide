import { StatementVisitor } from '../../interpreter/statement-visitor.js'
import { ArgumentsList } from '../blocks/arguments-list.js'
import { Context } from '../context.js'
import { Statement } from '../statement.js'
import { Reference } from './reference.js'

/**
 * foo[stuff='wow']
 * foo.buzz.bip[bar='baz', bot=bleep]
 */
export class ArgumentedReference extends Statement {
  public readonly end: number
  public readonly to: string[]
  public readonly arguments?: ArgumentsList
  public readonly children: undefined

  public constructor(reference: Reference, context: Context) {
    super(context)

    this.to = reference.to

    this.arguments = new ArgumentsList(context)

    this.end = this.arguments.end
  }

  public accept(visitor: StatementVisitor, parent: Statement): void {
    throw new Error('Method not implemented.')
  }
}
