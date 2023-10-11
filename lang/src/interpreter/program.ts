import { Ast } from '../parser/ast.js'
import { DefinitionFinder } from './definition-finder.js'

export interface Definition {
  identifier: string
  scope: Array<any>
}

export interface Memdef {
  cells: Record<string, Definition>
  scopeHierarchy: Array<string>
}

export class Program {
  public readonly scopeHierarchy: Array<string> = []
  public readonly definitions: Record<string, Definition> = {}

  public interpret(rootStatement: Ast) {
    const definitionFinder = new DefinitionFinder(this)
    return rootStatement.accept(definitionFinder)
  }

  public hasDefinition(identifier: string) {
    const fullyQualifiedIdentifier = [...this.scopeHierarchy, identifier].join(
      '.'
    )

    return fullyQualifiedIdentifier in this.definitions
  }
}
