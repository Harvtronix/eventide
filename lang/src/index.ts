import { readFileSync } from 'fs'
import { Lexer } from './lexer.js'
import { Ast } from './parser/ast.js'
import { Program } from './interpreter/program.js'

const input = readFileSync(process.argv[2]).toString()

const tokens = new Lexer(input).tokenize()
const rootStatement = new Ast(tokens)
const program = new Program()

// console.log(Object.keys(rootStatement))
console.log(JSON.stringify(rootStatement, undefined, 2))

// program.interpret(rootStatement)

// console.log(
//   program.statements.filter((statement) => statement instanceof DefStatement)[0]
// )

// console.log(program.statements)

// console.log(rootStatement)
// console.log(program)
