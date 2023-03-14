import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"
import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js"
import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"
  
const { tf, faceLandmarksDetection } = self

tf.setBackend('webgl')

const prepareRunChecker = ({ timeDelay = 1000 }) => {
  let lastEvent = Date.now()

  return {
    shouldRun() {
      const interval = (Date.now() - lastEvent)

      if(interval > timeDelay) {
        lastEvent = Date.now()
        return true
      }
      
      return false
    }
  }
}

const BLINK_DELAY = 2000
const { shouldRun } = prepareRunChecker({ timeDelay: BLINK_DELAY })

const service = {
  _model: null,
  _faceLandmarksDetection: undefined,
  EAR_THRESHOLD: 0.27,


  async loadModel() {
    this._model = await this._faceLandmarksDetection.load(
      this._faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: 1 }
    )
    return this._model
  },

  async hasBlinked(video) {
    const predictions =  await this._estimateFaces(video)

    for (const prediction of predictions) {
      // Right eye parameters
      const lowerRight = prediction.annotations.rightEyeUpper0;
      const upperRight = prediction.annotations.rightEyeLower0;
      const rightEAR = this._getEAR(upperRight, lowerRight);
      // Left eye parameters
      const lowerLeft = prediction.annotations.leftEyeUpper0;
      const upperLeft = prediction.annotations.leftEyeLower0;
      const leftEAR = this._getEAR(upperLeft, lowerLeft);

      // True if the eye is closed
      const hasBlinked = leftEAR <= this.EAR_THRESHOLD && rightEAR <= this.EAR_THRESHOLD;
      if(!hasBlinked || !shouldRun()) {
        continue
      }

      return true
    }

    return false
  },

  // Calculate the position of eyelid to predict a blink
  _getEAR(upper, lower) {
    function getEucledianDistance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    return (
      (getEucledianDistance(upper[5][0], upper[5][1], lower[4][0], lower[4][1])
        + getEucledianDistance(
          upper[3][0],
          upper[3][1],
          lower[2][0],
          lower[2][1],
        ))
      / (2
        * getEucledianDistance(upper[0][0], upper[0][1], upper[8][0], upper[8][1]))
    );
  },

  _estimateFaces(video) {
    return this._model.estimateFaces({
      input: video,
      returnTensors: false,
      flipHorizontal: true,
      predictIrises: true
    })
  },

  initialize({ faceLandmarksDetection }) {
    this._faceLandmarksDetection = faceLandmarksDetection
  }
}

service.initialize({ faceLandmarksDetection })

console.log('Loading TF model...')
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
