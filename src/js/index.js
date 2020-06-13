import main from './pages/main';
import header from './modules/header/';
import Choices from "choices.js";
import setPageHeight from './modules/setPageHeight';

const global = () => {
  setPageHeight();
  header();
};

const router = {
  pages: {
    main: main
  },
  global: global,
};

const getRoute = () => {
  const documentClassNames = document.documentElement.className;
  const routePattern = /(js-route-)\S+/gm;
  const routeExact = documentClassNames.match(routePattern);

  return routeExact ? routeExact[0].replace('js-route-', '') : null;
};

const route = getRoute();

router.global();

if (route) {
  router.pages[route]();
}

let os = "Not known";

if (
  os === "Not known" ||
  navigator.appVersion.indexOf("Mac") !== -1 ||
  (navigator.appVersion.indexOf("Android") !== -1
    && navigator.appVersion.indexOf("Linux") !== -1)
) {
  document.getElementById('macos-hero').classList.add("is-visible");
  document.getElementById('macos-col').classList.remove("is-visible");
} else if (navigator.appVersion.indexOf("Win") !== -1) {
  os = "Windows OS";
  document.getElementById('windows-hero').classList.add("is-visible");
  document.getElementById('windows-col').classList.remove("is-visible");
} else if (navigator.appVersion.indexOf("Android") !== -1) {
  os = "Android OS";
  document.getElementById('android-hero').classList.add("is-visible");
  document.getElementById('android-col').classList.remove("is-visible");
} else if (navigator.appVersion.indexOf("Linux") !== -1) {
  os = "Linux OS";
  document.getElementById('linux-hero').classList.add("is-visible");
  document.getElementById('linux-col').classList.remove("is-visible");
} else if (navigator.appVersion.indexOf("iOS") !== -1) {
  os = "iOS OS";
  document.getElementById('linux-hero').classList.add("is-visible");
  document.getElementById('linux-col').classList.remove("is-visible");
}

console.log(JSON.stringify(os));
console.log(JSON.stringify(navigator.appVersion));

const choiceOptions = {
  searchEnabled: false,
  itemSelectText: 'Press to download',
  classNames: {
    containerOuter: 'card__select select select--choice select--dark choices',
  }
};

const windowsChoiceSelector = document.getElementById('choice-windows');
const linuxChoiceSelector = document.getElementById('choice-linux');
const windowsChoice = new Choices(windowsChoiceSelector, choiceOptions);
const linuxChoice = new Choices(linuxChoiceSelector, choiceOptions);

windowsChoiceSelector.addEventListener('choice', function (event) {
  console.log(event);
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.download = "file test";
  a.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABWSURBVDhPY0xISPh//0UOA7mAiVyNMH2jBjAwkBQGjD9KGBTEJ6OEO0kG2NvbMwCjnXwDsEU5SS5ANuDhjRCGJbPFSQsDdBfIyMhQZgDIQLK9QLWkDABPsQw5I+5qmAAAAABJRU5ErkJggg==";
  a.click();
  a.parentNode.removeChild(a);
});

linuxChoiceSelector.addEventListener('choice', function (event) {
  console.log(event);
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.download = "event";
  a.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABWSURBVDhPY0xISPh//0UOA7mAiVyNMH2jBjAwkBQGjD9KGBTEJ6OEO0kG2NvbMwCjnXwDsEU5SS5ANuDhjRCGJbPFSQsDdBfIyMhQZgDIQLK9QLWkDABPsQw5I+5qmAAAAABJRU5ErkJggg==";
  a.click();
  a.parentNode.removeChild(a);
});

windowsChoiceSelector.addEventListener('choice', function (event) {
  console.log(event);
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.download = "event";
  a.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABWSURBVDhPY0xISPh//0UOA7mAiVyNMH2jBjAwkBQGjD9KGBTEJ6OEO0kG2NvbMwCjnXwDsEU5SS5ANuDhjRCGJbPFSQsDdBfIyMhQZgDIQLK9QLWkDABPsQw5I+5qmAAAAABJRU5ErkJggg==";
  a.click();
  a.parentNode.removeChild(a);
});

