export function doesSupportWorkerType() {
  let doesSupport = false

  const tester = {
    get type() {
      doesSupport = true
    }
  }

  try {
    new Worker('blob://', tester).terminate()
  } finally {
    return doesSupport
  }
}

export function prepareRunChecker ({ timeDelay = 1000 }) {
  let lastEvent = Date.now()

  return {
    shouldRun() {
      const interval = (Date.now() - lastEvent)

      if(interval > timeDelay) {
        lastEvent = Date.now()
        return true
      }
      
      return false
    }
  }
}