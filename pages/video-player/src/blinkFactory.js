import BlinkController from './blinkController.js';
import BlinkView from './blinkView.js';
import buildWorker from './blinkWorker/builder.js';
import Camera from '../../../lib/camera.js';
import { getValidWorker } from '../../../lib/util.js';

const factory = {
  async initialize () {
    const worker = await getValidWorker('./src/blinkWorker/worker.js', buildWorker);
    const camera = await Camera.init();

    const [rootPath] = window.location.href.split('/pages/');
    const videoSrc = `${rootPath}/assets/video.mp4`;
    const view = new BlinkView();
    view.setVideoSrc(videoSrc);

    return BlinkController.initialize({
      view,
      worker,
      camera,
      videoSrc
    });
  }
};

export default factory;
