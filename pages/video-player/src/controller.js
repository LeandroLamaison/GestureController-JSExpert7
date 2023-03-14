export default class Controller {
  #view
  #worker
  #camera

  constructor({ view, worker, camera }) {
    this.#view = view
    this.#worker = this.#configureWorker(worker)
    this.#camera = camera
    this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
  }

  static initialize({ view, worker, camera }) {
    const controller = new Controller({ view, worker, camera })
    controller.log('Not yet detecting eye blink! Click in the button to start.')
  }
  
  log(text) {
    this.#view.log(text)
  }

  onBtnStart() {
    this.log('Initializing detection...')
    this.printVideoOnLoop()
  }

  printVideoOnLoop() {
    const video = this.#camera.video

    setTimeout(() => {
      const img = this.#view.getVideoFrame(video)
      this.#worker.send(img)
      this.printVideoOnLoop()
    }, 100)
  }

  #configureWorker(worker) {
    let ready = false
    worker.onmessage = ({ data }) => {
      if(data === 'READY') {
        console.log('Worker is ready')
        this.#view.enableButton()
        ready = true
        return
      }

      const hasBlinked = data.hasBlinked
      if(hasBlinked) {
        this.#view.toggleVideo()
      }
    }

    return {
      send (message) {
        if(!ready) {
          return
        }

        worker.postMessage(message)
      }
    }
  }
}