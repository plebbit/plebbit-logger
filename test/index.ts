import Logger from '../src/index.js'
import assert from 'assert'
const log = Logger('plebbit-logger:test:something')

console.log('DEBUG=' + process.env.DEBUG)
log('this is a log')
log.error('this is an error')
log.trace('this is a trace')