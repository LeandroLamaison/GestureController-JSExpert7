import CardsController from "./../controllers/cardsController.js"
import CardsView from "./../views/cardsView.js"
import CardsService from "./../services/cardsService.js"
import { getValidWorker } from "../../../../lib/util.js"
import buildCardListWorker from "../workers/cardListWorker/builder.js"

const [rootPath] = window.location.href.split('/pages/')

const factory = {
  async initialize() {
    const cardListWorker = await getValidWorker(
      './src/workers/cardListWorker.js', 
      buildCardListWorker
    )
    
    return CardsController.initialize({
      view: new CardsView(),
      service: new CardsService({
        dbUrl: `${rootPath}/assets/database.json`,
        cardListWorker
      }),
    })
  }
}

export default factory