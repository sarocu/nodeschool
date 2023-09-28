import { Readable } from 'node:stream'
import fs from 'node:fs'

// extend the readable to create a stream implementation:
class DataReadable extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
    }
    _construct(callback) {
        fs.open(this.filename, (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    // the _read method produces a chunk of data, allowing it to be processed in the "data" event
    _read(n) {
        const buf = Buffer.alloc(n);
        fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            }
        });
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}

const readFile = new DataReadable('data.txt')
let result = 0
readFile.on('data', (chunk) => {
    const stringData = Buffer.from(chunk).toString()
    const arrayData = stringData.split('\n')
    arrayData.map((element) => result += Number(element))
})

readFile.on('end', () => {
    console.log({ result })
})