export default class Controller {
  #view
  #service

  constructor({ view, service }) {
    this.#view = view
    this.#service = service
    this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
  }

  static initialize({ view, service }) {
    const controller = new Controller({ view, service })
    controller.log('Not yet detecting eye blink! Click in the button to start.')
    return controller.init()
  }

  async init() {
    console.log('Hello from controller')
    this.#view.init()
    this.#service.init()
  }

  log(text) {
    this.#view.log(text)
  }

  onBtnStart() {
    this.log('Initializing detection...')
  }
}