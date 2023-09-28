import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })

const d1 = await rl.question('enter a number')

const d2 = await rl.question('enter a second number')

const d3 = await rl.question('enter a third number')

const result = Number(d1) + Number(d2) + Number(d3)

console.log({ result })


