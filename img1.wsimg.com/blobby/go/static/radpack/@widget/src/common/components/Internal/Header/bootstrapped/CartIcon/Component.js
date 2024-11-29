import React from 'react';
import { UX2, constants } from '@wsb/guac-widget-core';
import { cartSetup } from '@pnc/gopay-cart-setup-util';
import dataAids from '../../constants/dataAids';
import { CART_PARAMS } from '../../constants/navigation';
import { ICON_SIZE } from '../../../../../constants';
import FlyoutMenu from '../FlyoutMenu/Component';
import { getGoPayCartFF, getCountStyles, handleCartRedirect } from './utils';
import { CartIconPropTypes } from './ComponentPropTypes';

class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      olsQuantity: 0,
      olaQuantity: 0,
      olsProvisioned: false,
      olaGopayCartOn: false
    };

    this.dropdownToggleId = `cart-dropdown-${+new Date()}`;
  }

  componentDidMount() {
    if (this.enabledForOls) {
      this._olsCorePromise = import('@wsb/guac-widget-shared/lib/common/ols-core/core-bundle').then(
        ({
          NumberFormatter,
          RouteHandler,
          ShopViewConstants,
          CartStore,
          CartActions,
          OlsConfigStore,
          OlsConfigActions,
          ScrollWidgetActions
        }) => {
          if (this._unmounted) {
            return;
          }
          this._olsCoreUtils = {
            NumberFormatter,
            RouteHandler,
            ShopViewConstants,
            CartStore,
            CartActions,
            OlsConfigStore,
            OlsConfigActions,
            ScrollWidgetActions
          };
          this.updateOlsStoreState();
          window.addEventListener('forceOlsCartIconReload', this.forceReloadOlsCart);
          CartStore.addListener('change', this.onStoreChange);
          OlsConfigStore.addListener('change', this.onStoreChange);
          OlsConfigActions.setConfig(this.props);
          OlsConfigActions.loadConfig();

          if (OlsConfigStore.isProvisioned()) {
            CartActions.loadCart();
          }
        }
      );
    }

    if (this.hasOlaWidget) {
      this.setupOlaCart();
    }
  }

  componentWillUnmount() {
    this._unmounted = true;
    if (this.enabledForOls) {
      this._olsCoreUtils?.CartStore.removeListener('change', this.onStoreChange);
      this._olsCoreUtils?.OlsConfigStore.removeListener('change', this.onStoreChange);
      window.removeEventListener('forceOlsCartIconReload', this.forceReloadOlsCart);
    }

    if (this.enabledForOla && this.gopayCart && this.gopayCartUnsubscribe) {
      this.gopayCartUnsubscribe();
    }
  }

  setupOlaCart = async () => {
    const { websiteId, rootDomain, env, renderMode } = this.props;

    if (this.gopayCart) return;

    try {
      // Read cart FF and exit if it's off
      const shouldUseCache = !!window.sessionStorage;
      const isGopayCartOn = await getGoPayCartFF({ shouldUseCache, websiteId, rootDomain });
      if (!isGopayCartOn) {
        return;
      }

      // Activate cart icon for OLA
      this.setState({ olaGopayCartOn: true });

      if (renderMode !== constants.renderModes.PUBLISH) {
        // Don't load cart into editor
        return;
      }

      // Load gopay cart and subscribe to updates
      this.gopayCart = await cartSetup({ websiteId, env });
      this.updateOlaStoreState();
      this.gopayCartUnsubscribe = this.gopayCart.subscribe(this.updateOlaStoreState);
      handleCartRedirect({ cart: this.gopayCart, renderMode });
    } catch (ex) {
      this.gopayCart = null;
      this.setState({ olaGopayCartOn: false });
    }
  };

  updateOlaStoreState = () => {
    if (!this.gopayCart) {
      return;
    }

    const { quantitiesByType } = this.gopayCart.getState();
    const olaQuantity = quantitiesByType.service || 0;
    this.setState({ olaQuantity });
  };

  updateOlsStoreState = () => {
    const { cart } = this._olsCoreUtils.CartStore.getState();
    const newTotalQuantity = cart ? cart.total_quantity : 0;
    const { olsQuantity } = this.state;
    const olsProvisioned = this._olsCoreUtils.OlsConfigStore.isProvisioned();
    if (olsProvisioned !== this.state.olsProvisioned) {
      this.setState({ olsProvisioned });
    }
    if (newTotalQuantity !== olsQuantity) {
      this.setState(
        {
          olsQuantity: newTotalQuantity
        },
        () => window.dispatchEvent(new Event('CartQuantityChange'))
      );
    }
  };

  onStoreChange = () => {
    const newProvisionedState = this._olsCoreUtils.OlsConfigStore.isProvisioned();

    if (!this.state.olsProvisioned && newProvisionedState) {
      setTimeout(() => {
        this._olsCoreUtils.CartActions.loadCart();
      }, 0);
    }

    this.updateOlsStoreState();
  };

  forceReloadOlsCart = () => {
    setTimeout(() => {
      this._olsCoreUtils.CartActions.loadCart();
    }, 0);
  };

  get hasOlaWidget() {
    return !!this.props.appointmentsPageId;
  }

  get enabledForOls() {
    return !!this.props.shopPageId;
  }

  get enabledForOla() {
    return this.hasOlaWidget && this.state.olaGopayCartOn;
  }

  get shouldRender() {
    return this.enabledForOls || this.enabledForOla;
  }

  get totalCartQuantity() {
    const { olsQuantity, olaQuantity } = this.state;

    return olsQuantity + olaQuantity;
  }

  get isPublishMode() {
    return this.props.renderMode === constants.renderModes.PUBLISH;
  }

  get shouldRenderDropdown() {
    return this.enabledForOls && this.enabledForOla && this.isPublishMode;
  }

  renderItemCount = () => {
    const countStyles = getCountStyles(this.props.category);

    if (this.totalCartQuantity === 0 || !this._olsCoreUtils) {
      return null;
    }

    return (
      <UX2.Element.Block
        style={{ ...countStyles.wrapper, marginLeft: '!-6px' }}
        data-aid={ dataAids.CART_ICON_COUNT }
      >
        <UX2.Element.Details.Minor style={{ ...countStyles.count, color: 'inherit' }} featured>
          { this._olsCoreUtils.NumberFormatter.toFormattedNumber(this.totalCartQuantity) }
        </UX2.Element.Details.Minor>
      </UX2.Element.Block>
    );
  };

  handleOlsClick = () => {
    this._olsCoreUtils.RouteHandler.navigate(this._olsCoreUtils.ShopViewConstants.CART);
    this._olsCoreUtils.ScrollWidgetActions.scrollShopWidget();
  };

  getOlsLinkProps = () => {
    // We don't want to trigger cart to show in editor
    if (!this.isPublishMode) {
      return {};
    }
    const { isShopPage, shopPageId, shopRoute, domainName, renderMode, pageRoute } = this.props;
    return isShopPage
      ? {
        onClick: this.handleOlsClick,
        href: '#',
        convertToAbsolute: false
      }
      : {
        'href': `${shopRoute}?${CART_PARAMS}`,
        'data-page': shopPageId,
        'data-page-query': CART_PARAMS,
        renderMode,
        domainName,
        pageRoute
      };
  };

  getOlaLinkProps = () => {
    // We don't want to trigger cart to show in editor
    if (!this.isPublishMode) {
      return {};
    }

    return {
      // Note: `this.gopayCart` is not available until cart is loaded
      onClick: () => this.gopayCart.toggle(),
      href: '#'
    };
  };

  getIconLinkProps = () => {
    if (!this.isPublishMode) {
      // Case 0: We don't want to trigger cart to show in editor
      return {};
    }
    if (this.enabledForOls && !this.enabledForOla) {
      // Case 1: only OLS cart enabled
      return this.getOlsLinkProps();
    } else if (this.enabledForOla && !this.enabledForOls) {
      // Case 2: only OLA cart enabled
      return this.getOlaLinkProps();
    }
    return {};
  };

  renderDropdown = () => {
    const { staticContent = {}, sidebarWidth } = this.props;
    const { olaQuantity, olsQuantity } = this.state;

    const styles = {
      dropdown: {
        'position': 'absolute',
        'right': '0',
        'top': 'large',
        'whiteSpace': 'nowrap',
        'maxHeight': '45vh',
        'overflowY': 'auto',
        'display': 'none',
        'zIndex': '20',
        'listStyle': 'none',
        '@md': sidebarWidth
          ? {
            right: 'auto',
            top: 'auto',
            left: '0',
            bottom: 'large'
          }
          : {}
      },
      listItem: {
        display: 'block',
        textAlign: 'left',
        marginBottom: '0'
      },
      link: {
        display: 'flex',
        alignItems: 'center'
      },
      separator: {
        marginTop: 'small',
        marginBottom: 'small'
      },
      countLabel: {
        marginLeft: 'xsmall'
      }
    };

    const countStyles = getCountStyles(this.props.category);

    return (
      <UX2.Element.Dropdown
        section='default'
        tag='ul'
        role='menu'
        id={ this.dropdownToggleId }
        style={ styles.dropdown }
        data-aid={ dataAids.CART_DROPDOWN_RENDERED }
      >
        <UX2.Element.ListItem
          tag='li'
          role='menuitem'
          key='cart-dropdown-ols-item'
          style={ styles.listItem }
        >
          <UX2.Element.Link { ...this.getOlsLinkProps() } style={ styles.link }>
            <UX2.Element.Block style={ countStyles.wrapper }>
              <UX2.Element.Details.Minor style={ countStyles.count } featured>
                { olsQuantity }
              </UX2.Element.Details.Minor>
            </UX2.Element.Block>
            <UX2.Element.Details style={ styles.countLabel }>
              { staticContent.cartProducts }
            </UX2.Element.Details>
          </UX2.Element.Link>
        </UX2.Element.ListItem>
        <UX2.Element.ListItem style={ styles.listItem }>
          <UX2.Element.HR style={ styles.separator } />
        </UX2.Element.ListItem>
        <UX2.Element.ListItem
          tag='li'
          role='menuitem'
          key='cart-dropdown-ola-item'
          style={ styles.listItem }
        >
          <UX2.Element.Link { ...this.getOlaLinkProps() } style={ styles.link }>
            <UX2.Element.Block style={ countStyles.wrapper }>
              <UX2.Element.Details.Minor style={ countStyles.count } featured>
                { olaQuantity }
              </UX2.Element.Details.Minor>
            </UX2.Element.Block>
            <UX2.Element.Details style={ styles.countLabel }>
              { staticContent.cartServices }
            </UX2.Element.Details>
          </UX2.Element.Link>
        </UX2.Element.ListItem>
      </UX2.Element.Dropdown>
    );
  };

  renderIcon() {
    const { cartStyles } = this.props;

    return (
      <UX2.Element.Icon
        icon='cart1'
        style={ cartStyles }
        data-aid={ dataAids.CART_ICON_RENDER }
        size={ ICON_SIZE }
        minTarget={ true }
      />
    );
  }

  cartRouter = () => {
    const { staticContent = {} } = this.props;
    const styles = {
      menu: {
        position: 'relative'
      },
      link: {
        display: 'flex',
        alignItems: 'center',
        cursor: this.isPublishMode ? 'pointer' : 'not-allowed'
      }
    };
    if (this.shouldRenderDropdown) {
      return (
        <UX2.Element.Block style={ styles.menu }>
          <FlyoutMenu
            renderCustomContent={
              <UX2.Element.Block style={ styles.link }>
                { this.renderIcon() }
                { this.renderItemCount() }
              </UX2.Element.Block>
            }
            toggleId={ this.dropdownToggleId }
            dataAid={ dataAids.CART_ICON_RENDER }
            renderMode={ this.props.renderMode }
          />
          { this.renderDropdown() }
        </UX2.Element.Block>
      );
    }

    return (
      <UX2.Element.Link
        style={ styles.link }
        aria-label={ staticContent.cartIcon || 'Shopping Cart Icon' }
        convertToAbsolute
        { ...this.getIconLinkProps() }
      >
        { this.renderIcon() }
        { this.renderItemCount() }
      </UX2.Element.Link>
    );
  };

  render() {
    if (!this.shouldRender) return null;

    const cartStyles = {
      display: 'flex',
      alignItems: 'center',
      fontSize: 'xsmall'
    };

    return <UX2.Element.Block style={ cartStyles } children={ this.cartRouter() } />;
  }
}

CartIcon.propTypes = CartIconPropTypes;

export default CartIcon;
