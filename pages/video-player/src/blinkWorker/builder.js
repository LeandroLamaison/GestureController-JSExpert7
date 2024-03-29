import 'https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js';
import 'https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js';
import 'https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js';
import 'https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js';

import BlinkService from '../blinkService.js';

const { tf, faceLandmarksDetection } = self;

export default async function buildWorker (ctx) {
  tf.setBackend('webgl');

  console.log('Loading TF model...');
  const service = new BlinkService({ faceLandmarksDetection });
  await service.loadModel();
  console.log('TF model loaded');
  ctx.postMessage('READY');

  ctx.onmessage = async function onmessage ({ data: video }) {
    const hasBlinked = await service.hasBlinked(video);

    if (hasBlinked.left) {
      ctx.postMessage({ hasBlinkedLeft: true });
      return;
    }

    if (hasBlinked.right) {
      ctx.postMessage({ hasBlinkedRight: true });
    }
  };
}
