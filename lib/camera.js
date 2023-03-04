export default class Camera {
  video

  constructor() {
    this.video = document.createElement('video')
  }

  static async init() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('navigator.mediaDevices.getUserMedia not supported')
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: {
          ideal: 60
        }
      }
    })

    const camera = new Camera()
    camera.video.srcObject = stream

    camera.video.width = 240
    camera.video.height = 320
    document.body.append(camera.video)

    await new Promise(resolve => {
      camera.video.onloadedmetadata = () => {
        resolve(camera.video)
      }
    })

    camera.video.play()

    return camera
  }
}