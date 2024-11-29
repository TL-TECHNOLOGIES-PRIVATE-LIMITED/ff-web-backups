/* eslint-disable prefer-const */
/* eslint-disable prefer-promise-reject-errors */

import appendParams from './appendParams';
import OlsConfigStore from '../stores/OlsConfigStore';

function timestampedRequestsDisabled() {
  if (typeof window !== 'undefined') {
    return (/olsTimestampedRequests=false/i).test(window.location.search);
  }
  return false;
}

export function setHeaders(req, obj = null, optHeaders) {
  req.withCredentials = true;
  req.setRequestHeader('Accept', '*/*');

  if (obj) {
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  }

  if (optHeaders) {
    const headers = Object.keys(optHeaders);
    headers.forEach((header) => {
      req.setRequestHeader(header, optHeaders[header]);
    });
  }
}

class XHR {
  constructor() {
    this.timestampedRequestsDisabled = timestampedRequestsDisabled();
  }

  _addDynamicTimestamp(url) {
    if (this.timestampedRequestsDisabled) {
      return url;
    }

    return appendParams(url, {
      timestamp: Date.now()
    });
  }

  _makeRequest(opts) {
    const olsConfigStoreState = OlsConfigStore.getState() || {};
    let { method, url, data, timeout, retryPrevented } = opts;
    const { optHeaders } = opts;
    let retryCountdown = olsConfigStoreState.requestRetries || 0;
    const requestTimeout = timeout || olsConfigStoreState.requestTimeout.default || 0;

    return new Promise(function (resolve, reject) {
      function createReq() {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.timeout = requestTimeout;
        let json = {};

        xhr.onload = function () {
          try {
            json = JSON.parse(xhr.response);
          } catch (e) {
            // Unable to parse JSON
            json = {};
          }

          if (this.status >= 400) {
            let error = new Error(json.error || json.message || xhr.responseText || 'unexpected error');
            error.status_code = this.status;
            return reject({
              error: error,
              response: json
            });
          }
          resolve(json);
        };

        function handleNetworkError() {
          if (retryCountdown-- > 0 && !retryPrevented) {
            createReq();
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText
            });
          }
        }

        xhr.onerror = handleNetworkError;
        xhr.ontimeout = handleNetworkError;

        setHeaders(xhr, data, optHeaders);

        if (data && typeof data === 'object') {
          data = JSON.stringify(data);
        }
        xhr.send(data);
      }
      createReq();
    });
  }

  getRequest(url, data, timeout, optHeaders) {
    let requestParams = {
      method: 'GET',
      url: this._addDynamicTimestamp(url),
      timeout,
      optHeaders
    };
    if (data) requestParams.data = data;
    return this._makeRequest(requestParams);
  }

  // eslint-disable-next-line
  postRequest(url, data, timeout, retryPrevented = false, optHeaders) {
    let requestParams = {
      method: 'POST',
      url,
      timeout,
      retryPrevented,
      optHeaders
    };
    if (data) requestParams.data = data;
    return this._makeRequest(requestParams);
  }

  putRequest(url, data, timeout, optHeaders) {
    let requestParams = {
      method: 'PUT',
      url,
      timeout,
      optHeaders
    };
    if (data) requestParams.data = data;
    return this._makeRequest(requestParams);
  }

  patchRequest(url, data, timeout, optHeaders) {
    let requestParams = {
      method: 'PATCH',
      url,
      timeout,
      optHeaders
    };
    if (data) requestParams.data = data;
    return this._makeRequest(requestParams);
  }

  deleteRequest(url, data, timeout, optHeaders) {
    let requestParams = {
      method: 'DELETE',
      url: url,
      timeout: timeout,
      optHeaders
    };
    if (data) requestParams.data = data;
    return this._makeRequest(requestParams);
  }
}

export default new XHR();
