import { DefineBody } from '../parser/blocks/define-body.js'
import { LookBody } from '../parser/blocks/look-body.js'
import { Ast } from '../parser/ast.js'
import { DefineStatement } from '../parser/statements/define-statement.js'
import { LookStatement } from '../parser/statements/look-statement.js'
import { InterpreterError } from './interpreter-error.js'
import { Program } from './program.js'
import { StatementVisitor } from './statement-visitor.js'

export class DefinitionFinder implements StatementVisitor {
  constructor(private program: Program) {}

  visitAst(statement: Ast): void {
    // noop
  }

  visitComment(): void {
    return undefined
  }

  visitDefineStatement(statement: DefineStatement): void {
    if (this.program.hasDefinition(statement.identifier)) {
      throw new InterpreterError(`${statement.identifier} is already defined`)
    }

    this.program.scopeHierarchy.push(statement.identifier)

    const fullRef = this.program.scopeHierarchy.join('.')
    this.program.definitions[fullRef] = {
      identifier: fullRef,
      scope: []
    }

    statement.body.accept(this)

    this.program.scopeHierarchy.pop()
  }

  visitDefineBody(statement: DefineBody): void {
    return undefined
    // statement.statements.forEach((s) => {
    //   s.accept(this)
    // })
  }

  visitLookStatement(statement: LookStatement): void {
    return undefined
    // if (statement.value instanceof LookBody) {
    //   statement.value.accept(this)
    //   return
    // }
    // // check if the ref actually exists
    // const fullRef = statement.value.to.join('.')
    // if (!this.program.hasIdentifier(fullRef)) {
    //   throw new InterpreterError(`${fullRef} is not defined`)
    // }
  }

  visitLookBody(statement: LookBody): void {
    return undefined
    // statement.statements.forEach((s) => {
    //   s.accept(this)
    // })
  }
}
