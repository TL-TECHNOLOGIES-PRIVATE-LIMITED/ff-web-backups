// core utils used in all ols contexts

import NumberFormatter from './utils/NumberFormatter';
import RouteHandler from './utils/RouteHandler';
import ShopViewConstants from './constants/ShopView';
import CartStore from './stores/CartStore';
import CartActions from './actions/CartActions';
import OlsConfigStore from './stores/OlsConfigStore';
import OlsConfigActions from './actions/OlsConfigActions';
import ScrollWidgetActions from './actions/ScrollWidgetActions';

// utils accessed off the window obj https://github.com/gdcorp-im/guac-widget-core/blob/master/src/utils/ols.js#L69
if (typeof window !== 'undefined') {
  window.OLSCore = {
    ...window.OLSCore || {},
    RouteHandler,
    ScrollWidgetActions,
    ShopViewConstants
  };
}

export {
  NumberFormatter,
  CartStore,
  CartActions,
  RouteHandler,
  ShopViewConstants,
  OlsConfigStore,
  OlsConfigActions,
  ScrollWidgetActions
};
