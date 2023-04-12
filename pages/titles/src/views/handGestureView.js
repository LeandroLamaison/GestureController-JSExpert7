import { fingerLookupIndexes } from "../utils/fingers.js"

export default class HandGestureView {
  #handsCanvas = document.querySelector('#hands')
  #canvasContext = this.#handsCanvas.getContext('2d')
  #styler

  constructor ({ styler }) {
    this.#handsCanvas.width = globalThis.screen.availWidth
    this.#handsCanvas.height = globalThis.screen.availHeight
    this.#styler = styler

    setTimeout(() => {
      this.#styler.loadDocumentStyles()
    })
  }

  clickOnElement(x, y) {
    const element = document.elementFromPoint(x, y)
    if(!element) {
      return
    }

    const rect = element.getBoundingClientRect()
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: rect.left + x,
      clientY: rect.top + y 
    })

    element.dispatchEvent(event)
  }

  clearCanvas() {
    this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
  }

  drawResults(hands) {
    for (const { keypoints, handedness } of hands) {
        if(!keypoints) {
          continue
        }

        this.#canvasContext.fillStyle = handedness === 'Left' ? 'red' : 'green'
        this.#canvasContext.strokeStyle = 'white'
        this.#canvasContext.lineWidth = 8
        this.#canvasContext.lineJoin = 'round'

        this.#drawJoints(keypoints)
        this.#drawFingers(keypoints)
    }
  }

  #drawJoints (keypoints) {
    for (const { x, y } of keypoints) {
      this.#canvasContext.beginPath()

      const correctedX = x - 2
      const correctedY = y - 2
      const radius = 3
      const startAngle = 0
      const endAngle = 2 * Math.PI

      this.#canvasContext.arc(correctedX, correctedY, radius, startAngle, endAngle)
      this.#canvasContext.fill()
    }
  }

  #drawFingers (keypoints) {
    const fingers = Object.keys(fingerLookupIndexes)

    for (const finger of fingers) {
      const points = fingerLookupIndexes[finger].map(index => {
        return keypoints[index]
      })

      const region = new Path2D()

      const [{x, y}] = points
      region.moveTo(x, y)

      for (const point of points) {
        region.lineTo(point.x, point.y)
      }

      this.#canvasContext.stroke(region)
      this.#hoverElement(finger, points)
    }
  }

  #hoverElement (finger, points) {
    if (finger !== 'indexFinger') {
      return
    }

    const tip = points.find(item => item.name === 'index_finger_tip')
    const element = document.elementFromPoint(tip.x, tip.y)
    if(!element) {
      return
    }

    const callback = () => this.#styler.toggleStyle(element, ':hover')
    callback()
    setTimeout(callback, 500)
  }

  loop (fn) {
    requestAnimationFrame(fn)
  }

  canScrollUp (top) {
    return top > 0 
  }

  canScrollDown (top) {
    return top < document.body.clientHeight
  }

  hasScrolledDown(top) {
    return Math.ceil(window.scrollY) >= top
  }

  hasScrolledUp(top) {
    return Math.floor(window.scrollY) <= top
  }

  scrollPage(top) {
    scroll({
      top,
      behavior: 'smooth'
    })
  }
}