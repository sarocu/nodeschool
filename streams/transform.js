import { Readable, Transform, pipeline } from 'node:stream'

// generate a random number:
function* generate() {
    let i = 0
    while (i < 10) {
        i += 1
        yield (Math.random() + 1).toString()
    }
}

// you can create a readable from any iterable
// including async iterators and generators
const readable = Readable.from(generate())

// Transform data from the readable:
const transformer = new Transform({
    transform: (chunk, enc, next) => {
        const data = Number(chunk).toString(36).substring(2)
        next(null, data)
    }
})

// Create a pipeline -> pipeline(source, ...transforms, sink, callback)
pipeline(
    readable,
    transformer,
    process.stdout, // this is a stream too!!!!
    (err) => {
        if (err) {
            console.log(err)
            console.log('oh no')
        } else {
            console.log('cool stuff')
        }
    }
)
