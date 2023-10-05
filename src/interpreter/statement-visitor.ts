import { DefineBody } from '../parser/blocks/define-body.js'
import { LookBody } from '../parser/blocks/look-body.js'
import { Ast } from '../parser/ast.js'
import { CommentStatement } from '../parser/statements/comment-statement.js'
import { DefineStatement } from '../parser/statements/define-statement.js'
import { LookStatement } from '../parser/statements/look-statement.js'
import { Renderable } from './renderable.js'

export interface StatementVisitor {
  visitAst(statement: Ast): void
  visitComment(statement: CommentStatement): void
  visitDefineStatement(statement: DefineStatement): void
  visitDefineBody(statement: DefineBody): void
  visitLookStatement(statement: LookStatement): void
  visitLookBody(statement: LookBody): void
}
