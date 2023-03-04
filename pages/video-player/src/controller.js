export default class Controller {
  #view
  #service

  constructor({ view, service }) {
    this.#view = view
    this.#service = service
  }

  static initialize({ view, service }) {
    return new Controller({ view, service }).init()
  }

  async init() {
    console.log('Hello from controller')
    this.#view.init()
    this.#service.init()
  }
}