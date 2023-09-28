import { readFileSync } from 'fs'
import { Lexer } from './lexer.js'
import { Program } from './parser/program.js'
import { CommentStatement } from './parser/statements/comment-statement.js'
import { ShapeStatement } from './parser/statements/shape-statement.js'

const input = readFileSync(process.argv[2]).toString()

const tokens = new Lexer(input).tokenize()
const program = new Program(tokens)

// console.log(
//   program.statements.filter((statement) => statement instanceof DefStatement)[0]
// )

// console.log(program.statements)

console.log(program)
