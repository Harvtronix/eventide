import { ObjectLiteral } from '../parser/expressions/object-literal.js'
import { Ast } from '../parser/ast.js'
import { CommentStatement } from '../parser/statements/comment-statement.js'
import { Reference } from '../parser/expressions/reference.js'
import { AstNode } from '../parser/ast-node.js'
import { StringLiteral } from '../parser/expressions/string-literal.js'

export interface AstNodeVisitor {
  visitAst(ast: Ast, parent: undefined): void
  visitComment(commentStatement: CommentStatement, parent: AstNode): void
  visitDefinitionBody(definitionBody: ObjectLiteral, parent: AstNode): void
  visitReference(reference: Reference, context: AstNode): void
  visitStringLiteral(stringLiteral: StringLiteral, parent: AstNode): void
}
