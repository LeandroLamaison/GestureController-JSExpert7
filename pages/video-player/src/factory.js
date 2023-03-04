import Controller from "./controller.js"
import View from "./view.js"
import Service from "./service.js"

const factory = {
  initialize() {
    return Controller.initialize({
      view: new View(),
      service: new Service({
        worker: new Worker('./src/worker.js', { type: 'module' })
      })
    })
  }
}

export default factory