let emailSendFeedback = function (lang, name, theme, message) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "artiomponomariovcode@gmail.com",
    Password: "BAC831B10D49BE46182B997BAFD1DBB29B81",
    To: 'secretkto2@gmail.com',
    From: "artiomponomariovcode@gmail.com",
    Subject: "Lalala",
    Body: `
      <div>
        <div><span>Имя:&nbsp;</span><span>${name}&nbsp;|</span></div>
        <div><span>Тема:&nbsp;</span><span>${theme}&nbsp;|</span></div>
        <div><span>Сообщение:&nbsp;</span><span>${message}&nbsp;|</span></div>
        <div>===========================</div>
        <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
        <div><span>Заявка со страницы:&nbsp;</span><span>"${lang}/support&nbsp;|</span></div>
      </div>
    `
  }).then(
    message => alert(message)
  )
};

let emailSendOffer = function (lang, name, theme, message) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "artiomponomariovcode@gmail.com",
    Password: "BAC831B10D49BE46182B997BAFD1DBB29B81",
    To: 'artyponomarty@gmail.com',
    From: "artiomponomariovcode@gmail.com",
    Subject: "",
    Body: `
      <div>
        <div><span>Имя:&nbsp;</span><span>${name}&nbsp;|</span></div>
        <div><span>Тема:&nbsp;</span><span>${theme}&nbsp;|</span></div>
        <div><span>Сообщение:&nbsp;</span><span>${message}&nbsp;|</span></div>
        <div>===========================</div>
        <div><span>Язык сайта:&nbsp;</span><span>${lang}&nbsp;|</span></div>
        <div><span>Заявка со страницы:&nbsp;</span><span>${lang}/ru&nbsp;|</span></div>
      </div>
    `
  }).then(
    message => alert(message)
  )
};