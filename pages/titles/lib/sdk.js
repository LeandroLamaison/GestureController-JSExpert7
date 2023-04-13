let numCardsGLOBAL = 5;
const DEFAULT_CAROUSELS = document.getElementsByClassName('default-carousel');

const cards = [
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmoviefail.com%2Fwp-content%2Fuploads%2F2014%2F11%2Finterstellar1.jpeg&f=1&nofb=1',
    display_background:
      '//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fhdqwalls.com%2Fdownload%2Finterstellar-gargantua-u4-1920x1080.jpg&f=1&nofb=1',
    title: 'Interstellar',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background: 'https://images.unsplash.com/photo-1482164565953-04b62dcac1cd?ixlib=rb-4.0.3&w=1080&fit=max&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
    display_background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages2.alphacoders.com%2F845%2F84502.jpg&f=1&nofb=1',
    title: 'Inception',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.wallpapersafari.com%2F41%2F1%2Fhj197K.jpg&f=1&nofb=1',
    display_background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages7.alphacoders.com%2F990%2F990610.jpg&f=1&nofb=1',
    title: 'Avengers: Endgame',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fjoker-2019-movie_66632_1920x1080.jpg&f=1&nofb=1',
    display_background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fjoker-stair-dance_68124_1920x1080.jpg&f=1&nofb=1',
    title: 'Joker',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.U2iFUz9mivZeH-h48O5wtwHaEK%26pid%3DApi&f=1',
    title: '1917',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapershome.com%2Fimages%2Fpages%2Fpic_h%2F22685.jpg&f=1&nofb=1',
    title: 'TENET',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2F9%2F6%2F8%2F126147.jpg&f=1&nofb=1',
    title: 'Star Wars: A New Hope',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Foriginal%2FrPpxrz8o0svAPCLucjsEdMXoDfX.jpg&f=1&nofb=1',
    title: 'Venom',
    description:
      'Watch this incredible film made by some incredible people!'
  },
  {
    background:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapertag.com%2Fwallpaper%2Ffull%2F2%2F6%2F8%2F123320-lord-of-the-rings-background-1920x1080-picture.jpg&f=1&nofb=1',
    title: 'Lord of the Rings',
    description:
      'Watch this incredible film made by some incredible people!'
  }
];

const cast = [
  {
    picture:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.scdn.co%2Fimage%2F338040ea81df8012c152cfa65a4c1b440a94a1bc&f=1&nofb=1',
    square: 1000,
    name: 'Will Smith'
  },
  {
    picture:
      '//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsiskiyou.sou.edu%2Fwp-content%2Fuploads%2F2014%2F10%2FRobin.jpg&f=1&nofb=1',
    square: 2000,
    name: 'Robin Williams'
  },
  {
    picture:
      '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.byrdie.com%2Fthmb%2FaSjYcUqubm-ucpugLMuN8m-nvdU%3D%2F796x700%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fcdn.cliqueinc.com__cache__posts__237400__jennifer-lawrence-hairstyles-237400-1506716140954-main.700x0c-af3f438528ea44f0aa9c3c1fe3ef8c64.jpg&f=1&nofb=1',
    square: 700,
    name: 'Jennifer Lawrence'
  }
];

const IsMobile = () => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName('body')[0].clientWidth;

  if (width <= 736) {
    return true;
  } else {
    return false;
  }
};

const CheckSizeAttributes = (carousels = DEFAULT_CAROUSELS) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName('body')[0].clientWidth;

  let newNumCards;

  if (width > 1501) {
    newNumCards = 5;
  } else if (width <= 1500 && width > 1100) {
    newNumCards = 4;
  } else if (width <= 1100 && width > 520) {
    newNumCards = 3;
  } else if (width <= 520) {
    newNumCards = 2;
  }

  for (let i = 0; i < carousels.length; i++) {
    if (carousels[i].children.length > 2) {
      for (let j = 1; j < carousels[i].children.length - 1; j++) {
        carousels[i].children[j].style.display = 'none';
      }
      for (let j = 1; j < newNumCards + 1; j++) {
        carousels[i].children[j].style.display = 'flex';
      }
    }
  }

  numCardsGLOBAL = newNumCards;
};

