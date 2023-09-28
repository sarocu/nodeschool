import { Writable, Readable } from 'node:stream'

function* generate() {
    let junk = ''
    while (true) {
        yield junk += (Math.random() + 1).toString(36).substring(1)
    }
}

// you can create a readable from any iterable
// including async iterators and generators
const readable = Readable.from(generate())

// slow writes
// pretend we're writing to a database...
const writeable = new Writable()
writeable._write = (chunk, enc, next) => {
    console.log(chunk.toString())
    setTimeout(() => {
        console.log('\n')
        next()
    }, 1000)    

}

// do it this way to automatically manage backpressure:
readable.pipe(writeable)

// do it like this to annoy your co-workers
// readable.on('data', (chunk) => {
//     writeable.write(chunk)
// })