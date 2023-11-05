import { ObjectLiteral } from '../parser/expressions/object-literal.js'
import { Ast } from '../parser/ast.js'
import { CommentStatement } from '../parser/statements/comment-statement.js'
import { Statement, StringLiteral } from '../index.js'
import { Reference } from '../parser/references/reference.js'

export interface StatementVisitor {
  visitAst(ast: Ast, parent: undefined): void
  visitComment(commentStatement: CommentStatement, parent: Statement): void
  // visitDefinitionStatement(
  //   definitionStatement: DefinitionStatement,
  //   parent: Statement
  // ): void
  visitDefinitionBody(definitionBody: ObjectLiteral, parent: Statement): void
  // visitLookStatement(lookStatement: LookStatement, parent: Statement): void
  // visitLookBody(lookBody: LookBody, context: Statement): void
  // visitShowStatement(showStatement: ShowStatement, parent: Statement): void
  visitReference(reference: Reference, context: Statement): void
  visitStringLiteral(stringLiteral: StringLiteral, parent: Statement): void
}
