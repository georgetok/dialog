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
  if (tabsDesktop.length) {
    for (let i = 0; i < 5; i++) {
      tabsDesktop[i].addEventListener('click', function () {
        if (videos[i].paused === true) {
          videos[i].play();
        }
      });
      videos[i].addEventListener('click', function () {
        if (this.paused === true) {
          this.play();
        } else {
          this.pause();
        }
      });
    }
    for (let j = 0; j < 5; j++) {
      tabsMobile[j].addEventListener('click', function () {
        videos[j].play();
      });
    }
  }
};
export default main;
