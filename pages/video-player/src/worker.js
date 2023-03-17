import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"
import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js"
import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"

import Service from './service.js'

const { tf, faceLandmarksDetection } = self

tf.setBackend('webgl')

console.log('Loading TF model...')
const service = new Service({ faceLandmarksDetection })
await service.loadModel()
console.log('TF model loaded')
postMessage('READY')

onmessage = async ({data: video}) => {
  const hasBlinked = await service.hasBlinked(video)
  if (!hasBlinked) {
    return
  }
  
  console.log('Blinked', hasBlinked)
  postMessage({ hasBlinked })
}
