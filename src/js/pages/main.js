import functionsSwitch from '../modules/functions-switch/';
import offerModal from '../modules/offer-modal';
import form from '../components/form';

const main = () => {
  const openModalButton1 = document.querySelector('.js-open-modal-hero');
  const openModalButton2 = document.querySelector('.js-open-modal-install');
  const formElem = document.querySelector('#offer-form');

  if (openModalButton1) {
    offerModal({ openButton: openModalButton1 });
  }

  if (openModalButton2) {
    offerModal({ openButton: openModalButton2 });
  }

  if (formElem) {
    form(formElem);
  }

  functionsSwitch();
};
export default main;
