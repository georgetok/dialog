const { scrollIntoView } = window;

// ! dev
// const setScrollingElement = (parent) => {
//   if (getComputedStyle(parent).overflow === 'hidden') {
//     return false;
//   }
//   return true;
// };
// ! dev
class Tabs {
  constructor(props) {
    const {
      containerElem,
      controlsBoxElem,
      panelSelector,
      controlsSelector,
      controlsActiveClassName,
      panelActiveClassName,
      indexAttrName,
      activeIndex = 0,
    } = props;
    this.controlsBox = controlsBoxElem;
    this.panels = containerElem.querySelectorAll(panelSelector);
    this.controlsActiveClassName = controlsActiveClassName;
    this.controlsSelector = controlsSelector;
    this.controls = controlsBoxElem.querySelectorAll(controlsSelector);
    this.panelActiveClassName = panelActiveClassName;
    this.indexAttrName = indexAttrName;
    this.activeIndex = activeIndex;

    this.onControlBoxClick = this.onControlBoxClick.bind(this);
    this.changeActiveState = this.changeActiveState.bind(this);
    this.setControlsState = this.setControlsState.bind(this);
    this.setPanelState = this.setPanelState.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  static init(props) {
    const tabs = new Tabs(props);
    tabs.setStartState();
    tabs.addListeners();

    return tabs;
  }

  setStartState() {
    const activeControl = this.controls[this.activeIndex];
    const activePanel = this.panels[this.activeIndex];

    activeControl.classList.add(this.controlsActiveClassName);
    activePanel.classList.add(this.panelActiveClassName);
  }

  setControlsState(presentIndex) {
    const prevActiveControl = this.controls[this.activeIndex];
    const nowActiveControl = this.controls[presentIndex];

    prevActiveControl.classList.remove(this.controlsActiveClassName);
    nowActiveControl.classList.add(this.controlsActiveClassName);
    scrollIntoView(nowActiveControl, {
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
      boundary: this.controlsBox,
    });
  }

  setPanelState(presentIndex) {
    const prevActivePanel = this.panels[this.activeIndex];
    const nowActivePanel = this.panels[presentIndex];

    prevActivePanel.classList.remove(this.panelActiveClassName);
    nowActivePanel.classList.add(this.panelActiveClassName);
  }

  changeActiveState(controlIndex) {
    this.setControlsState(controlIndex);
    this.setPanelState(controlIndex);

    this.activeIndex = controlIndex;
  }

  onControlBoxClick(evt) {
    const clickedControl = evt.target.closest(this.controlsSelector);

    if (!clickedControl) return;

    const controlIndex = parseInt(
      clickedControl.dataset[this.indexAttrName],
      10
    );

    if (!Number.isNaN(controlIndex) && controlIndex !== this.activeIndex) {
      this.changeActiveState(controlIndex, clickedControl);
    }
  }

  addListeners() {
    if (this.controlsBox) {
      this.controlsBox.addEventListener('click', this.onControlBoxClick);
    }
  }

  removeListeners() {
    this.controlsBox.removeEventListener('click', this.onControlBoxClick);
  }

  destroy() {
    const activeControl = this.controls[this.activeIndex];
    const activePanel = this.panels[this.activeIndex];

    activeControl.classList.remove(this.controlsActiveClassName);
    activePanel.classList.remove(this.panelActiveClassName);

    this.removeListeners();
  }
}

export default Tabs.init;