const ResizeHeader = () => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName('body')[0].clientWidth;

  if (width <= 815) {
    if (document.getElementsByClassName('hamburger').length <= 0) {
      const header = document.getElementsByClassName('header')[0];
      const mainNav = header.getElementsByClassName('main-nav')[0];
      const rightNav = header.getElementsByClassName('right-nav')[0];

      const hamburger = document.createElement('div');
      hamburger.classList.add('hamburger');
      hamburger.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>`;
      mainNav.remove();
      rightNav.remove();

      const bottomHeader = document.createElement('div');
      bottomHeader.classList.add('header-bottom');
      bottomHeader.append(mainNav, rightNav);
      bottomHeader.style.display = 'none';

      hamburger.addEventListener('click', function () {
        if (bottomHeader.style.display === 'none') {
          bottomHeader.style.display = 'flex';
          header.style.paddingBottom = '9px';
          header.style.paddingTop = '9px';
        } else {
          bottomHeader.style.display = 'none';
          header.style.paddingBottom = '0px';
          header.style.paddingTop = '0px';
        }
      });

      header.classList.add('header-change');

      const topHeader = document.createElement('div');
      topHeader.classList.add('header-top');
      topHeader.append(header.children[0], hamburger);

      header.innerHTML = '';
      header.append(topHeader, bottomHeader);
    }
  } else {
    if (document.getElementsByClassName('hamburger').length > 0) {
      const header = document.getElementsByClassName('header')[0];
      const mainNav = header.getElementsByClassName('main-nav')[0];
      const rightNav = header.getElementsByClassName('right-nav')[0];
      const brand = header.getElementsByClassName('brand')[0];

      header.classList.remove('header-change');
      header.children[0].remove();
      header.children[0].remove();
      header.append(brand, mainNav, rightNav);
    }
  }
};

const AddDefaultCards = (carousels = DEFAULT_CAROUSELS) => {
  const carouselWidth = carousels[0]
    .clientWidth;

  const btnWidth =
    document.getElementsByClassName('carousel-btn')[0].clientWidth +
    document.getElementsByClassName('carousel-btn')[1].clientWidth;

  const numCards = numCardsGLOBAL;
  const cardMargin = 2;
  const initialWidth = 1920;
  const initialHeight = 1080;

  const scale =
    (100 * ((carouselWidth - btnWidth) / numCards - cardMargin * 2)) /
    initialWidth;

  const contentTitles = document.getElementsByClassName('content-title');

  for (let i = 0; i < contentTitles.length; i++) {
    contentTitles[i].style.marginLeft = `${cardMargin}px`;
  }

  // let carousels = document.getElementsByClassName("card-carousel")
  for (let i = 0; i < carousels.length; i++) {
    const notChosen = [];

    for (let c = 0; c < cards.length; c++) {
      notChosen.push(c);
    }

    for (let j = 0; j < cards.length; j++) {
      const chosenIndex = Math.floor(Math.random() * notChosen.length);

      const chosenCard = cards[notChosen[chosenIndex]];

      notChosen.splice(chosenIndex, 1);

      const card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundImage = `url(${chosenCard.background})`;

      // If image doesn't load
      card.style.backgroundColor = '#333';

      card.style.width = initialWidth * (scale / 100) + 'px';
      card.style.height = initialHeight * (scale / 100) + 'px';
      card.style.margin = `0px ${cardMargin}px`;
      card.style.minWidth = initialWidth * (scale / 100) + 'px';
      card.style.minHeight = initialHeight * (scale / 100) + 'px';

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      const title = document.createElement('h4');
      title.innerText = chosenCard.title;
      const description = document.createElement('p');
      description.innerText = '1h 22min';

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');

      const button1 = document.createElement('div');
      button1.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>`;
      button1.classList.add('watch');

      button1.addEventListener('click', function () { PlayVideo('00'); });

      const button2 = document.createElement('div');
      button2.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg>`;
      button2.classList.add('queue');

      button2.addEventListener('click', function () {
        ToggleWatchLater(`${chosenCard.title}`);
      });

      const button3 = document.createElement('div');
      button3.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`;
      button3.classList.add('star');
      button3.classList.add('queue');

      button3.addEventListener('click', function () {
        if (button3.children[0].style.color !== 'rgb(255, 255, 87)') {
          button3.children[0].style.color = 'rgb(255, 255, 87)';
        } else {
          button3.children[0].style.color = 'white';
        }
      });

      const button4 = document.createElement('div');
      button4.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>`;
      button4.classList.add('star');
      button4.classList.add('queue');

      button4.addEventListener('click', function () {
        if (document.getElementsByClassName('movie-desc').length > 0) {
          // If the modal exists
          document.getElementsByClassName('movie-desc')[0].remove();
        } else {
          const modal = document.createElement('div');
          modal.classList.add('movie-desc');

          const modalContent = document.createElement('div');
          modalContent.classList.add('modal-content');

          const bgImage = document.createElement('div');
          bgImage.classList.add('desc-image');
          bgImage.style.backgroundImage = `url(${chosenCard.background})`;
          const imageCover = document.createElement('div');

          const closeBtn = document.createElement('div');
          closeBtn.classList.add('close-btn');
          closeBtn.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;

          closeBtn.addEventListener('click', function () {
            this.parentElement.parentElement.parentElement.parentElement.remove();
          });

          imageCover.append(closeBtn);
          bgImage.append(imageCover);

          const topInfo = document.createElement('div');
          topInfo.classList.add('desc-top');
          const title = document.createElement('h1');
          title.innerText = chosenCard.title;

          const btnSelection = document.createElement('div');
          btnSelection.classList.add('button-selection');
          btnSelection.innerHTML = `
                        <div class="watch" onclick="PlayVideo('${chosenCard.show_id}');">
                            <h3>Play</h3>
                            <svg fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                            </svg>
                        </div>
                        <div class="queue" onclick="ToggleWatchLater('${chosenCard.title}');">
                            <h3>Watch Later</h3>
                            <svg fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>`;

          topInfo.append(title, btnSelection);

          const midInfo = document.createElement('div');
          midInfo.classList.add('desc-mid');
          midInfo.innerHTML = `<p>${chosenCard.description}</p>`;

          const bottomInfo = document.createElement('div');
          bottomInfo.classList.add('desc-bottom');

          const castSlider = document.createElement('div');
          castSlider.classList.add('cast');

          bottomInfo.append(castSlider);

          modalContent.append(
            bgImage,
            topInfo,
            midInfo,
            bottomInfo
          );
          modal.append(modalContent);

          document.body.append(modal);

          document.body.addEventListener('click', function (event) {
            if (!event.target.classList.contains('modal-content')) {
              // modal.remove();
            }
          });

          // Set the height for the modal image
          const totalWidth = document.getElementsByClassName(
            'modal-content'
          )[0].clientWidth;
          const largeScale = (100 * totalWidth) / 1920;
          document.getElementsByClassName(
            'desc-image'
          )[0].style.height = `${1080 * (largeScale / 100)}px`;

          // Set image for cast
          for (let c = 0; c < cast.length; c++) {
            const castBlock = document.createElement('div');
            castBlock.classList.add('cast-card');
            castBlock.style.backgroundImage = `url("${cast[c].picture}")`;
            castBlock.style.width = 100 / cast.length - 5 + '%';
            castBlock.style.height = `calc(${document.getElementsByClassName('cast')[0]
              .clientWidth / cast.length
              }"px" - 5%)`;
            castSlider.append(castBlock);
          }
        }
      });

      buttonContainer.append(button1, button2, button3, button4);

      overlay.append(title, description, buttonContainer);
      card.append(overlay);
      if (j < numCards) {
        carousels[i].insertBefore(
          card,
          carousels[i].children[carousels[i].children.length - 1]
        );
      } else {
        card.style.display = 'none';
        carousels[i].insertBefore(
          card,
          carousels[i].children[carousels[i].children.length - 1]
        );
      }
    }
  }
};

const AddBrowseSearchCards = ({ cards, itemsPerLine }) => {
  const cardsCopy = [...cards];
  const carouselsAmount = cardsCopy.length / itemsPerLine;
  const browseSearchDiv = document.getElementById('browseSearch');

  const carousels = [];
  for (let i = 0; i < carouselsAmount; i++) {
    const carousel = document.createElement('div');
    carousel.classList.add('my-carousel', 'card-carousel');
    browseSearchDiv.append(carousel);
    carousels.push(carousel);
  }

  const carouselWidth = carousels[0].clientWidth;
  const btnWidth = 0;

  const cardMargin = 2;
  const initialWidth = 1920;
  const initialHeight = 1080;

  const scale =
    (100 * ((carouselWidth - btnWidth) / itemsPerLine - cardMargin * 2)) /
    initialWidth;

  const contentTitles = browseSearchDiv.getElementsByClassName('content-title');

  for (let i = 0; i < contentTitles.length; i++) {
    contentTitles[i].style.marginLeft = `${cardMargin}px`;
  }

  for (let i = 0; i < carousels.length; i++) {
    const actualCards = cardsCopy.splice(0, itemsPerLine);
    for (const chosenCard of actualCards) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundImage = `url(${chosenCard.background})`;

      // If image doesn't load
      card.style.backgroundColor = '#333';

      card.style.width = initialWidth * (scale / 100) + 'px';
      card.style.height = initialHeight * (scale / 100) + 'px';
      card.style.margin = `0px ${cardMargin}px`;
      card.style.minWidth = initialWidth * (scale / 100) + 'px';
      card.style.minHeight = initialHeight * (scale / 100) + 'px';

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');

      const title = document.createElement('h4');
      title.innerText = chosenCard.title;
      const description = document.createElement('p');
      description.innerText = chosenCard.duration;

      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');

      const button1 = document.createElement('div');
      button1.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>`;
      button1.classList.add('watch');
      button1.addEventListener('click', function () { PlayVideo(chosenCard.show_id); });

      const button2 = document.createElement('div');
      button2.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg>`;
      button2.classList.add('queue');

      button2.addEventListener('click', function () {
        ToggleWatchLater(`${chosenCard.title}`);
      });

      const button3 = document.createElement('div');
      button3.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`;
      button3.classList.add('star');
      button3.classList.add('queue');

      button3.addEventListener('click', function () {
        if (button3.children[0].style.color !== 'rgb(255, 255, 87)') {
          button3.children[0].style.color = 'rgb(255, 255, 87)';
        } else {
          button3.children[0].style.color = 'white';
        }
      });

      const button4 = document.createElement('div');
      button4.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>`;
      button4.classList.add('star');
      button4.classList.add('queue');

      button4.addEventListener('click', function () {
        if (document.getElementsByClassName('movie-desc').length > 0) {
          // If the modal exists
          document.getElementsByClassName('movie-desc')[0].remove();
        } else {
          const modal = document.createElement('div');
          modal.classList.add('movie-desc');

          const modalContent = document.createElement('div');
          modalContent.classList.add('modal-content');

          const bgImage = document.createElement('div');
          bgImage.classList.add('desc-image');
          bgImage.style.backgroundImage = `url(${chosenCard.background})`;
          const imageCover = document.createElement('div');

          const closeBtn = document.createElement('div');
          closeBtn.classList.add('close-btn');
          closeBtn.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;

          closeBtn.addEventListener('click', function () {
            this.parentElement.parentElement.parentElement.parentElement.remove();
          });

          imageCover.append(closeBtn);
          bgImage.append(imageCover);

          const topInfo = document.createElement('div');
          topInfo.classList.add('desc-top');
          const title = document.createElement('h1');
          title.innerText = chosenCard.title;

          const btnSelection = document.createElement('div');
          btnSelection.classList.add('button-selection');
          btnSelection.innerHTML = `
                        <div class="watch" onclick="PlayVideo('${chosenCard.show_id}');">
                            <h3>Play</h3>
                            <svg fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
                            </svg>
                        </div>
                        <div class="queue" onclick="ToggleWatchLater('${chosenCard.title}');">
                            <h3>Watch Later</h3>
                            <svg fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>`;

          topInfo.append(title, btnSelection);

          const midInfo = document.createElement('div');
          midInfo.classList.add('desc-mid');
          midInfo.innerHTML = `<p>${chosenCard.description}</p>`;

          const bottomInfo = document.createElement('div');
          bottomInfo.classList.add('desc-bottom');

          const castSlider = document.createElement('div');
          castSlider.classList.add('cast');

          bottomInfo.append(castSlider);

          modalContent.append(
            bgImage,
            topInfo,
            midInfo,
            bottomInfo
          );
          modal.append(modalContent);

          document.body.append(modal);

          document.body.addEventListener('click', function (event) {
            if (!event.target.classList.contains('modal-content')) {
              // modal.remove();
            }
          });

          // Set the height for the modal image
          const totalWidth = document.getElementsByClassName(
            'modal-content'
          )[0].clientWidth;
          const largeScale = (100 * totalWidth) / 1920;
          document.getElementsByClassName(
            'desc-image'
          )[0].style.height = `${1080 * (largeScale / 100)}px`;

          // Set image for cast
          for (let c = 0; c < cast.length; c++) {
            const castBlock = document.createElement('div');
            castBlock.classList.add('cast-card');
            castBlock.style.backgroundImage = `url("${cast[c].picture}")`;
            castBlock.style.width = 100 / cast.length - 5 + '%';
            castBlock.style.height = `calc(${document.getElementsByClassName('cast')[0]
              .clientWidth / cast.length
              }"px" - 5%)`;
            castSlider.append(castBlock);
          }
        }
      });

      buttonContainer.append(button1, button2, button3, button4);

      overlay.append(title, description, buttonContainer);
      card.append(overlay);

      carousels[i].insertBefore(
        card,
        carousels[i].children[carousels[i].children.length - 1]
      );
    }
  }
};

const CheckCards = (carousels = DEFAULT_CAROUSELS, numCards = numCardsGLOBAL) => {
  // let carousels = document.getElementsByClassName("card-carousel")

  for (let i = 0; i < carousels.length; i++) {
    const carouselWidth = carousels[i].clientWidth;

    const btnWidth =
      (carousels[i].getElementsByClassName('carousel-btn')?.[0]?.clientWidth +
        carousels[i].getElementsByClassName('carousel-btn')?.[1]?.clientWidth) ?? 10;

    // let numCards = numCardsGLOBAL
    const cardMargin = 2;
    const initialWidth = 1920;
    const initialHeight = 1080;

    const scale =
      (100 *
        ((carouselWidth - btnWidth) / numCards - cardMargin * 2)) /
      initialWidth;

    const cards = carousels[i].getElementsByClassName('card');

    for (let i = 0; i < cards.length; i++) {
      cards[i].style.width = initialWidth * (scale / 100) + 'px';
      cards[i].style.height = initialHeight * (scale / 100) + 'px';
      cards[i].style.margin = `0px ${cardMargin}px`;
      cards[i].style.minWidth = initialWidth * (scale / 100) + 'px';
      cards[i].style.minHeight = initialHeight * (scale / 100) + 'px';
    }

    if (IsMobile()) {
      carousels[i].style.height = 1.6 * (initialHeight * (scale / 100)) + 'px';
    } else {
      carousels[i].style.height = 'auto';
    }
  }
};

const AddCarouselButtons = (carousels = DEFAULT_CAROUSELS) => {
  // let carousels = document.getElementsByClassName("card-carousel")
  for (let i = 0; i < carousels.length; i++) {
    const btn1 = document.createElement('div');
    btn1.classList.add('carousel-btn');
    btn1.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16" onclick="Previous(this);">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>`;

    const btn2 = document.createElement('div');
    btn2.classList.add('carousel-btn');

    btn2.innerHTML = `<svg fill="currentColor" viewBox="0 0 16 16" onclick="Next(this);">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>`;

    carousels[i].append(btn1, btn2);
  }
};

