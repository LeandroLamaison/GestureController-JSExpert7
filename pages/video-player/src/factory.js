import Controller from "./controller.js"
import View from "./view.js"
import Camera from "../../../lib/camera.js"
import { buildWorkerMock, doesSupportWorkerType } from "../../../lib/util.js"
import buildWorker from "./worker/builder.js"

async function getWorker(src) {
  if (doesSupportWorkerType()) {
    return new Worker(src, { type: "module" })
  }

  return buildWorkerMock(buildWorker)
}


const factory = {
  async initialize() {
    const worker = await getWorker('./src/worker/worker.js')
    const camera = await Camera.init()

    return Controller.initialize({
      view: new View(),
      worker,
      camera
    })
  }
}

export default factory