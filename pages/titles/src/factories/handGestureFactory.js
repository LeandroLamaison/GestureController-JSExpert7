import HandGestureController from "./../controllers/handGestureController.js"
import HandGestureView from "./../views/handGestureView.js"
import HandGestureService from "./../services/handGestureService.js"

const factory = {
  async initialize() {
    return HandGestureController.initialize({
      view: new HandGestureView(),
      service: new HandGestureService(),
    })
  }
}

export default factory