function debounce(cb, timeout) {
  return function (args) {
    const previousCall = this.lastCall;
    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= timeout) {
      clearTimeout(this.lastCallTimer);
    }

    this.lastCallTimer = setTimeout(() => cb(args), timeout);
  };
}

export default debounce;
