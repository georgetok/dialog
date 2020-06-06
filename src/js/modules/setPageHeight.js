import setElemHeightInCSSProps from '../utils/setElemHeightInCSSProps';

const page = document.documentElement;
const CSSPropsName = '--page-height';

const setPageHeight = () => {
  setElemHeightInCSSProps(page, CSSPropsName);
};

export default setPageHeight;
