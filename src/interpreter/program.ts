import { RootStatement } from '../parser/root-statement.js'
import { ScopeAnalyzer } from './scope-analyzer.js'

export interface Memdef {
  scope: Record<string, any>
  scopeHierarchy: Array<string>
}

export class Program {
  public readonly memory: Memdef = {
    scope: {},
    scopeHierarchy: []
  }

  public interpret(rootStatement: RootStatement) {
    const scopeAnalyzer = new ScopeAnalyzer(this.memory)
    rootStatement.accept(scopeAnalyzer)
  }
}
