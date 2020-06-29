let Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
      let t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  }, ajaxPost: function (e, n, t) {
    let a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
      let e = a.responseText;
      null != t && t(e);
    }, a.send(n);
  }, ajax: function (e, n) {
    let t = Email.createCORSRequest("GET", e);
    t.onload = function () {
      let e = t.responseText;
      null != n && n(e);
    }, t.send();
  }, createCORSRequest: function (e, n) {
    let t = new XMLHttpRequest;
    return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t;
  }
};

let emailSendFeedback = function (lang) {
  let form = document.getElementById('form-feedback');
  form.classList.add('submit-started');

  let email = form.querySelector('[name="email"]');
  let theme = form.querySelector('[name="theme"]');
  let message = form.querySelector('[name="message"]');
  let button = form.querySelector('button');


  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "artiomponomariovcode@gmail.com",
    Password: "BAC831B10D49BE46182B997BAFD1DBB29B81",
    To: 'thecho3en@yandex.ru',
    From: "artiomponomariovcode@gmail.com",
    Subject: 'Заявка со страницы “Помощь"',
    Body: `
      <div>
        <div><span>Email:&nbsp;</span><span>${email.value}&nbsp;|</span></div>
        <div><span>Тема:&nbsp;</span><span>${theme.value}&nbsp;|</span></div>
        <div><span>Сообщение:&nbsp;</span><span>${message.value}&nbsp;|</span></div>
        <div>===========================</div>
        <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
        <div><span>Заявка со страницы:&nbsp;</span><span>"~/${lang}/support&nbsp;|</span></div>
      </div>
    `
  }).then(
    message => {
      form.reset();
      form.classList.add('submit-over');
      email.disabled = true;
      theme.disabled = true;
      message.disabled = true;
      button.disabled = true;
    }
  );
};

let emailSendOffer = function (lang, isModal) {
  let form = document.getElementById(`form-offer${isModal ? '-modal' : ''}`);
  form.classList.add('submit-started');

  let name = form.querySelector('[name="name"]');
  let email = form.querySelector('[name="email"]');
  let phone = form.querySelector('[name="phone"]');
  let company = form.querySelector('[name="company"]');
  let quantity = form.querySelector('[name="quantity-users"]');
  let terms = form.querySelector('[name="terms"]');
  let subscribe = form.querySelector('[name="subscribe"]');
  let button = form.querySelector('button');


  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "artiomponomariovcode@gmail.com",
    Password: "BAC831B10D49BE46182B997BAFD1DBB29B81",
    To: 'thecho3en@yandex.ru',
    From: "artiomponomariovcode@gmail.com",
    Subject: isModal ? 'Заявка из модального окна' : 'Заявка c главной страницы',
    Body: `
      <div>
        <div><span>Имя:&nbsp;</span><span>${name.value}&nbsp;|</span></div>
        <div><span>Тема:&nbsp;</span><span>${email.value}&nbsp;|</span></div>
        <div><span>Номер:&nbsp;</span><span>${phone.value}&nbsp;|</span></div>
        <div><span>Компания:&nbsp;</span><span>${company.value}&nbsp;|</span></div>
        <div><span>Количество сотрудников:&nbsp;</span><span>${quantity.value}&nbsp;|</span></div>
        <div><span>Согласен ли с условиями:&nbsp;</span><span>${terms.checked}&nbsp;|</span></div>
        <div><span>Подписка на новости:&nbsp;</span><span>${subscribe.checked}&nbsp;|</span></div>
        <div>===========================</div>
        <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
        <div><span>Заявка со страницы:&nbsp;</span><span>~/${lang}/&nbsp;|</span></div>
      </div>
    `
  }).then(
    message => {
      form.reset();
      form.classList.add('submit-over');
      name.disabled = true;
      email.disabled = true;
      phone.disabled = true;
      company.disabled = true;
      quantity.disabled = true;
      terms.disabled = true;
      subscribe.checked = false;
      subscribe.disabled = true;
      button.disabled = true;
      terms.checked = false;
    }
  );
};