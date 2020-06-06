import modal from '../components/modal';
import form from '../components/form';

class OfferModal {
  constructor(props) {
    this.props = props;
    this.modal;
    this.form;

    this.setModal = this.setModal.bind(this);
  }

  static init(props) {
    const offerModal = new OfferModal(props);
    offerModal.setModal();
  }

  setModal() {
    const offerModal = document.querySelector('#modal-offer');
    const formElem = offerModal.querySelector('#modal-offer-form');
    const modalProps = {
      modal: offerModal,
      overlay: offerModal.querySelector('.modal__overlay'),
      closeButton: offerModal.querySelector('.modal__close'),
    };

    this.modal = modal({ ...this.props, ...modalProps });
    this.form = form(formElem);
  }
}

export default OfferModal.init;
