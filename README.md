## Example

```JavaScript
import Logger from '@plebbit/plebbit-logger'
const log = Logger('my-app:something:something-else')
log('this is a log')
log.error('this is an error')
log.trace('this is a trace')
```

```console
$ DEBUG=my-app:* node index.js
  my-app:something:something-else this is a log +0ms
  my-app:something:something-else:error this is an error +0ms
  my-app:something:something-else:trace this is a trace +0ms
```
