import XHR from './xhr';
import OlsConfigStore from '../stores/OlsConfigStore';
import { clearCookie } from '../utils/CartUtils';
import queryString from 'query-string';

function getBaseUrl() {
  return OlsConfigStore.getApiBaseUrl();
}

function getAccountManagerBaseUrl() {
  return OlsConfigStore.getState().olsAccountStatusHost;
}

export function loadConfig() {
  let url = `${getBaseUrl()}/api/v3/config`;

  if (typeof location === 'undefined') {
    return XHR.getRequest(url);
  }

  const query = queryString.parse(location.search);
  const testOrderPermissions = query && query.olsTestOrderPermissions;
  delete query.olsTestOrderPermissions;
  const newQuery = queryString.stringify(query);

  if (testOrderPermissions) {
    url += `?test_order_permissions=${testOrderPermissions}`;
    clearCookie();
    window.history.pushState({}, document.title, `${location.pathname}?${newQuery}`);
  }

  return XHR.getRequest(url);
}

export function loadAccount(websiteId) {
  return XHR.getRequest(`${getAccountManagerBaseUrl()}/api/global/accounts/${websiteId}`);
}

export function provisionAccount(websiteId) {
  return XHR.postRequest(`${getAccountManagerBaseUrl()}/api/global/accounts/${websiteId}`, {}, null, true);
}
