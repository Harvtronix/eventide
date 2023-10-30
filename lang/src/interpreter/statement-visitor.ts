import { DefinitionBody } from '../parser/blocks/definition-body.js'
import { LookBody } from '../parser/blocks/look-body.js'
import { Ast } from '../parser/ast.js'
import { CommentStatement } from '../parser/statements/comment-statement.js'
import { DefinitionStatement } from '../parser/statements/definition-statement.js'
import { LookStatement } from '../parser/statements/look-statement.js'
import { ShowStatement, Statement, StringLiteral } from '../index.js'
import { Reference } from '../parser/references/reference.js'

export interface StatementVisitor {
  visitAst(ast: Ast, parent: undefined): void
  visitComment(commentStatement: CommentStatement, parent: Statement): void
  visitDefinitionStatement(
    definitionStatement: DefinitionStatement,
    parent: Statement
  ): void
  visitDefinitionBody(definitionBody: DefinitionBody, parent: Statement): void
  visitLookStatement(lookStatement: LookStatement, parent: Statement): void
  visitLookBody(lookBody: LookBody, context: Statement): void
  visitShowStatement(showStatement: ShowStatement, parent: Statement): void
  visitReference(reference: Reference, context: Statement): void
  visitStringLiteral(stringLiteral: StringLiteral, parent: Statement): void
}
