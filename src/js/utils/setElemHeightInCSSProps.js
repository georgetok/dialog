import debounce from './debounce';

class SetElemHeightInCSSProps {
    constructor(elem, cssCustomPropsName) {
      this.elem = elem;
      this.cssCustomPropsName = cssCustomPropsName;
      this.elemSize = null;

      this.setCSSPropsValue = this.setCSSPropsValue.bind(this);
      this.setSize = this.setSize.bind(this);
      this.debouncedSetSize = debounce(this.setSize, 300).bind(this);
    }

    static init (elem, cssCustomPropsName) {
      if (!elem) return;

      const setElemHeight = new SetElemHeightInCSSProps(elem, cssCustomPropsName);

      setElemHeight.setSize();
      setElemHeight.addHandler();
    }

    setSize () {
      const height = this.elem.offsetHeight;

      if (this.elemSize !== height) {
        this.elemSize = height;

        this.setCSSPropsValue(height);
      }
    }

    setCSSPropsValue(heightSize) {
      document.documentElement.style.setProperty(
        this.cssCustomPropsName,
        `${heightSize}px`
      );
    }

    addHandler () {
      window.addEventListener('resize', this.debouncedSetSize);
    }
}

export default SetElemHeightInCSSProps.init;
