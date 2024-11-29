import PropTypes from 'prop-types';

export const CartIconPropTypes = {
  category: PropTypes.string,
  sidebarWidth: PropTypes.number,
  isShopPage: PropTypes.bool,
  appointmentsPageId: PropTypes.string,
  shopPageId: PropTypes.string,
  shopRoute: PropTypes.string,
  accountId: PropTypes.string,
  websiteId: PropTypes.string,
  // removing these props will cause a bug
  olsStatus: PropTypes.string,
  olsAccountStatus: PropTypes.string,
  env: PropTypes.string,
  renderMode: PropTypes.string,
  rootDomain: PropTypes.string,
  domainName: PropTypes.string,
  pageRoute: PropTypes.string,
  cartStyles: PropTypes.object,
  isReseller: PropTypes.bool,
  staticContent: PropTypes.object
};
export const CartIconGoPayPropTypes = {
  category: PropTypes.string,
  sidebarWidth: PropTypes.number,
  appointmentsPageId: PropTypes.string,
  websiteId: PropTypes.string,
  // removing these props will cause a bug
  env: PropTypes.string,
  renderMode: PropTypes.string,
  rootDomain: PropTypes.string,
  domainName: PropTypes.string,
  pageRoute: PropTypes.string,
  cartStyles: PropTypes.object,
  isReseller: PropTypes.bool,
  staticContent: PropTypes.object
};