const ScrollFunction = () => {
  const header = document.getElementsByClassName('header')[0];
  if (document.documentElement.scrollTop > 1) {
    header.classList.add('header-active');
  } else {
    header.classList.remove('header-active');
  }
};

const MakeJumbotron = () => {
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight;

  document.getElementsByClassName('top')[0].style.height = `${height}px`;
};

const SmoothScroll = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const Next = (elem) => {
  const carousel = elem.parentElement.parentElement;
  const firstElement = carousel.children[1];
  let nextElement;

  for (let i = 0; i < carousel.children.length; i++) {
    if (carousel.children[i].style.display === 'none') {
      nextElement = carousel.children[i];
      break;
    }
  }

  firstElement.style.display = 'none';
  firstElement.remove();
  carousel.insertBefore(
    firstElement,
    carousel.children[carousel.children.length - 1]
  );

  nextElement.style.display = 'flex';
};

const Previous = (elem) => {
  const carousel = elem.parentElement.parentElement;
  let lastDisplayItem;
  const prevElement = carousel.children[carousel.children.length - 2];

  for (let i = 0; i < carousel.children.length; i++) {
    if (
      carousel.children[i].style.display !== 'none' &&
      !carousel.children[i].classList.contains('carousel-btn')
    ) {
      lastDisplayItem = carousel.children[i];
    }
  }

  lastDisplayItem.style.display = 'none';

  carousel.insertBefore(prevElement, carousel.children[1]);

  prevElement.style.display = 'flex';
};

