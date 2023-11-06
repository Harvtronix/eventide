import { AstNode } from '../ast-node.js'
import { AstNodeVisitor } from '../../interpreter/ast-node-visitor.js'
import { Context } from '../context.js'
import { TokenType } from '../../token-type.js'
import { ParserError } from '../parser-error.js'
import { Reference } from './reference.js'
import { BinaryStatement } from '../statements/binary-statement.js'
import { CommentStatement } from '../statements/comment-statement.js'

/**
 * obj[
 *   thing = other
 *   foo = bar[]
 *   baz[]
 * ]
 */
export class ObjectLiteral extends AstNode {
  public readonly end: number
  public readonly objectType: Reference
  public readonly children: Array<
    BinaryStatement | ObjectLiteral | CommentStatement
  >
  public constructor(context: Context, objectType?: Reference) {
    super(context)

    this.children = []

    this.objectType = objectType ?? new Reference(context)

    context.next(TokenType.left_bracket)

    while (
      !context.isEof() &&
      context.peek().type !== TokenType.right_bracket
    ) {
      this.children.push(...CommentStatement.consumeComments(context))

      const reference = new Reference(context)

      switch (context.peek().type) {
        case TokenType.equals:
          this.children.push(new BinaryStatement(context, reference))
          break

        case TokenType.left_bracket:
          this.children.push(new ObjectLiteral(context, reference))
          break

        case TokenType.comment:
          this.children.push(...CommentStatement.consumeComments(context))
          break

        default:
          throw new ParserError(context)
      }

      this.children.push(...CommentStatement.consumeComments(context))
    }

    const finalToken = context.next(TokenType.right_bracket)

    this.end = finalToken.end
  }

  public accept(visitor: AstNodeVisitor, parent: AstNode): void {
    visitor.visitDefinitionBody(this, parent)
  }
}
