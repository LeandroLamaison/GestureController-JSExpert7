import Controller from "./controller.js"
import View from "./view.js"
import Camera from "../../../lib/camera.js"
import { doesSupportWorkerType } from "../../../lib/util.js"

function getWorker(src) {
  if (doesSupportWorkerType()) {
    const worker = new Worker(src, { type: "module" })
    console.log(worker)
    return worker
  }

  console.log('Using mock')
  const workerMock = {
    onmessage: () => { },
    postMessage: () => { }
  }
  return workerMock
}


const factory = {
  async initialize() {
    const worker = getWorker('./src/worker.js')
    const camera = await Camera.init()

    return Controller.initialize({
      view: new View(),
      worker,
      camera
    })
  }
}

export default factory