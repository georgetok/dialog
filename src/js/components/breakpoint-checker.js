class BreakpointChecker {
  constructor(breakPointWidth, onCheck, onUnCheck) {
    this.breakpoint = window.matchMedia(`(max-width: ${breakPointWidth}px)`);
    this.onCheck = onCheck;
    this.onUnCheck = onUnCheck;

    this.check = this.check.bind(this);
  }

  static init(breakPointWidth, onCheck, onUnCheck) {
    const breakpointChecker = new BreakpointChecker(
      breakPointWidth,
      onCheck,
      onUnCheck
    );

    breakpointChecker.addListeners();

    return breakpointChecker;
  }

  check() {
    if (this.breakpoint.matches === true) {
      this.onCheck();
    }

    if (this.breakpoint.matches === false) {
      this.onUnCheck();
    }
  }

  removeListeners() {
    this.breakpoint.removeListener(this.check);
  }

  addListeners() {
    this.breakpoint.addListener(this.check);
    this.check();
  }
}

export default BreakpointChecker.init;
