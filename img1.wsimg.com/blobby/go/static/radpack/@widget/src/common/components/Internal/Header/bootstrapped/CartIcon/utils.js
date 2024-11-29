import { constants } from '@wsb/guac-widget-core';
// Cache the config response for X minutes to reduce unnecessary API requests
const CART_CONFIG_CACHE_TIME = 5 * 60e3;

export const getOlaCartConfigUrl = ({ websiteId, rootDomain }) => {
  return `https://api.ola.${rootDomain}/accounts/${websiteId}/config?fields[]=cart`;
};

export const getGoPayCartFF = async ({ shouldUseCache = false, websiteId, rootDomain }) => {
  let isGopayCartOn = false;
  try {
    if (shouldUseCache) {
      isGopayCartOn = sessionStorage.getItem('olaGopayCartOn') === 'true';
      // If cache hasn't expired yet (5 minutes), use sessionStorage value
      if (+new Date() - +sessionStorage.getItem('olaGopayCartOnTs') < CART_CONFIG_CACHE_TIME) {
        return isGopayCartOn;
      }
    }

    const configResponse = await window.fetch(getOlaCartConfigUrl({ websiteId, rootDomain }));
    const response = await configResponse.json();
    const config = response.config;

    // Check config flag from API
    isGopayCartOn = config && config.is_gopay_cart_on;

    // Cache the config flag
    if (shouldUseCache) {
      sessionStorage.setItem('olaGopayCartOn', isGopayCartOn);
      sessionStorage.setItem('olaGopayCartOnTs', +new Date());
    }
    return isGopayCartOn;
  } catch (ex) {
    return isGopayCartOn;
  }
};

export const getCountStyles = category => {
  const { ACCENT } = constants.categoryTypes;
  return {
    wrapper: {
      'position': 'relative',
      ':after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        backgroundColor: category === ACCENT ? 'neutralOverlay' : 'accentOverlay',
        borderRadius: '0.75em',
        opacity: category === ACCENT ? '0.2' : '0.1'
      }
    },
    count: {
      position: 'relative',
      minWidth: '1.5em',
      padding: '0.25em',
      lineHeight: '1',
      textAlign: 'center',
      zIndex: '1'
    }
  };
};

export const handleCartRedirect = ({ cart, renderMode }) => {
  if (renderMode !== constants.renderModes.PUBLISH) {
    return;
  }

  try {
    if (new URLSearchParams(window.location.search).get('showCart') === 'true') {
      cart.toggle();
    }
  } catch (ex) {} // eslint-disable-line
};
