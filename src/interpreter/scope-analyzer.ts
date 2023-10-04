import { DefineBody } from '../parser/blocks/define-body.js'
import { Statement } from '../parser/statement.js'
import { DefineStatement } from '../parser/statements/define-statement.js'
import { InterpreterError } from './interpreter-error.js'
import { Program } from './program.js'
import { StatementVisitor } from './statement-visitor.js'

export class ScopeAnalyzer implements StatementVisitor {
  constructor(private program: Program) {}

  visitComment(): Statement | void {
    // noop
  }

  visitDefineStatement(statement: DefineStatement): void {
    if (this.program.hasIdentifier(statement.identifier)) {
      throw new InterpreterError(`${statement.identifier} is already defined`)
    }

    this.program.scopeHierarchy.push(statement.identifier)

    this.program.cells[this.program.scopeHierarchy.join('.')] = {
      identifier: statement.identifier,
      scope: []
    }

    statement.defineBody.accept(this)

    this.program.scopeHierarchy.pop()
  }

  visitDefineBody(statement: DefineBody): void | Statement {
    statement.statements.forEach((statement) => {
      statement.accept(this)
    })
  }
}
