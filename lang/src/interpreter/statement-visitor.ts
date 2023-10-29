import { DefineBody } from '../parser/blocks/define-body.js'
import { LookBody } from '../parser/blocks/look-body.js'
import { Ast } from '../parser/ast.js'
import { CommentStatement } from '../parser/statements/comment-statement.js'
import { DefineStatement } from '../parser/statements/define-statement.js'
import { LookStatement } from '../parser/statements/look-statement.js'
import { ShowStatement, Statement, StringLiteral } from '../index.js'
import { Reference } from '../parser/reference.js'

export interface StatementVisitor {
  visitAst(ast: Ast, parent: undefined): void
  visitComment(commentStatement: CommentStatement, parent: Statement): void
  visitDefineStatement(
    defineStatement: DefineStatement,
    parent: Statement
  ): void
  visitDefineBody(defineBody: DefineBody, parent: Statement): void
  visitLookStatement(lookStatement: LookStatement, parent: Statement): void
  visitLookBody(lookBody: LookBody, context: Statement): void
  visitShowStatement(showStatement: ShowStatement, parent: Statement): void
  visitReference(reference: Reference, context: Statement): void
  visitStringLiteral(stringLiteral: StringLiteral, parent: Statement): void
}
