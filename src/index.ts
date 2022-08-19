import Debug from 'debug'

interface Logger {
  (formatter: any, ...args: any[]): void
  error: (formatter: any, ...args: any[]) => void
  trace: (formatter: any, ...args: any[]) => void
}

function Logger (namespace: string): Logger {
  if (!namespace || typeof namespace !== 'string'){
    throw Error(`logger namespace '${namespace}' invalid`)
  }
  const namespaces = namespace.split(':')

  // create all debug instances
  const debugLevels = {
    log: Debug(namespaces[0]),
    error: Debug(`${namespaces[0]}:error`),
    trace: Debug(`${namespaces[0]}:trace`),
  }
  const debugNamespaceLevels = {
    log: Debug(namespace),
    error: Debug(`${namespace}:error`),
    trace: Debug(`${namespace}:trace`),
  }

  // create logger instance

  // logs are logged if they match log or trace
  const log = (formatter: any, ...args: any[]) => {
    if (debugNamespaceLevels.log.enabled) {
      return debugNamespaceLevels.log(formatter, ...args)
    }
    if (debugLevels.log.enabled) {
      return debugLevels.log(formatter, ...args)
    }
    if (debugNamespaceLevels.trace.enabled) {
      return debugNamespaceLevels.trace(formatter, ...args)
    }
    debugLevels.trace(formatter, ...args)
  }

  // errors are logged if it matches any namespace
  log.error = (formatter: any, ...args: any[]) => {
    if (debugNamespaceLevels.error.enabled) {
      return debugNamespaceLevels.error(formatter, ...args)
    }
    if (debugLevels.error.enabled) {
      return debugLevels.error(formatter, ...args)
    }
    if (debugNamespaceLevels.log.enabled) {
      return debugNamespaceLevels.log(formatter, ...args)
    }
    if (debugLevels.log.enabled) {
      return debugLevels.log(formatter, ...args)
    }
    if (debugNamespaceLevels.trace.enabled) {
      return debugNamespaceLevels.trace(formatter, ...args)
    }
    return debugLevels.trace(formatter, ...args) 
  }

  // trace are only logged if they match trace
  log.trace = (formatter: any, ...args: any[]) => {
    if (debugNamespaceLevels.trace.enabled) {
      return debugNamespaceLevels.trace(formatter, ...args)
    }
    debugLevels.trace(formatter, ...args)
  }

  return log
}

Logger.disable = () => {
  Debug.disable()
}

Logger.enable = (namespaces: string) => {
  Debug.enable(namespaces)
}

Logger.enabled = (namespaces: string) => {
  return Debug.enabled(namespaces)
}

export = Logger
