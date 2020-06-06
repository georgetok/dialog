import constants from '../utils/consts';

const { bodyScrollLock } = window;
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const clearAllBodyScrollLocks = bodyScrollLock.clearAllBodyScrollLocks;
const Esc = constants.keyCode.ESC;

// const setIPhoneHeight = (elem) => {
//   const isIPhone = /iPhone|iPod/i.test(navigator.userAgent);

//   if(isIPhone) {
//     elem.style.minHeight = '100%';
//   }
// };
class Modal {
  constructor(props) {
    const {
      modal,
      openButton,
      closeButton,
      overlay,
      contentContainer,
      modalOpenClassName = 'is-open',
      modalCloseClassName = 'is-hide',
      onOpenButtonClick,
      onShow,
      onHide,
    } = props;

    this.modal = modal;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.modalOpenClassName = modalOpenClassName;
    this.modalCloseClassName = modalCloseClassName;
    this.overlay = overlay;
    this.contentContainer = contentContainer ? contentContainer : modal;
    this.isShow = false;
    this.onOpenButtonClick = onOpenButtonClick;
    this.onShow = onShow;
    this.onHide = onHide;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.addHandlers = this.addHandlers.bind(this);
    this.openButtonClickHandler = this.openButtonClickHandler.bind(this);
    this.closeButtonClickHandler = this.closeButtonClickHandler.bind(this);
    this.addKeydownHandler = this.addKeydownHandler.bind(this);
    this.removeKeydownHandler = this.removeKeydownHandler.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.overlayClickHandler = this.overlayClickHandler.bind(this);
  }

  static init(props) {
    const modal = new Modal(props);

    modal.addHandlers();
    modal.setStartState();
    // setIPhoneHeight(modal.modal);

    return modal;
  }

  setStartState() {
    this.modal.classList.remove(this.modalOpenClassName);
    this.modal.classList.remove(this.modalCloseClassName);
    this.isShow = false;

    clearAllBodyScrollLocks();
  }

  show() {
    this.modal.classList.add(this.modalOpenClassName);
    this.modal.classList.remove(this.modalCloseClassName);
    this.isShow = true;

    disableBodyScroll(this.modal);
    this.addKeydownHandler();

    if (this.onShow) {
      this.onShow();
    }
  }

  hide() {
    this.modal.classList.remove(this.modalOpenClassName);
    this.modal.classList.add(this.modalCloseClassName);
    this.isShow = false;

    clearAllBodyScrollLocks();
    this.removeKeydownHandler();

    if (this.onHide) {
      this.onHide();
    }
  }

  openButtonClickHandler() {
    if (this.onOpenButtonClick) {
      this.onOpenButtonClick();
    }

    this.show();
  }

  closeButtonClickHandler() {
    this.hide();
  }

  overlayClickHandler(evt) {
    const target = evt.target;

    if (target === this.overlay) {
      this.hide();
    }
  }

  onKeydown(evt) {
    if (evt.keyCode === Esc) {
      this.hide();
    }
  }

  removeKeydownHandler() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  addKeydownHandler() {
    document.addEventListener('keydown', this.onKeydown);
  }

  addHandlers() {
    this.openButton.addEventListener('click', this.openButtonClickHandler);
    this.closeButton.addEventListener('click', this.closeButtonClickHandler);

    if (this.overlay) {
      this.overlay.addEventListener('click', this.overlayClickHandler);
    }
  }
}

export default Modal.init;
