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

export async function buildWorkerMock (buildWorker) {
  const workerCtx = {}
  const workerMock = new Proxy({}, {
    get: function (obj, name) {
      return obj[name]
    },
    set: async function (obj, name, value) {
      obj[name] = value
      if(name === 'onmessage') {
        await buildWorker(workerCtx)
      }
      return true
    }
  })
  
  workerCtx.postMessage = function (data) {
    workerMock.onmessage({ data })
  }

  workerMock.postMessage = function (data) {
    workerCtx.onmessage({ data })
  }

  return workerMock
}