const ToggleWatchLater = (movie = '', activate = true) => {
  const modal = document.getElementsByClassName('watch-later-modal')[0];

  if (movie !== '') {
    modal.getElementsByClassName('movie')[0].innerText = movie;
  }

  if (activate) {
    modal.style.display = 'flex';
  } else {
    modal.style.display = 'none';
  }
};

const PlayVideo = (movieTitle) => {
  const [rootPath] = window.location.href.split('/pages/');
  window.location.href = `${rootPath}/pages/video-player?title=${movieTitle}`;
};

const Initialize = () => {
  AddCarouselButtons();
  CheckSizeAttributes();
  AddDefaultCards();
  MakeJumbotron();
  CheckCards();
  ResizeHeader();
  const body = document.getElementById('body');
  body.onscroll = () => ScrollFunction();
};

window.addEventListener('load', () => {
  Initialize();
});

window.IsMobile = IsMobile;
window.CheckSizeAttributes = CheckSizeAttributes;
window.ResizeHeader = ResizeHeader;
window.AddCardsOnBrowseSearchGrid = AddBrowseSearchCards;
window.CheckCards = CheckCards;
window.AddCarouselButtons = AddCarouselButtons;
window.ScrollFunction = ScrollFunction;
window.MakeJumbotron = MakeJumbotron;
window.SmoothScroll = SmoothScroll;
window.Next = Next;
window.Previous = Previous;
window.ToggleWatchLater = ToggleWatchLater;
window.PlayVideo = PlayVideo;
