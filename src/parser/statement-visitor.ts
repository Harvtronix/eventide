export interface StatementVisitor {
  visitComment(expression: Comment): void
}
