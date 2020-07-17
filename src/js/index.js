import main from './pages/main';
import blog from './pages/blog';
import download from './pages/download';
import header from './modules/header/';
import setPageHeight from './modules/setPageHeight';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      //unregister service worker for old domain
      registration.unregister()
    }
  }).catch(function (err) {
    // fail state, which is fine as we just don't want a service worker.
    console.log('Fail: ', err);
  });
}

const global = () => {
  setPageHeight();
  header();

};
const router = {
  pages: {
    main: main,
    download: download,
    blog: blog,
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
