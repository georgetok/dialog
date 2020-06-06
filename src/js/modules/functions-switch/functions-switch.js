import tabs from './_functions-tabs';
import accordions from './_functions-accordion';
import breakpointChecker from '../../components/breakpoint-checker';
import constants from '../../utils/consts';

const {
  breakpoints: { mobileMax },
} = constants;

const getTabsProps = (functionsBlock) => {
  return {
    containerElem: functionsBlock.querySelector('.tabs'),
    controlsBoxElem: functionsBlock.querySelector('.tabs__controls'),
    panelSelector: '.tabs__wrapper',
    controlsSelector: '.tabs__control',
    controlsActiveClassName: 'tabs__control--active',
    panelActiveClassName: 'tabs__wrapper--active',
    indexAttrName: 'tabIndex',
  };
};

const onNoMobileViewport = () => {
  tabs.launch();
  accordions.destroy();
};

const onMobileViewPort = () => {
  tabs.destroy();
  accordions.launch();
};

const init = () => {
  const functionsBlock = document.querySelector('.functions');

  if (!functionsBlock) return;
  const accordionsBlocks = functionsBlock.querySelectorAll('.tabs__wrapper');
  const tabsProps = getTabsProps(functionsBlock);

  tabs.init(tabsProps);
  accordions.init(accordionsBlocks);
  breakpointChecker(mobileMax, onMobileViewPort, onNoMobileViewport);
};

export default init;
