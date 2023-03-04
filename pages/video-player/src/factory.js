import Controller from "./controller.js"
import View from "./view.js"
import Service from "./service.js"
import Camera from "../../../lib/camera.js"
import { doesSupportWorkerType } from "../../../lib/util.js"

function getWorker(src) {
  if (doesSupportWorkerType()) {
    return new Worker(src, { type: 'module' })
  }

  const workerMock = {
    onmessage: () => { },
    postMessage: () => { }
  }
  return workerMock
}

const factory = {
  async initialize() {
    await Camera.init()
    return Controller.initialize({
      view: new View(),
      service: new Service({
        worker: getWorker('./src/worker.js')
      })
    })
  }
}

export default factory