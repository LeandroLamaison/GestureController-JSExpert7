import { findFingerTip } from './util/fingers.js';
import { knownGestures } from './util/gestures.js';

const DETECTION_TRUST_PERCENTAGE = 9;

export default class HandGestureService {
  #gestureEstimator;
  #handPoseDetection;
  #handPoseVersion;
  #detector = null;

  constructor ({ fingerPoseDetection, handPoseDetection, handPoseVersion }) {
    this.#gestureEstimator = new fingerPoseDetection.GestureEstimator(knownGestures);
    this.#handPoseDetection = handPoseDetection;
    this.#handPoseVersion = handPoseVersion;
  }

  async * detectGestures (predictions) {
    for (const hand of predictions) {
      if (!hand.keypoints3D) {
        continue;
      }

      const { gestures } = await this.#estimateGestures(hand.keypoints3D);
      if (!gestures.length) {
        continue;
      }

      const clearerGesture = gestures.reduce((previous, current) => {
        return previous.score > current.score ? previous : current;
      });

      const indexFingertip = findFingerTip(hand.keypoints);

      yield {
        gesture: clearerGesture.name,
        indexFingertipX: indexFingertip.x,
        indexFingertipY: indexFingertip.y
      };
    }
  }

  async #estimateGestures (keypoints3D) {
    return this.#gestureEstimator.estimate(
      this.#getLandmarksFromKeyPoints(keypoints3D),
      DETECTION_TRUST_PERCENTAGE
    );
  }

  #getLandmarksFromKeyPoints (keypoints3D) {
    return keypoints3D.map(keypoint => [
      keypoint.x, keypoint.y, keypoint.z
    ]);
  }

  async initializeDetector () {
    if (this.#detector) {
      return this.#detector;
    }

    const model = this.#handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handPoseVersion}`,
      modelType: 'lite',
      maxHands: 2
    };
    this.#detector = await this.#handPoseDetection.createDetector(model, detectorConfig);
    return this.#detector;
  }

  async estimateHands (video) {
    return this.#detector.estimateHands(video, {
      flipHorizontal: true
    });
  }
}
