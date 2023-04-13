import { prepareRunChecker } from '../../../lib/util.js';

const BLINK_DELAY = 2000;
const { shouldRun } = prepareRunChecker({ timeDelay: BLINK_DELAY });

export default class BlinkService {
  EAR_THRESHOLD = 0.27;
  #model = null;
  #faceLandmarksDetection = undefined;

  constructor ({ faceLandmarksDetection }) {
    this.#faceLandmarksDetection = faceLandmarksDetection;
  }

  async loadModel () {
    this.#model = await this.#faceLandmarksDetection.load(
      this.#faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
      { maxFaces: 1 }
    );
    return this.#model;
  }

  async hasBlinked (video) {
    const predictions = await this.#estimateFaces(video);

    for (const prediction of predictions) {
      // Right eye parameters
      const lowerRight = prediction.annotations.rightEyeUpper0;
      const upperRight = prediction.annotations.rightEyeLower0;
      const rightEAR = this.#getEAR(upperRight, lowerRight);
      // Left eye parameters
      const lowerLeft = prediction.annotations.leftEyeUpper0;
      const upperLeft = prediction.annotations.leftEyeLower0;
      const leftEAR = this.#getEAR(upperLeft, lowerLeft);

      const isLeftEyeClosed = leftEAR <= this.EAR_THRESHOLD;
      const isRightEyeClosed = rightEAR <= this.EAR_THRESHOLD;

      const hasBlinkedLeft = isLeftEyeClosed && !isRightEyeClosed;
      const hasBlinkedRight = isRightEyeClosed && !isLeftEyeClosed;

      if ((!hasBlinkedLeft && !hasBlinkedRight) || !shouldRun()) {
        continue;
      }

      return { left: hasBlinkedLeft, right: hasBlinkedRight };
    }

    return { left: false, right: false };
  }

  // Calculate the position of eyelid to predict a blink
  #getEAR (upper, lower) {
    function getEucledianDistance (x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    return (
      (getEucledianDistance(upper[5][0], upper[5][1], lower[4][0], lower[4][1]) +
        getEucledianDistance(
          upper[3][0],
          upper[3][1],
          lower[2][0],
          lower[2][1]
        )) /
      (2 *
        getEucledianDistance(upper[0][0], upper[0][1], upper[8][0], upper[8][1]))
    );
  }

  #estimateFaces (video) {
    return this.#model.estimateFaces({
      input: video,
      returnTensors: false,
      flipHorizontal: true,
      predictIrises: true
    });
  }
}
