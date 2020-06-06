import dropdown from '../../components/dropdown';

const DROPDOWN_RIGHT_POSITION_CLASS_NAME = 'main-nav__dropdown--right';
const DROPDOWN_LONG_CLASS_NAME = 'main-nav__dropdown--long';
const DROPDOWN_INCLUDED_BOX_BORDERED_CLASS_NAME =
  'main-nav__included-box--bordered';
const includedBoxCssCustomPropsName = '--box-height';

let elements = {
  menu: '',
  topLevelBlocks: '',
  middleLevelBlocks: '',
};

let state = {
  topLevelDropdown: [],
  middleLevelDropdown: [],
};

const destroyDropdown = (dropdown) => {
  dropdown.removeHandlers();
  dropdown = null;
};

const onTopDropdownShow = (dropdown) => {
  const { menu } = elements;
  const LARGE_PANEL_WIDTH = 480;
  const menuRightPosition = menu.getBoundingClientRect().right;
  const buttonSizes = dropdown.button.getBoundingClientRect();
  const largePanelPosition = buttonSizes.left + LARGE_PANEL_WIDTH;

  if (largePanelPosition >= menuRightPosition) {
    dropdown.panel.classList.add(DROPDOWN_RIGHT_POSITION_CLASS_NAME);
  }
};

const onTopDropdownHide = (dropdown) => {
  const dropdownBox = dropdown.panel.querySelector('.main-nav__included-box');

  dropdown.panel.classList.remove(DROPDOWN_RIGHT_POSITION_CLASS_NAME);
  dropdown.panel.classList.remove(DROPDOWN_LONG_CLASS_NAME);
  dropdownBox.classList.remove(DROPDOWN_INCLUDED_BOX_BORDERED_CLASS_NAME);
  dropdownBox.style.setProperty(includedBoxCssCustomPropsName, 'auto');
};

const setTopLevelDropdown = () => {
  const { topLevelBlocks } = elements;

  topLevelBlocks.forEach((block) => {
    const button = block.querySelector('.main-nav__button');
    const panel = block.querySelector('.main-nav__dropdown');
    const options = {
      block,
      button: button,
      buttonExpandClassName: 'main-nav__button--expanded',
      panel: panel,
      panelExpandClassName: 'main-nav__dropdown--expanded',
      onShow: onTopDropdownShow,
      onHide: onTopDropdownHide,
    };

    const dropdownInstance = dropdown(options);

    state.topLevelDropdown.push(dropdownInstance);
  });
};

const onMiddleDropdownShow = (dropdown) => {
  const panel = dropdown.panel;
  const panelHeigh = panel.offsetHeight;
  const parentDropdown = panel.closest('.main-nav__dropdown');
  const dropdownBox = parentDropdown.querySelector('.main-nav__included-box');
  const dropdownBoxHeight = dropdownBox.offsetHeight;
  const isShortMenu = !parentDropdown.classList.contains(
    DROPDOWN_LONG_CLASS_NAME
  );

  if (isShortMenu) {
    parentDropdown.classList.add(DROPDOWN_LONG_CLASS_NAME);
    dropdownBox.classList.add(DROPDOWN_INCLUDED_BOX_BORDERED_CLASS_NAME);
  }

  if (dropdownBoxHeight < panelHeigh) {
    dropdownBox.style.setProperty(
      includedBoxCssCustomPropsName,
      `${panelHeigh}px`
    );
  }
};

const onMiddleDropdownHide = (dropdown) => {
  const parentDropdown = dropdown.panel.closest('.main-nav__dropdown');
  const dropdownBox = parentDropdown.querySelector('.main-nav__included-box');

  parentDropdown.classList.remove(DROPDOWN_LONG_CLASS_NAME);
  dropdownBox.classList.remove(DROPDOWN_INCLUDED_BOX_BORDERED_CLASS_NAME);
};

const setMiddleLevelDropdown = () => {
  const { middleLevelBlocks } = elements;

  middleLevelBlocks.forEach((block) => {
    const button = block.querySelector('.main-nav__included-button');
    const panel = block.querySelector('.main-nav__middle-dropdown');

    const options = {
      block,
      button: button,
      buttonExpandClassName: 'main-nav__included-button--expanded',
      panel: panel,
      panelExpandClassName: 'main-nav__middle-dropdown--expanded',
      onShow: onMiddleDropdownShow,
      onHide: onMiddleDropdownHide,
      isDebounced: true,
    };

    const dropdownInstance = dropdown(options);

    state.middleLevelDropdown.push(dropdownInstance);
  });
};

const destroy = () => {
  let { topLevelDropdown, middleLevelDropdown } = state;

  if (topLevelDropdown.length === 0 || middleLevelDropdown.length == 0) {
    return;
  }

  topLevelDropdown.forEach((dropdown) => destroyDropdown(dropdown));
  middleLevelDropdown.forEach((dropdown) => destroyDropdown(dropdown));

  topLevelDropdown = [];
  middleLevelDropdown = [];
  state = null;
};

const launch = () => {
  state = {
    topLevelDropdown: [],
    middleLevelDropdown: [],
  };

  setTopLevelDropdown();
  setMiddleLevelDropdown();
};

const init = (elementsOptions) => {
  elements = elementsOptions;
};

export default {
  init,
  launch,
  destroy,
};
