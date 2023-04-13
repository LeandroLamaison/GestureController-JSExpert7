export default class BlinkController {
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
    const controller = new BlinkController({ view, worker, camera })
    controller.log('Not yet detecting eye blink! Click in the button to start.')
  }
  
  log(text) {
    this.#view.log(text)
  }

  onBtnStart() {
    this.log('Left blink to resume video. Right blink to pause video.')
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
        this.#view.enableButton()
        ready = true
        return
      }

      const hasBlinkedLeft = data.hasBlinkedLeft
      if(hasBlinkedLeft) {
        this.#view.resumeVideo()
      }

      const hasBlinkedRight = data.hasBlinkedRight
      if(hasBlinkedRight) {
        this.#view.pauseVideo()
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