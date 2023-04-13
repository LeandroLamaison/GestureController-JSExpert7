import Controller from "./controller.js"
import View from "./view.js"
import Camera from "../../../lib/camera.js"
import { getValidWorker } from "../../../lib/util.js"
import buildWorker from "./worker/builder.js"

const factory = {
  async initialize() {
    const worker = await getValidWorker('./src/worker/worker.js', buildWorker)
    const camera = await Camera.init()

    return Controller.initialize({
      view: new View(),
      worker,
      camera
    })
  }
}

export default factory