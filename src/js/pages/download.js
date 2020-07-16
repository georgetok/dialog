import Choices from "choices.js";

const download = () => {
  let os = 'Not known';
  console.log(os);
  if (navigator.userAgent.indexOf('Mac') !== -1 && navigator.userAgent.indexOf('iPhone') !== -1) {
    // os = 'iOS OS';
    document.getElementById('ios-hero').classList.add('is-visible');
    document.getElementById('ios-col').classList.remove('is-visible');
  } else if (navigator.userAgent.indexOf('Win') !== -1) {
    os = 'Windows OS';
    document.getElementById('windows-hero').classList.add('is-visible');
    document.getElementById('windows-col').classList.remove('is-visible');
  } else if (navigator.userAgent.indexOf('Android') !== -1) {
    os = 'Android OS';
    document.getElementById('android-hero').classList.add('is-visible');
    document.getElementById('android-col').classList.remove('is-visible');
  } else if (navigator.userAgent.indexOf('Linux') !== -1) {
    os = 'Linux OS';
    document.getElementById('linux-hero').classList.add('is-visible');
    document.getElementById('linux-col').classList.remove('is-visible');
  } else {
    os = 'MacOS OS';
    document.getElementById('macos-hero').classList.add('is-visible');
    document.getElementById('macos-col').classList.remove('is-visible');
  }

  // console.log('MacOS', navigator.userAgent.indexOf('Mac') !== -1);
  // console.log('like Mac', navigator.userAgent.indexOf('like Mac') !== -1);
  // console.log('Android', navigator.userAgent.indexOf('Android') !== -1);
  // console.log('Linux', navigator.userAgent.indexOf('Linux') !== -1);
  // console.log('Windows', navigator.userAgent.indexOf('Windows') !== -1);
  // console.log(JSON.stringify(os));
  // console.log(JSON.stringify(navigator.userAgent));

};

const choiceOptions = {
  searchEnabled: false,
  itemSelectText: '',
  classNames: {
    containerOuter: 'card__select select select--choice select--dark choices',
  }
};
const linuxChoiceSelector = document.getElementById('choice-linux');

const generateLink = function (link) {
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.download = 'event';
  a.href = link;
  a.click();
  a.parentNode.removeChild(a);
};

if (linuxChoiceSelector) {
  const linuxChoice = new Choices(linuxChoiceSelector, choiceOptions);
  linuxChoiceSelector.addEventListener('choice', function (event) {
    if (event.detail.choice.label === 'Linux 64') {
      generateLink('https://dialog-enterprise-x-desktop.s3.eu-west-2.amazonaws.com/dialog_ee_x_2.3.3.150_amd64.deb');
    }
    if (event.detail.choice.label === 'Linux 32') {
      generateLink('https://dialog-enterprise-x-desktop.s3.eu-west-2.amazonaws.com/dialog_ee_x_2.3.3.150_x86_64.rpm');
    }
  });
}


export default download;
