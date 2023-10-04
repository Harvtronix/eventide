import { readFileSync } from 'fs'
import { Lexer } from './lexer.js'
import { RootStatement } from './parser/root-statement.js'
import { CommentStatement } from './parser/statements/comment-statement.js'
import { Program } from './interpreter/program.js'

const input = readFileSync(process.argv[2]).toString()

const tokens = new Lexer(input).tokenize()
const rootStatement = new RootStatement(tokens)
const program = new Program()

program.interpret(rootStatement)

// console.log(
//   program.statements.filter((statement) => statement instanceof DefStatement)[0]
// )

// console.log(program.statements)

console.log(program)
