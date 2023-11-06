import { TokenType } from '../token-type.js'
import { Token } from '../token.js'
import { CommentStatement } from './statements/comment-statement.js'
import { Context } from './context.js'
import { AstNodeVisitor } from '../interpreter/ast-node-visitor.js'
import { AstNode } from './ast-node.js'
import { ParserError } from './parser-error.js'
import { BinaryStatement } from './statements/binary-statement.js'

export class Ast extends AstNode {
  public readonly end: number
  public readonly children: Array<CommentStatement | BinaryStatement>

  public constructor(tokens: Token[]) {
    const context = new Context(tokens)
    super(context)

    this.children = []

    while (!context.isEof()) {
      switch (context.peek().type) {
        case TokenType.comment:
          this.children.push(new CommentStatement(context))
          break

        case TokenType.identifier:
          this.children.push(new BinaryStatement(context))
          break

        default:
          throw new ParserError(context)
      }
    }

    this.end = context.peek().end
  }

  public accept(visitor: AstNodeVisitor, parent: AstNode): void {
    visitor.visitAst(this, undefined)
  }
}
