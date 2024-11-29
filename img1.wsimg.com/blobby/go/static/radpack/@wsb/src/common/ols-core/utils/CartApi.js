import XHR from './xhr';
import OlsConfigStore from '../stores/OlsConfigStore';

export function getBaseUrl() {
  return OlsConfigStore.getApiBaseUrl();
}

export function createCart(options) {
  return XHR.postRequest(`${getBaseUrl()}/api/orders?app=vnext`, options);
}

export function getHeaders(order) {
  return { 'X-Spree-Order-Token': order.token };
}

/* eslint-disable no-undefined */
export function loadCart(order, destroyExpiredProducts) {
  let url = `${getBaseUrl()}/api/orders/${order.number}?app=vnext`;
  if (destroyExpiredProducts) {
    url += '&destroyExpiredProducts=true';
  }
  return XHR.getRequest(url, undefined, undefined, getHeaders(order));
}

export function addToCart(order, variantId, quantity, options) {
  const timeout = OlsConfigStore.getState().requestTimeout.addToCart;
  return XHR.postRequest(
    `${getBaseUrl()}/api/orders/${order.number}/line_items`,
    {
      line_item: {
        variant_id: variantId,
        quantity: parseInt(quantity, 10),
        options: options
      }
    },
    timeout,
    false,
    getHeaders(order)
  );
}

export function addToOrder(order, variantId, quantity, options) {
  const timeout = OlsConfigStore.getState().requestTimeout.addToCart;
  return XHR.postRequest(
    `${getBaseUrl()}/api/orders/${order.number}/line_items?return_order=1&app=vnext`,
    {
      line_item: {
        variant_id: variantId,
        quantity: parseInt(quantity, 10),
        options: options
      }
    },
    timeout,
    false,
    getHeaders(order)
  );
}

export function modifyCartLineItems(order, lineItemAttributes) {
  const orderParams = {
    order: { line_items_attributes: lineItemAttributes }
  };

  return XHR.patchRequest(
    `${getBaseUrl()}/api/orders/${order.number}/line_items/update_multiple`,
    orderParams,
    undefined,
    getHeaders(order)
  );
}

export function removeCartLineItem(order, lineItemId) {
  return XHR.deleteRequest(
    `${getBaseUrl()}/api/orders/${order.number}/line_items/${lineItemId}`,
    undefined,
    undefined,
    getHeaders(order)
  );
}

export function applyCoupon(order, couponCode) {
  const couponParams = {
    coupon_code: couponCode
  };

  return XHR.putRequest(
    `${getBaseUrl()}/api/orders/${order.number}/apply_coupon_code`,
    couponParams,
    undefined,
    getHeaders(order)
  );
}
/* eslint-enable no-undefined */
