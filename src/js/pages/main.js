import functionsSwitch from '../modules/functions-switch/';
import offerModal from '../modules/offer-modal';
import form from '../components/form';

const mainPage = () => {
  const openModalButton = document.querySelector('.js-open-modal-hero');
  const formElem = document.querySelector('#offer-form');

  if (openModalButton) {
    offerModal({ openButton: openModalButton });
  }

  if (formElem) {
    form(formElem);
  }

  functionsSwitch();
};

export default mainPage;
