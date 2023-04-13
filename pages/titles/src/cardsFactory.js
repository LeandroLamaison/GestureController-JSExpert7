import CardsController from './cardsController.js';
import CardsView from './cardsView.js';
import CardsService from './cardsService.js';
import { getValidWorker } from '../../../lib/util.js';
import buildCardListWorker from './cardListWorker/builder.js';

const [rootPath] = window.location.href.split('/pages/');

const factory = {
  async initialize () {
    const cardListWorker = await getValidWorker(
      './src/cardListWorker/cardListWorker.js',
      buildCardListWorker
    );

    return CardsController.initialize({
      view: new CardsView(),
      service: new CardsService({
        dbUrl: `${rootPath}/assets/database.json`,
        cardListWorker
      })
    });
  }
};

export default factory;
