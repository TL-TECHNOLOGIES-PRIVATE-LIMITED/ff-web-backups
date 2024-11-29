import PropTypes from 'prop-types';

export default {
  toggleId: PropTypes.string.isRequired,
  activeProps: PropTypes.object,
  label: PropTypes.string.isRequired,
  renderCustomIcon: PropTypes.object,
  renderCustomContent: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.node]),
  id: PropTypes.string,
  isActive: PropTypes.bool,
  enableNoOverlapDropdown: PropTypes.bool,
  widgetId: PropTypes.string,
  overrideIconStyle: PropTypes.object,
  dataAid: PropTypes.string,
  hasHover: PropTypes.bool,
  navBarId: PropTypes.string,
  parentId: PropTypes.string,
  customToggleStyles: PropTypes.object,
  renderMode: PropTypes.string
};
