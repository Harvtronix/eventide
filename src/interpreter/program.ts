import { RootStatement } from '../parser/root-statement.js'
import { ScopeAnalyzer } from './scope-analyzer.js'

export interface Cell {
  identifier: string
  scope: Array<any>
}

export interface Memdef {
  cells: Record<string, Cell>
  scopeHierarchy: Array<string>
}

export class Program {
  public readonly scopeHierarchy: Array<string> = []
  public readonly cells: Record<string, Cell> = {}

  public interpret(rootStatement: RootStatement) {
    const scopeAnalyzer = new ScopeAnalyzer(this)
    rootStatement.accept(scopeAnalyzer)
  }

  public hasIdentifier(identifier: string) {
    const fullyQualifiedIdentifier = [...this.scopeHierarchy, identifier].join(
      '.'
    )

    return fullyQualifiedIdentifier in this.cells
  }
}
