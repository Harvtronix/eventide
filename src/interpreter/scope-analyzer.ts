import { DefineBody } from '../parser/blocks/define-body.js'
import { Statement } from '../parser/statement.js'
import { DefineStatement } from '../parser/statements/define-statement.js'
import { InterpreterError } from './interpreter-error.js'
import { Memdef } from './program.js'
import { StatementVisitor } from './statement-visitor.js'

export class ScopeAnalyzer implements StatementVisitor {
  constructor(private memory: Memdef) {}

  visitComment(): Statement | void {
    // noop
  }

  visitDefineStatement(statement: DefineStatement): void {
    if (statement.identifier in this.memory.scope) {
      throw new InterpreterError(`${statement.identifier} is already defined`)
    }

    this.memory.scopeHierarchy.push(statement.identifier)
    const scopeObj = this.memory.scopeHierarchy.reduce((prev, cur) => {
      if (!(cur in prev)) {
        prev[cur] = {}
      }
      return prev[cur]
    }, this.memory.scope)

    statement.defineBody.accept(this)

    this.memory.scopeHierarchy.pop()
  }

  visitDefineBody(statement: DefineBody): void | Statement {
    // statement.statements.forEach((statement) => {
    //   statement.accept(this)
    // })
  }
}
