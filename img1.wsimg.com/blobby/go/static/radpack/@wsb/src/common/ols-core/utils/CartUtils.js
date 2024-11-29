/* eslint-disable no-empty */

import OlsConfigStore from '../stores/OlsConfigStore';
import { cookieExists, getCookie, removeCookie, setCookie } from '../utils/cookies';

const OLS_CART_COOKIE = 'OLS_CART_STORE';

export const LocationHelper = {
  getHostname: () => {
    return window.location.hostname;
  }
};

export function getCartCookieKey() {
  const websiteId = OlsConfigStore.getWebsiteId();
  return `${OLS_CART_COOKIE}_${websiteId}`;
}

export function getDomainForCookie() {
  const domain = LocationHelper.getHostname();
  return domain.replace(/^www\./i, '');
}

export function getParsedCookie() {
  const cartCookieKeyLegacy = OLS_CART_COOKIE;
  const cartCookieKey = getCartCookieKey();
  let rawCookie = null;
  let parsedCookie = null;
  if (cookieExists(cartCookieKey)) {
    rawCookie = getCookie(cartCookieKey) || null;
  } else if (cookieExists(cartCookieKeyLegacy)) {
    rawCookie = getCookie(cartCookieKeyLegacy) || null;
  } else {
    rawCookie = null;
  }
  if (rawCookie) {
    try {
      parsedCookie = JSON.parse(rawCookie);
    } catch (e) {}
  }
  return parsedCookie;
}

export function getParsedOrder() {
  return (getParsedCookie() || {}).order || null;
}

export function clearCookie() {
  const cartCookieKey = getCartCookieKey();
  const parsedCookie = getParsedCookie();
  let domainFromCookie = null;
  if (parsedCookie) {
    domainFromCookie = parsedCookie.domain || null;
  }
  removeCookie(cartCookieKey, '/', domainFromCookie);
}

export function saveOrderCookie(data) {
  const domainForCookie = getDomainForCookie();
  const existingCookie = getParsedCookie();
  const cartCookieKey = getCartCookieKey();

  if (existingCookie && existingCookie.domain !== domainForCookie) {
    removeCookie(cartCookieKey, '/', existingCookie.domain || null);
  }

  const cookieValue = JSON.stringify({ order: { number: data.number, token: data.token }, domain: domainForCookie });

  setCookie({
    sKey: cartCookieKey,
    sValue: cookieValue,
    vEnd: null,
    sPath: '/',
    sDomain: domainForCookie
  });
}
