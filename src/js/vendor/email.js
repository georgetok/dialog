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

let domain = "https://artponomariov.github.io";

let emailSendOffer = function (lang, isModal, pageName) {
  let form = document.getElementById(`form-offer${isModal ? '-modal' : ''}`);
  form.classList.add('submit-started');

  let resetOnSend = function () {
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
  };

  let name = form.querySelector('[name="name"]');
  let email = form.querySelector('[name="email"]');
  let phone = form.querySelector('[name="phone"]');
  let company = form.querySelector('[name="company"]');
  let quantity = form.querySelector('[name="quantity-users"]');
  let terms = form.querySelector('[name="terms"]');
  let subscribe = form.querySelector('[name="subscribe"]');
  let button = form.querySelector('button');

  let body = `
      <div>
        <div><span>Имя:&nbsp;</span><span>${name.value === "" ? undefined : name.value}&nbsp;|</span></div>
        <div><span>Email:&nbsp;</span><span>${email.value === "" ? undefined : email.value}&nbsp;|</span></div>
        <div><span>Телефон:&nbsp;</span><span>${phone.value === "" ? undefined : phone.value}&nbsp;|</span></div>
        <div><span>Компания:&nbsp;</span><span>${company.value === "" ? undefined : company.value}&nbsp;|</span></div>
        <div><span>Количество сотрудников:&nbsp;</span><span>${quantity.value === "" ? undefined : quantity.value}&nbsp;|</span></div>
        <div>===========================</div>
        <div><span>Форма:&nbsp;</span><span>offer&nbsp;|</span></div>
        <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
        <div><span>Флаг:&nbsp;</span><span>${isModal ? 'popup' : 'page'}&nbsp;|</span></div>
        <div><span>Заявка со страницы:&nbsp;</span><span>${domain}/${lang}/${pageName}&nbsp;|</span></div>
        <div><span>Согласие на обработку:&nbsp;</span><span>${terms.checked === "" ? undefined : terms.checked}&nbsp;|</span></div>
        <div><span>Подписка на новости:&nbsp;</span><span>${subscribe.checked === "" ? undefined : subscribe.checked}&nbsp;|</span></div>
        <div>===========================</div>
      </div>
    `;

  Email.send({
    SecureToken: "b940ea1d-6d82-42f5-b85a-67de942b89ac",
    To: ["ivjubt8x@robot.zapier.com", "info@dlg.im"],
    From: "site-srv@dlg.im",
    Subject: 'Заявка с сайта dlg.im',
    Body: body
  }).then(
    message => {
      resetOnSend();
    }
  ).catch(error => {
    alert(error);
  });
};

