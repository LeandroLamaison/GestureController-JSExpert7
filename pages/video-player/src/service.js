export default class Service {
  #worker

  constructor({ worker }) {
    this.#worker = worker
  }

  async init() {
    console.log('Hello from service')
    this.#worker.postMessage('Hello')
  }
}