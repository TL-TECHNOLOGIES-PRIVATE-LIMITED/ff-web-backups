import PropTypes from 'prop-types';
import { MOBILE_NAV, DESKTOP_NAV, NAV_DRAWER, SIDEBAR } from '../../constants/searchFormLocations';

export default {
  searchBgStyle: PropTypes.func,
  searchPosition: PropTypes.string,
  color: PropTypes.string,
  isShopPage: PropTypes.bool,
  shopPageId: PropTypes.string,
  shopRoute: PropTypes.string,
  iconSection: PropTypes.string,
  inNavigationDrawer: PropTypes.bool,
  staticContent: PropTypes.object,
  renderMode: PropTypes.string.isRequired,
  domainName: PropTypes.string,
  pageRoute: PropTypes.string,
  section: PropTypes.string,
  keepOpen: PropTypes.bool,
  searchFormLocation: PropTypes.oneOf([MOBILE_NAV, DESKTOP_NAV, NAV_DRAWER, SIDEBAR]),
  sidebarWidth: PropTypes.number,
  searchCategoryOverrides: PropTypes.object,
  iconStyles: PropTypes.object,
  formContainerId: PropTypes.string,
  navBarId: PropTypes.string,
  membershipOn: PropTypes.bool,
  onHomepage: PropTypes.bool, // isHomepage is filtered out as a context prop
  hasNavBackground: PropTypes.bool
};
