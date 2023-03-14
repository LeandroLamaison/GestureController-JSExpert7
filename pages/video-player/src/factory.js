import Controller from "./controller.js"
import View from "./view.js"
import Camera from "../../../lib/camera.js"
import { doesSupportWorkerType } from "../../../lib/util.js"

function getWorker(src) {
  if (doesSupportWorkerType()) {
    return new Worker(src, { type: "module" })
  }

  const workerMock = {
    onmessage: () => { },
    postMessage: () => { }
  }
  return workerMock
}


const factory = {
  async initialize() {
    const worker = await getWorker('./src/worker.js')
    const camera = await Camera.init()

    return Controller.initialize({
      view: new View(),
      worker,
      camera
    })
  }
}

export default factory