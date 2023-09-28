import { Writable } from 'node:stream'
import fs from 'node:fs'


class WriteDataStream extends Writable {
    constructor(filename) {
      super()
      this.filename = filename
      this.fd = null
    }
    _construct(callback) {
      fs.open(this.filename, 'w', (err, fd) => {
        if (err) {
          callback(err)
        } else {
          this.fd = fd
          callback()
        }
      })
    }

    // crux of the writeable - tell it what to do when .write(...) is called
    _write(chunk, encoding, callback) {
      fs.write(this.fd, chunk + '\n', callback)
    }
    _destroy(err, callback) {
      if (this.fd) {
        fs.close(this.fd, (er) => callback(er || err))
      } else {
        callback(err)
      }
    }
  } 

  const writer = new WriteDataStream('cool.txt')
  writer.write('1')
  writer.write('2')
  writer.write('3')