import tabs from '../../components/tabs';

let tabProps;
let tabsInstance = null;

const init = (props) => {
  tabProps = props;
};

const launch = () => {
  tabsInstance = tabs(tabProps);
};

const destroy = () => {
  if (!tabsInstance) return;

  tabsInstance.destroy();

  tabsInstance = null;
};

export default {
  init,
  launch,
  destroy,
};
