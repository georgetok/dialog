import popup from '../../components/modal';
let menuPopupInstance;

const init = (options) => {
  menuPopupInstance = popup(options);
};

const hide = () => {
  menuPopupInstance.hide();
};

const clear = () => {
  menuPopupInstance.setStartState();
};

const hasShowState = () => {
  return menuPopupInstance.isShow;
};

export default {
  init,
  hide,
  clear,
  hasShowState,
};
