import debounce from '../utils/debounce';
class Dropdown {
  constructor(options) {
    const {
      block,
      button,
      buttonExpandClassName,
      panel,
      panelExpandClassName,
      onShow = null,
      onHide = null,
      isDebounced = false,
    } = options;

    this.block = block;
    this.button = button;
    this.buttonExpandClassName = buttonExpandClassName;
    this.panel = panel;
    this.panelExpandClassName = panelExpandClassName;
    this.buttonExpandClassName = buttonExpandClassName;
    this.onShow = onShow;
    this.onHide = onHide;
    this.isDebounced = isDebounced;
    this.isExpand = false;

    this.setStartState = this.setStartState.bind(this);
    this.getHandlers = this.getHandlers.bind(this);
    this.debouncedShow = debounce(this.show.bind(this), 100);
    this.debouncedHide = debounce(this.hide.bind(this), 100);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onBlockMouseLeave = this.onBlockMouseLeave.bind(this);
    this.addHoverHandlers = this.addHoverHandlers.bind(this);
    this.removeHoverHandlers = this.removeHoverHandlers.bind(this);
    this.onBlockMouseEnter = this.onBlockMouseEnter.bind(this);
    this.onBlockMouseLeave = this.onBlockMouseLeave.bind(this);
    this.onBlockFocusIn = this.onBlockFocusIn.bind(this);
    this.onBlockFocusOut = this.onBlockFocusOut.bind(this);
    this.addFocusHandler = this.addFocusHandler.bind(this);
    this.removeFocusHandlers = this.removeFocusHandlers.bind(this);
    this.removeHandlers = this.removeHandlers.bind(this);
  }

  static init(options) {
    if (!options.button || !options.panel) {
      return;
    }

    const dropdown = new Dropdown(options);
    dropdown.getHandlers();
    dropdown.setStartState();

    return dropdown;
  }

  setStartState() {
    this.button.setAttribute('role', 'menuitem');
    this.button.setAttribute('aria-haspopup', 'true');
    this.button.setAttribute('aria-expanded', 'false');
    this.button.classList.remove(this.buttonExpandClassName);
    this.panel.classList.remove(this.panelExpandClassName);
    this.panel.setAttribute('aria-hidden', 'true');
  }

  show() {
    this.button.setAttribute('aria-expanded', 'true');
    this.button.classList.add(this.buttonExpandClassName);
    this.panel.classList.add(this.panelExpandClassName);
    this.panel.setAttribute('aria-hidden', 'false');

    this.isExpand = true;

    if (this.onShow) {
      this.onShow(this);
    }
  }

  hide() {
    this.button.setAttribute('aria-expanded', 'false');
    this.button.classList.remove(this.buttonExpandClassName);
    this.panel.classList.remove(this.panelExpandClassName);
    this.panel.setAttribute('aria-hidden', 'true');

    this.isExpand = false;

    if (this.onHide) {
      this.onHide(this);
    }
  }

  onBlockMouseLeave() {
    if (this.isDebounced) {
      this.debouncedHide();
    } else {
      this.hide();
    }

    this.removeHoverHandlers();
  }

  addHoverHandlers() {
    this.block.addEventListener('mouseleave', this.onBlockMouseLeave);
  }

  removeHoverHandlers() {
    this.block.removeEventListener('mouseleave ', this.onBlockMouseLeave);
  }

  onBlockMouseEnter() {
    if (this.isDebounced) {
      this.debouncedShow();
    } else {
      this.show();
    }
    this.addHoverHandlers();
  }

  onBlockFocusOut() {
    if (this.isDebounced) {
      this.debouncedHide();
    } else {
      this.hide();
    }
    this.removeFocusHandlers();
  }

  addFocusHandler() {
    this.block.addEventListener('focusout', this.onBlockFocusOut);
  }

  removeFocusHandlers() {
    this.block.removeEventListener('focusout', this.onBlockFocusOut);
  }

  onBlockFocusIn() {
    if (this.isDebounced) {
      this.debouncedShow();
    } else {
      this.show();
    }
    this.addFocusHandler();
  }

  getHandlers() {
    this.block.addEventListener('mouseenter', this.onBlockMouseEnter);
    this.block.addEventListener('focusin', this.onBlockFocusIn);
  }

  removeHandlers() {
    this.block.removeEventListener('mouseenter', this.onBlockMouseEnter);
    this.block.removeEventListener('focusin', this.onBlockFocusIn);

    if (this.isExpand) {
      this.removeHoverHandlers();
      this.removeFocusHandlers();
    }
  }
}

export default Dropdown.init;
