import functionsSwitch from '../modules/functions-switch/';
import offerModal from '../modules/offer-modal';
import form from '../components/form';

const main = () => {
  const openModalButton1 = document.querySelector('.js-open-modal-hero');
  const openModalButton2 = document.querySelector('.js-open-modal-install');
  const formElem = document.querySelector('#offer-form');

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


  function checkScroll() {
    console.log(1);
    let videos = document.getElementsByTagName("video");
    let tabs = document.querySelectorAll(".tabs__control");
    let fraction = 1; // Play when 80% of the player is visible.

    for (let i = 0; i < videos.length; i++) {

      tabs[i].addEventListener('click', function () {
        videos[i].play();
      });
      videos[i].addEventListener('click', function () {
        if (this.paused == true) {
          videos[i].play();
        } else {
          this.pause();
        }
      });
      let
        x = videos[i].offsetLeft,
        y = videos[i].offsetTop,
        w = videos[i].offsetWidth,
        h = videos[i].offsetHeight,
        r = x + w, //right
        b = y + h, //bottom
        visibleX,
        visibleY,
        visible;

      visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
      visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

      visible = visibleX * visibleY / (w * h);

      console.log('video:', i);
      console.log(visibleY);
      console.log('______________');
      if (0 < visible < 100) {
        videos[i].play();
      }
    }
  }

  window.addEventListener('scroll', checkScroll, false);
  checkScroll();
};
export default main;
