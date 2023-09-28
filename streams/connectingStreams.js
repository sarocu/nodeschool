import { Writable, Readable } from 'node:stream'
import fs from 'node:fs'

async function * generate() {
    yield "sam"
    yield "is"
    yield "very"
    yield "cool"
}

// you can create a readable from any iterable
// including async iterators
const readable = Readable.from(generate())

// the fast and dirty way to make your own stream implementation:
// define the _write method for writeables
// define the _read method for readables
const writeable = new Writable()
writeable._write = (chunk, enc, next) => {
    console.log(chunk.toString())
    next()
}

readable.pipe(writeable)