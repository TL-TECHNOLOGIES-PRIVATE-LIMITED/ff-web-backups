/* eslint-disable no-useless-escape */
/*
|*|  https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setCookie(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getCookie(name)
|*|  * docCookies.removeCookie(name[, path[, domain]])
|*|  * docCookies.cookieExists(name)
|*|  * docCookies.cookieKeys()
|*|
*/

function getCookie(sKey) {
  if (typeof document === 'undefined' || !sKey) { return null; }
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
}

function setCookie(options) {
  if (typeof document === 'undefined') { return null; }
  const { sKey, sValue, vEnd, sPath, sDomain, bSecure } = options;
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
  var sExpires = '';
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
        break;
      case String:
        sExpires = '; expires=' + vEnd;
        break;
      case Date:
        sExpires = '; expires=' + vEnd.toUTCString();
        break;
      default:
        break;
    }
  }
  document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
  return true;
}

function removeCookie(sKey, sPath, sDomain) {
  if (typeof document === 'undefined') { return null; }
  if (!cookieExists(sKey)) { return false; }
  document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
  return true;
}

function cookieExists(sKey) {
  if (typeof document === 'undefined') { return null; }
  if (!sKey) { return false; }
  return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
}

function cookieKeys() {
  if (typeof document === 'undefined') { return null; }
  var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
  for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
  return aKeys;
}

export { cookieExists, cookieKeys, getCookie, removeCookie, setCookie };
