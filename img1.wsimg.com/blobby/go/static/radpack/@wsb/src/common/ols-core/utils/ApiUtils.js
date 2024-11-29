import { assign } from 'lodash';
import XHR from './xhr';
import OlsConfigStore from '../stores/OlsConfigStore';
import appendParams from '../utils/appendParams';

function getBaseUrl() {
  return OlsConfigStore.getApiBaseUrl();
}

function getTimeout(query) {
  return OlsConfigStore.getState().requestTimeout[query];
}

export function loadProducts(attrs) {
  const timeout = getTimeout('loadProducts');
  let url = `${getBaseUrl()}/api/v2/products`;

  const queryParams = {
    page_fallback: true,
    app: 'vnext'
  };

  assign(queryParams, attrs);
  url = appendParams(url, queryParams);
  return XHR.getRequest(url, null, timeout);
}

export function loadProduct(slug) {
  const timeout = getTimeout('loadProduct');

  return XHR.getRequest(`${getBaseUrl()}/api/v2/products/${slug}?app=vnext`, null, timeout);
}

export function loadSimilarProducts(slug) {
  const timeout = getTimeout('loadSimilarProducts');
  return XHR.getRequest(`${getBaseUrl()}/api/v1/products/${slug}/similar_products`, null, timeout);
}

export function loadCategories(attrs) {
  const timeout = getTimeout('default');
  let url = `${getBaseUrl()}/api/taxonomies/${OlsConfigStore.getState().categories_taxonomy_id}/taxons`;
  if (attrs) {
    url = appendParams(url, attrs);
  }

  return XHR.getRequest(url, null, timeout);
}
