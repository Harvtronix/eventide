import { ObjectLiteral } from '../parser/expressions/object-literal.js'
import { Ast } from '../parser/ast.js'
import { CommentStatement } from '../parser/statements/comment-statement.js'
import { Reference } from '../parser/expressions/reference.js'
import { AstNode } from '../parser/ast-node.js'
import { StringLiteral } from '../parser/expressions/string-literal.js'
import { BinaryStatement } from '../parser/statements/binary-statement.js'

export interface AstNodeVisitor {
  visitAst(ast: Ast, parent: undefined): void
  visitCommentStatement(
    commentStatement: CommentStatement,
    parent: AstNode
  ): void
  visitBinaryStatement(binaryStatement: BinaryStatement, parent: AstNode): void
  visitReference(reference: Reference, parent: AstNode): void
  visitObjectLiteral(objectLiteral: ObjectLiteral, parent: AstNode): void
  visitStringLiteral(stringLiteral: StringLiteral, parent: AstNode): void
}
