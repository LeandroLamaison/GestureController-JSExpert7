
import { prepareRunChecker } from '../util.js'

const PIXELS_PER_SCROLL = 100
const CLICK_COOLDOWN_MILLIS = 500

const { shouldRun: shouldRunClick } = prepareRunChecker({ 
  timeDelay: CLICK_COOLDOWN_MILLIS 
})

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

      this.#view.clearCanvas()
      if(hands?.length) {
        this.#view.drawResults(hands)
      }

      for await (const { gesture, indexFingertipX, indexFingertipY } of this.#service.detectGestures(hands)) {
        if(gesture === 'click' && shouldRunClick()) {
          this.#view.clickOnElement(indexFingertipX, indexFingertipY)
          return
        }
        
        if (gesture.includes('scroll-')) {
          this.#scrollPage(gesture)
        }

        if(gesture === 'go-back') {
          this.#view.goBack()
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