let emailSendFeedback = function (lang, isModal) {
  let form = document.getElementById('form-feedback');
  form.classList.add('submit-started');

  let email = form.querySelector('[name="email"]');
  let theme = form.querySelector('[name="theme"]');
  let message = form.querySelector('[name="message"]');
  let terms = form.querySelector('[name="terms"]');
  let button = form.querySelector('button');

  Email.send({
    SecureToken: "b940ea1d-6d82-42f5-b85a-67de942b89ac",
    To: "support@dlg.im",
    From: "site-srv@dlg.im",
    Subject: 'Заявка со страницы “Помощь"',
    Body: `
      <div>
        <div><span>Email:&nbsp;</span><span>${email.value === "" ? undefined : email.value}&nbsp;|</span></div>
        <div><span>Тема:&nbsp;</span><span>${theme.value === "" ? undefined : theme.value}&nbsp;|</span></div>
        <div><span>Сообщение:&nbsp;</span><span>${message.value === "" ? undefined : message.value}&nbsp;|</span></div>
        <div>===========================</div>
        <div><span>Форма:&nbsp;</span><span>feedback&nbsp;|</span></div>
        <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
        <div><span>Флаг:&nbsp;</span><span>${isModal ? 'modal' : 'not modal'}&nbsp;|</span></div>
        <div><span>Заявка со страницы:&nbsp;</span><span>${domain}/${lang}/support&nbsp;|</span></div>
        <div><span>Согласие на обработку:&nbsp;</span><span>${terms.checked === "" ? undefined : terms.checked}&nbsp;|</span></div>
        <div>===========================</div>
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

let fileResend = function () {
  let form = document.getElementById(`form-career`);
  let fileInput = form.querySelector('[name="file"]');
  let label = form.querySelector('[for="file"]');
  fileInput.parentNode.classList.add('is-file');
  label.addEventListener('click', function () {
    fileInput.value = '';
    fileInput.parentNode.classList.remove('is-file');
  }, false);
};

let emailSendCV = function (lang) {
  let form = document.getElementById(`form-career`);
  form.classList.add('submit-started');

  let name = form.querySelector('[name="name"]');
  let email = form.querySelector('[name="email"]');
  let phone = form.querySelector('[name="phone"]');
  let city = form.querySelector('[name="city"]');
  let message = form.querySelector('[name="message"]');
  let terms = form.querySelector('[name="terms"]');
  let fileInput = form.querySelector('[name="file"]');
  let button = form.querySelector('button');

  let file = fileInput.files[0];
  let resetOnSend = function () {
    form.reset();
    form.classList.add('submit-over');
    name.disabled = true;
    email.disabled = true;
    phone.disabled = true;
    message.disabled = true;
    terms.disabled = true;
    button.disabled = true;
    terms.checked = false;
  };
  let body =
    `<div>
    <div><span>Имя:&nbsp;</span><span>${name.value === "" ? undefined : name.value}&nbsp;|</span></div>
    <div><span>Email:&nbsp;</span><span>${email.value === "" ? undefined : email.value}&nbsp;|</span></div>
    <div><span>Телефон:&nbsp;</span><span>${phone.value === "" ? undefined : phone.value}&nbsp;|</span></div>
    <div><span>Город для работы:&nbsp;</span><span>${city.value === "" ? undefined : city.value}&nbsp;|</span></div>
    <div><span>Сообщение:&nbsp;</span><span>${message.value === "" ? undefined : message.value}&nbsp;|</span></div>
    <div>===========================</div>
    <div><span>Форма:&nbsp;</span><span>career&nbsp;|</span></div>
    <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
    <div><span>Заявка со страницы:&nbsp;</span><span>${domain}/${lang}/career&nbsp;|</span></div>
    <div><span>Согласие на обработку:&nbsp;</span><span>${terms.checked === "" ? undefined : terms.checked}&nbsp;|</span></div>
    <div>===========================</div>
  </div>`;

  if (file) {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      let dataUri = "data:" + file.type + ";base64," + btoa(reader.result);
      Email.send({
        SecureToken: "b940ea1d-6d82-42f5-b85a-67de942b89ac",
        To: "hire@dlg.im",
        From: "site-srv@dlg.im",
        Subject: 'Заявка со страницы “Вакансии”',
        Body: body,
        Attachments: [{
          name: file.name,
          data: dataUri
        }]
      }).then(
        message => {
          resetOnSend();
        }
      ).catch(error => {
        alert(error);
      });
    };
  } else {
    Email.send({
      SecureToken: "b940ea1d-6d82-42f5-b85a-67de942b89ac",
      To: "hire@dlg.im",
      From: "site-srv@dlg.im",
      Subject: 'Заявка со страницы “Вакансии”',
      Body: body
    }).then(
      message => {
        resetOnSend();
      }
    ).catch(error => {
      alert(error);
    });
  }


};

let emailSendBlog = function (lang, type) {
  let form = document.getElementById(`form-blog`);
  form.classList.add('submit-started');

  let email = form.querySelector('[name="email"]');
  let button = form.querySelector('button');

  let resetOnSend = function () {
    form.reset();
    form.classList.add('submit-over');
    email.disabled = true;
  };
  let body =
    `<div>
    <div><span>Email:&nbsp;</span><span>${email.value === "" ? undefined : email.value}&nbsp;|</span></div>
    <div>===========================</div>
    <div><span>Форма:&nbsp;</span><span>newsletter&nbsp;|</span></div>
    <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
    <div><span>Заявка со страницы:&nbsp;</span><span>${domain}/${lang}/${type}&nbsp;|</span></div>
    <div>===========================</div>
  </div>`;

  Email.send({
    SecureToken: "b940ea1d-6d82-42f5-b85a-67de942b89ac",
    To: "38jvzegk@robot.zapier.com",
    From: "site-srv@dlg.im",
    Subject: 'Подписка на новостную рассылку',
    Body: body
  }).then(
    message => {
      resetOnSend();
    }
  ).catch(error => {
    alert(error);
  });

};