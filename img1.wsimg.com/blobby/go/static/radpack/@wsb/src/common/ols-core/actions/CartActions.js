/* eslint-disable consistent-return, max-params */

import { dispatchServerAction, dispatchViewAction } from '../dispatcher/AppDispatcher';
import CartConstants from '../constants/CartConstants';
import CartStore from '../stores/CartStore';
import OlsConfigActions from './OlsConfigActions';
import OlsConfigStore from '../stores/OlsConfigStore';
import * as APIUtils from '../utils/CartApi';
import * as CartUtils from '../utils/CartUtils';

// View Actions
function loadCart(destroyExpiredProducts) {
  const { fetching, processing } = CartStore.getState();
  if (fetching || processing) {
    return;
  }

  const order = CartUtils.getParsedOrder();

  if (order !== null) {
    dispatchViewAction({
      type: CartConstants.CART_LOAD
    });

    APIUtils.loadCart(order, destroyExpiredProducts)
      .then(function (data) {
        return cartWasLoaded(data);
      })
      .catch(function (data) {
        return errorCartLoad(data.error);
      });
  } else {
    dispatchServerAction({
      type: CartConstants.NO_CART_WAS_LOADED
    });
  }
}

function createCart() {
  if (CartStore.getState().fetching) {
    return;
  }

  dispatchViewAction({
    type: CartConstants.CART_CREATE
  });

  return postCreateCart();
}

function addToCart(variantId, quantity, options, callback) {
  if (CartStore.getState().processing) {
    return;
  }

  dispatchViewAction({
    type: CartConstants.CART_ITEM_ADD
  });

  let order = CartStore.getOrder();

  if (!order) {
    createCart()
      .then(() => {
        order = CartStore.getOrder();
        return postAddToCart(order, variantId, quantity, options, callback);
      });
  } else {
    postAddToCart(order, variantId, quantity, options, callback);
  }
}

function postAddToCart(order, variantId, quantity, options, callback) {
  return APIUtils.addToCart(order, variantId, quantity, options)
    .then(function () {
      return cartItemWasAdded();
    })
    .then(function () {
      if (callback) {
        return callback();
      }
      return false;
    })
    .catch(function (data) {
      return errorCartItemAdd(data.error, data.response);
    });
}

function doCheckout(lineItemAttributes) {
  if (lineItemAttributes && lineItemAttributes.length > 0) {
    if (CartStore.getState().processing) {
      return;
    }

    dispatchViewAction({
      type: CartConstants.CART_ITEM_MODIFY,
      data: lineItemAttributes
    });

    const order = CartStore.getOrder();

    APIUtils.modifyCartLineItems(order, lineItemAttributes)
      .then(function () {
        const form = window.document.getElementById('DO_CHECKOUT_ID');
        form.submit();
      })
      .catch(function (data) {
        return errorCartItemModify(data.error);
      });
  } else {
    const form = window.document.getElementById('DO_CHECKOUT_ID');
    form.submit();
  }
}

function modifyCart(lineItemAttributes) {
  if (CartStore.getState().processing) {
    return;
  }

  dispatchViewAction({
    type: CartConstants.CART_ITEM_MODIFY,
    data: lineItemAttributes
  });

  const order = CartStore.getOrder();

  APIUtils.modifyCartLineItems(order, lineItemAttributes)
    .then(function () {
      return cartItemWasModified();
    })
    .catch(function (data) {
      return errorCartItemModify(data.error);
    });
}

function removeFromCart(lineItemId) {
  if (CartStore.getState().processing) {
    return;
  }

  dispatchViewAction({
    type: CartConstants.CART_ITEM_REMOVE
  });

  const order = CartStore.getOrder();

  APIUtils.removeCartLineItem(order, lineItemId)
    .then(function () {
      return cartItemWasRemoved();
    })
    .catch(function (data) {
      return errorCartItemRemove(data.error);
    });
}

function postCreateCart() {
  return APIUtils.createCart()
    .then(function (data) {
      return cartWasLoaded(data);
    })
    .catch(function (data) {
      return errorCartLoad(data.error);
    });
}

function applyCoupon(couponCode) {
  dispatchViewAction({
    type: CartConstants.APPLY_COUPON
  });

  const order = CartStore.getOrder();

  return APIUtils.applyCoupon(order, couponCode)
    .then(function (data) {
      couponWasApplied(data);
      return {
        ...data,
        valid: true
      };
    })
    .catch(function (data) {
      couponWasInvalid(data);
      return {
        ...data,
        valid: false
      };
    });
}

function forbiddenHandler() { // 403
  CartUtils.clearCookie();
  const { renderMode } = OlsConfigStore.getState();
  if (renderMode !== 'PUBLISH') {
    window.location.reload();
  } else {
    window.location = OlsConfigStore.getStorePageUrl();
  }
}

// Server Actions - need this format
export function cartWasLoaded(data) {
  const { state } = data;
  if (state === 'complete' || state === 'canceled') {
    CartUtils.clearCookie();

    dispatchServerAction({
      type: CartConstants.NO_CART_WAS_LOADED
    });
  } else {
    if (data.currency !== OlsConfigStore.getCurrentCurrency()) {
      OlsConfigActions.loadConfig(true);
    }

    CartUtils.saveOrderCookie(data);

    dispatchServerAction({
      type: CartConstants.CART_WAS_LOADED,
      data: data
    });
  }
}

export function errorCartLoad(error) {
  switch (error.status_code) {
    case 404:
    case 401:
      // Create new cart if cart does not exist or unauthorized request
      postCreateCart();
      break;
    case 403:
      return forbiddenHandler();
    default:
      dispatchServerAction({
        type: CartConstants.ERROR_CART_LOAD,
        error: error
      });
  }
}

export function cartItemWasAdded() {
  dispatchServerAction({
    type: CartConstants.CART_ITEM_WAS_ADDED
  });
}

export function errorCartItemAdd(error, data) {
  const { errors } = data;
  switch (error.status_code) {
    case 403:
      return forbiddenHandler();
    case 422:
      error.messages = errors;
      break;
    default:
  }

  dispatchServerAction({
    type: CartConstants.ERROR_CART_ITEM_ADD,
    error: error
  });
}

export function cartItemWasModified() {
  dispatchServerAction({
    type: CartConstants.CART_ITEM_WAS_MODIFIED
  });

  loadCart();
}

export function cartItemWasRemoved() {
  dispatchServerAction({
    type: CartConstants.CART_ITEM_WAS_REMOVED
  });

  loadCart();
}

export function errorCartItemRemove(error) {
  // if (error.status_code === 404)
  // Cart item was not found. Display an error but refresh the cart anyway

  if (error && error.status_code === 403) {
    return forbiddenHandler();
  }

  dispatchServerAction({
    type: CartConstants.ERROR_CART_ITEM_REMOVE,
    error
  });

  loadCart();
}

export function errorCartItemModify(error) {
  switch (error.status_code) {
    case 403:
      return forbiddenHandler();
    case 404:
      postCreateCart();
      break;
    default:
  }

  dispatchServerAction({
    type: CartConstants.ERROR_CART_ITEM_MODIFY,
    error
  });
}

export function couponWasApplied(data) {
  dispatchServerAction({
    type: CartConstants.COUPON_WAS_APPLIED,
    data
  });
}

export function couponWasInvalid(data) {
  dispatchServerAction({
    type: CartConstants.COUPON_WAS_INVALID,
    data
  });
}

export default {
  createCart,
  loadCart,
  addToCart,
  removeFromCart,
  modifyCart,
  doCheckout,
  applyCoupon
};
