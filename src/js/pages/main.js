import functionsSwitch from '../modules/functions-switch/';
import offerModal from '../modules/offer-modal';
import form from '../components/form';

const main = () => {
  const openModalButton1 = document.querySelector('.js-open-modal-hero');
  const openModalButton2 = document.querySelector('.js-open-modal-install');
  const formElem = document.querySelector('#form-offer-modal');

  if (openModalButton1) {
    offerModal({openButton: openModalButton1});
  }

  if (openModalButton2) {
    offerModal({openButton: openModalButton2});
  }

  if (formElem) {
    form(formElem);
  }

  functionsSwitch();
  let videos = document.getElementsByTagName("video");
  let tabsDesktop = document.querySelectorAll(".tabs__controls .tabs__control");
  let tabsMobile = document.querySelectorAll(".tabs__controls--mobile .tabs__wrapper .tabs__control");
  // console.log(tabsDesktop);
  // console.log(tabsMobile);
  // console.log(videos);

  function checkScroll() {
    for (let y = 0; y < 5; y++) {
      tabsDesktop[y].addEventListener('click', function () {
        videos[y].play();
      });
    }
    for (let j = 0; j < 5; j++) {
      tabsMobile[j].addEventListener('click', function () {
        videos[j].play();
      });
    }

    for (let i = 0; i < videos.length; i++) {
      if (i === 0 || i === 5 || i === 6) {
        let
          x = videos[i].offsetLeft,
          y = videos[i].offsetTop,
          w = videos[i].offsetWidth,
          h = videos[i].offsetHeight,
          r = x + w,
          b = y + h,
          visibleX,
          visibleY,
          visible;

        visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

        visible = visibleX * visibleY / (w * h);

        // console.log('video:', i);
        // console.log(visibleY);
        // console.log('______________');
        if (0 < visible < 100) {
          videos[i].play();
        }
      }
    }
  }

  document.addEventListener('scroll', checkScroll, false);
  checkScroll();
};
export default main;
