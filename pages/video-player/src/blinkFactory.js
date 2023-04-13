import BlinkController from "./blinkController.js"
import BlinkView from "./blinkView.js"
import buildWorker from "./blinkWorker/builder.js"
import Camera from "../../../lib/camera.js"
import { getValidWorker } from "../../../lib/util.js"

const factory = {
  async initialize() {
    const worker = await getValidWorker('./src/blinkWorker/worker.js', buildWorker)
    const camera = await Camera.init()

    return BlinkController.initialize({
      view: new BlinkView(),
      worker,
      camera
    })
  }
}

export default factory