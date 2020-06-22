const { IMask: iMask } = window;
const getValidityState = (pattern, value) => {
  const patternRegExp = new RegExp(pattern);
  return patternRegExp.test(value);
};

class Form {
  constructor(form, onSubmit) {
    this.form = form;
    this.fields = this.getFields();
    this.isStorageSupport = true;
    this.storage = '';
    this.onSubmit = onSubmit;

    this.getFields = this.getFields.bind(this);
    this.initFields = this.initFields.bind(this);
    this.addHandlers = this.addHandlers.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.formInputHandler = this.formInputHandler.bind(this);
    this.setStorage = this.setStorage.bind(this);
    this.checkFieldsValidity = this.checkFieldsValidity.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.setValueFromStorage = this.setValueFromStorage.bind(this);
  }

  static init(formElem, onSubmit) {
    const form = new Form(formElem, onSubmit);

    form.getLocalStorage();
    form.addHandlers();
    form.initFields();

    return form;
  }

  getFields() {
    const SELECTOR =
      'input[type="text"], input[type="number"],input[type="tel"], input[type="email"],input[type="search"], input[type="url"], input[type="password"], select, textarea';
    const fieldsElements = this.form.querySelectorAll(SELECTOR);
    const fields = [].map.call(fieldsElements, (fieldElement) => {
      return {
        elem: fieldElement,
        mask: fieldElement.dataset.mask
          ? iMask(fieldElement, {
              mask: fieldElement.dataset.mask,
              lazy: true,
            })
          : false,
        pattern: fieldElement.getAttribute('pattern')
          ? fieldElement.getAttribute('pattern')
          : false,
        desc: fieldElement.getAttribute('title')
          ? fieldElement.getAttribute('title')
          : false,
        onFocus: fieldElement.dataset.focus === 'true',
        isValid: fieldElement.hasAttribute('required') ? false : true,
      };
    });

    return fields;
  }

  initFields() {
    this.fields.forEach((field) => {
      if (field.onFocus) {
        field.elem.focus();
      }

      if (field.mask && field.pattern) {
        field.elem.removeAttribute('pattern');
      }

      // if (this.isStorageSupport) {
      //   this.setValueFromStorage(field);
      // }
    });
  }

  setStorage(target) {
    this.storage.setItem(target.id, target.value);
  }

  setValueFromStorage(field) {
    const storageValue = this.storage[field.elem.id];

    if (!storageValue) return;

    field.elem.value = storageValue;

    if (field.pattern) {
      this.validate(field);
    }
  }

  validate(field) {
    const value = field.mask ? field.mask.unmaskedValue : field.elem.value;

    if (value.length < 2) {
      return;
    }

    const isValid = getValidityState(field.pattern, value);

    if (isValid) {
      field.isValid = true;

      field.elem.classList.remove('error');
      field.elem.setCustomValidity('');
    } else {
      field.isValid = false;

      // field.elem.classList.add('error');
      field.elem.setCustomValidity(field.desc);
    }
  }

  formInputHandler(evt) {
    const target = evt.target;

    if (this.isStorageSupport) {
      this.setStorage(target);
    }

    this.fields.forEach((field) => {
      if (field.pattern && field.elem === target) {
        this.validate(field);
      } else if (field.elem === target) {
        field.isValid = true;
      }
    });
  }

  checkFieldsValidity() {
    this.fields.forEach((field) => {
      if (!field.isValid && field.pattern) {
        this.validate(field);
      }
    });
  }

  formSubmitHandler(evt) {
    evt.preventDefault();

    const isFormValid = this.fields.every(function (field) {
      return field.isValid;
    });

    if (isFormValid) {
      if (this.submitCallBack) {
        this.submitCallBack();
      }
    } else {
      this.checkFieldsValidity();
    }
  }

  addHandlers() {
    // this.form.addEventListener('input', this.formInputHandler);
    this.form.addEventListener('submit', this.formSubmitHandler);
  }

  getLocalStorage() {
    try {
      this.storage = localStorage;
    } catch (err) {
      this.isStorageSupport = false;
    }
  }
}

export default Form.init;
