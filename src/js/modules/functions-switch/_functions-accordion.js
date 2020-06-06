import accordionGroup from '../../components/accordions-group';

let blocks;
let accordions;
let isLaunched = false;

const destroy = () => {
  if (isLaunched) {
    accordions.remove();
  }

  isLaunched = false;
};

const init = (accordionsBlocks) => {
  blocks = accordionsBlocks;
};

const launch = () => {
  const options = {
    accordionBlocks: blocks,
    accordionProps: {
      triggerExpandedClassName: 'tabs__control--expanded',
      detailsHideClassName: 'tabs__content--hide',
    },
    firstExpanded: true,
  };

  accordions = accordionGroup(options);

  isLaunched = true;
};

export default {
  init,
  launch,
  destroy,
};
