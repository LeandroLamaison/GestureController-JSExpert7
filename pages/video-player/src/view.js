export default class View {
  #btnInit = document.querySelector('#init')
  #statusElement = document.querySelector('#status')
  #videoFrameCanvas = document.createElement('canvas')
  #canvasContext = this.#videoFrameCanvas.getContext('2d', { willReadFrequently: true })
  #videoElement = document.querySelector('#video')

  enableButton() {
    this.#btnInit.disabled = false
  }

  configureOnBtnClick(fn) {
    this.#btnInit.addEventListener('click', fn)
  }

  log(text) {
    this.#statusElement.innerHTML = text
  }

  getVideoFrame(video) {
    const canvas = this.#videoFrameCanvas
    const { videoWidth, videoHeight } = video

    canvas.width = videoWidth
    canvas.height = videoHeight

    this.#canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
    return this.#canvasContext.getImageData(0, 0, videoWidth, videoHeight)
  }

  resumeVideo() {
    this.#videoElement.play()
  }

  pauseVideo() {
    this.#videoElement.pause()
  }
}