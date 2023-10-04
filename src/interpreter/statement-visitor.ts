import { DefineBody } from '../parser/blocks/define-body.js'
import { Statement } from '../parser/statement.js'
import { CommentStatement } from '../parser/statements/comment-statement.js'
import { DefineStatement } from '../parser/statements/define-statement.js'

export interface StatementVisitor {
  visitComment(statement: CommentStatement): Statement | void
  visitDefineStatement(statement: DefineStatement): Statement | void
  visitDefineBody(statement: DefineBody): Statement | void
}
