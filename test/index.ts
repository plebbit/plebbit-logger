import Logger from '../src/index.js'
const log = Logger('my-app:test:something')

console.log('DEBUG=' + process.env.DEBUG + ' node dist/test')
log('this is a log')
log.error('this is an error')
log.trace('this is a trace')
