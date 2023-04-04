
import { gestureStrings } from '../utils/gestures.js'

const PIXELS_PER_SCROLL = 100


export default class HandGestureController {
  #camera
  #view
  #service
  #scrollPositionY = 0
  #lastDirection = ''
  
  constructor({ camera, view, service }) {
    this.#camera = camera
    this.#view = view
    this.#service = service
  }

  async #scrollPage(direction) {
    const currentScrollY = this.#scrollPositionY
    const lastDirection = this.#lastDirection

    if(direction === 'scroll-top') {
      this.#lastDirection = null
      this.#scrollPositionY = 0
      this.#view.scrollPage(this.#scrollPositionY)
      return
    }

    if (
      (lastDirection === 'scroll-down' && !this.#view.hasScrolledDown(currentScrollY)) ||
      (lastDirection === 'scroll-up' && !this.#view.hasScrolledUp(currentScrollY))
    ) {
      this.#lastDirection = direction
      return
    }

    if (direction === 'scroll-down' && this.#view.canScrollDown(currentScrollY)) {
      this.#scrollPositionY += PIXELS_PER_SCROLL
    }

    if (direction === 'scroll-up' && this.#view.canScrollUp(currentScrollY)) {
      this.#scrollPositionY -= PIXELS_PER_SCROLL
    }

    this.#lastDirection = direction

    this.#view.scrollPage(this.#scrollPositionY)
  }

  async #estimateHands () {
    try {
      const hands = await this.#service.estimateHands(this.#camera.video)
      for await (const { gesture, indexFingertipX, indexFingertipY } of this.#service.detectGestures(hands)) {
        console.log(gestureStrings[gesture])
        
        if (gesture.includes('scroll-')) {
          this.#scrollPage(gesture)
        }
      }
    } catch (err) {
      console.error(err, "Something went wrong on hand estimative")
    }
  }

  async #loop() {
    await this.#service.initializeDetector()
    await this.#estimateHands()
    this.#view.loop(this.#loop.bind(this))
  }

  async init() {
    this.#loop()
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps)
    return controller.init()
  }
}