/* eslint no-unused-vars:1 */
/* eslint-disable no-useless-escape */
import ShopView from '../constants/ShopView';
import ShopActions from '../actions/ShopActions';
import ProductActions from '../actions/ProductActions';
import queryString from 'query-string';
import OlsConfigStore from '../stores/OlsConfigStore';

const ROUTE_PARAM = 'olsPage';
const PATH_REGEX = '[^\?]+';
const PARAM_REGEX = '[a-z0-9\-\_\/\+\%\\s\'\"]+';
const PRODUCTS_ROUTE = 'products';
const PRODUCTS_ROUTE_FRIENDLY = 'ols/products';
const ALL_PRODUCTS_ROUTE = 'all';
const ALL_PRODUCTS_ROUTE_FRIENDLY = 'ols/all';

// Add valid routes here.
// See `dispatchView` method and the switch in `generateUrl` method for route-specific logic
const ROUTE_CONFIG_MAP = {};
// --- BEGIN ROUTES ---
// IMPORTANT NOTE: The order in the array below DOES matter. Do not change it without changing the `resolveRoute` method
ROUTE_CONFIG_MAP[ShopView.PRODUCT_DETAIL] = 'products/:slug';
ROUTE_CONFIG_MAP[ShopView.PRODUCT_LISTING] = [PRODUCTS_ROUTE, 't/:taxonPermalink', ALL_PRODUCTS_ROUTE];
ROUTE_CONFIG_MAP[ShopView.CART] = 'cart';
ROUTE_CONFIG_MAP[ShopView.SEARCH_RESULTS] = 'search';
// --- END ROUTES ---
const FRIENDLY_ROUTE_CONFIG_MAP = {};
// --- BEGIN ROUTES ---
// IMPORTANT NOTE: The order in the array below DOES matter. Do not change it without changing the `resolveRoute` method
FRIENDLY_ROUTE_CONFIG_MAP[ShopView.PRODUCT_DETAIL] = 'ols/products/:slug';
FRIENDLY_ROUTE_CONFIG_MAP[ShopView.PRODUCT_LISTING] = [PRODUCTS_ROUTE_FRIENDLY, 'ols/categories/:taxonPermalink', ALL_PRODUCTS_ROUTE_FRIENDLY];
FRIENDLY_ROUTE_CONFIG_MAP[ShopView.CART] = 'ols/cart';
FRIENDLY_ROUTE_CONFIG_MAP[ShopView.SEARCH_RESULTS] = 'ols/search';
// --- END ROUTES ---

// Reverse Config Maps
const reverseRouteConfig = initialConfigMap => {
  const finalMap = {};

  for (const key in initialConfigMap) {
    if (Object.prototype.hasOwnProperty.call(initialConfigMap, key)) {
      const val = initialConfigMap[key];
      if (typeof val === 'object' && val.length) {
        val.forEach((arrVal) => {
          finalMap[arrVal] = key;
        });
      } else {
        finalMap[val] = key;
      }
    }
  }

  return finalMap;
};

const ROUTE_CONFIG = reverseRouteConfig(ROUTE_CONFIG_MAP);
const FRIENDLY_ROUTE_CONFIG = reverseRouteConfig(FRIENDLY_ROUTE_CONFIG_MAP);

// White list query params for specific pages
const ALLOWED_QUERY_PARAMS = {};

// Parameter grouping/duplication so we can potentially migrate away
// from parameter names that are too general/might clash with other widgets
const pageParams = ['page', 'olsPageNum', 'pageToken', 'tokenDirection'];
const sortOptionParams = ['sortOption', 'olsSortOption'];
const keywordParams = ['keywords', 'olsKeywords'];

const ALL_OLS_PARAMS = [
  ...pageParams,
  ...sortOptionParams,
  ...keywordParams
];

ALLOWED_QUERY_PARAMS[ShopView.PRODUCT_LISTING] = [
  ...pageParams,
  ...sortOptionParams
];

ALLOWED_QUERY_PARAMS[ShopView.SEARCH_RESULTS] = [
  ...pageParams,
  ...sortOptionParams,
  ...keywordParams
];

function extractQueryValue(query, paramName, fullMatch) {
  if (!query || !paramName) {
    return null;
  }

  const regex = new RegExp('(?:[\?|\&](' + paramName + '=(' + PARAM_REGEX + ')))', 'i');
  const matches = query.match(regex);
  if (matches && matches.length > 1) {
    return fullMatch ? matches[1] : matches[2];
  }
  return null;
}

class RouteHandler {
  constructor() {
    this.path = '/';
    this.currentPageRoute = null;
    const _this = this;

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', function (e) {
        const view = e.state && e.state.view;
        const params = e.state && e.state.params;
        if (view) {
          _this.dispatchView(view, params);
        } else {
          _this.parseQueryString(window.location.search);
        }
      });
    }
  }

  // eslint-disable-next-line
  init(path, query, defaultView, urlParams = {}, currentPageRoute = null) {
    this.path = path || '/';
    this.currentPageRoute = currentPageRoute;

    const initialOlsPath = path.indexOf('ols/') !== -1 ? path.substring(path.lastIndexOf('ols/')) : '';
    urlParams.initialOlsPath = initialOlsPath;

    this.parseQueryString(query, defaultView, urlParams);
  }

  resolveRoute(view, params) {
    const map = this.useFriendlyRouting ? FRIENDLY_ROUTE_CONFIG_MAP : ROUTE_CONFIG_MAP;
    let finalRoute = map[view];
    if (typeof finalRoute === 'object' && finalRoute.length) {
      // Complicated route. For now, resolve simplistically since only one ShopView has multiple routes
      finalRoute = finalRoute[params.taxonPermalink ? 1 : 0];

      // Handle the cases of "?olsPage=all" and "ols/all"
      if (params.routePath === this.ALL_PRODUCTS_ROUTE) {
        finalRoute = this.ALL_PRODUCTS_ROUTE;
      }
    }
    return finalRoute;
  }

  dispatchView(view, params = {}) {
    if (!OlsConfigStore.isProvisioned()) {
      return;
    }

    const sortOption = params.olsSortOption || params.sortOption;
    const keywords = params.olsKeywords || params.keywords;
    const page = params.olsPageNum || params.page;
    let taxonPermalink = params.taxonPermalink;
    const routePath = params.routePath;
    const pageToken = params.pageToken;
    const tokenDirection = params.tokenDirection;
    if (view && params.slug && view === ShopView.PRODUCT_DETAIL) {
      const { slug, selectedVariantSku } = params;
      ProductActions.setProductDetailData({ slug, selectedVariantSku });
      ProductActions.loadProduct();
    } else if (view && view === ShopView.PRODUCT_LISTING) {
      if (routePath !== this.ALL_PRODUCTS_ROUTE && !taxonPermalink) {
        // For this case, we need to load products for the OLS default category (if applicable)
        taxonPermalink = OlsConfigStore.getDefaultCategory();
      }
      ProductActions.loadProducts({ page, taxonPermalink, sortOption, routePath, tokenDirection, pageToken });
    } else if (view && keywords && view === ShopView.SEARCH_RESULTS) {
      ProductActions.loadProducts({ page, taxonPermalink, searchKeywords: keywords, sortOption, routePath });
    } else {
      ShopActions.setView(view);
    }
  }

  get useFriendlyRouting() {
    return this.currentPageRoute !== null;
  }

  generateUrl(view, params = {}) {
    const query = queryString.parse(location.search);
    const finalRoute = this.resolveRoute(view, params);
    let newRouteValue = finalRoute;
    let skuParam = '';

    switch (view) {
      case ShopView.PRODUCT_DETAIL:
        if (params.selectedVariantSku) {
          skuParam = `/v/${encodeURIComponent(params.selectedVariantSku)}`;
        }
        newRouteValue = finalRoute.replace(':slug', `${params.slug}${skuParam}`);
        break;
      case ShopView.PRODUCT_LISTING:
        if (params.taxonPermalink) {
          newRouteValue = finalRoute.replace(':taxonPermalink', params.taxonPermalink);
        }
        break;
      default:
        break;
    }

    // Remove all OLS params. For example,
    // We don't want to carry over search params to the product details page.
    ALL_OLS_PARAMS.forEach((key) => {
      if (key in query) delete query[key];
    });

    // Construct additional params
    if (params) {
      const allowedParams = ALLOWED_QUERY_PARAMS[view] || [];
      allowedParams.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          query[key] = params[key];
        }
      });
    }

    let url;
    const generateQueryForUrl = (query) => query && Object.keys(query).length ? `?${queryString.stringify(query)}` : '';
    if (this.useFriendlyRouting) {
      delete query[ROUTE_PARAM];
      url = `${this.currentPageRoute}/${newRouteValue}${generateQueryForUrl(query)}`;
    } else {
      query[ROUTE_PARAM] = newRouteValue;
      url = `${this.path}${generateQueryForUrl(query)}`;
    }
    // Remove any double slashes. Can happen if currentPageRoute === '/'
    url = url.replace(/\/\//g, '/');
    return url;
  }

  setPath(path) {
    this.path = path || '/';
  }

  testRoutePath(routePath, queryValue) {
    if (routePath.indexOf('/') === -1) {
      return routePath.toLowerCase() === queryValue.toLowerCase();
    }
    const regexRoutePath = routePath.replace(/\:[a-z0-9]+/ig, PATH_REGEX);
    const regex = new RegExp(regexRoutePath, 'ig');
    return regex.test(queryValue);
  }

  normalizeRoutePath(path) {
    // In some cases, the initial request may be using querystring format while
    // the routing itself is using friendly format. In that case, we need to
    // convert the route path. An example is "?olsPage=all":
    // the routePath will be "all", where it should actually be "ols/all" in order
    // for the rest of the logic to work as expected.
    switch (path) {
      case ALL_PRODUCTS_ROUTE:
      case ALL_PRODUCTS_ROUTE_FRIENDLY:
        return this.ALL_PRODUCTS_ROUTE;
      case PRODUCTS_ROUTE:
      case PRODUCTS_ROUTE_FRIENDLY:
        return this.PRODUCTS_ROUTE;
      default:
        return path;
    }
  }

  parseQueryString(query, defaultView, urlParams = {}) {
    if (query) {
      query = decodeURIComponent(query);
    }
    const pageRoute = extractQueryValue(query, ROUTE_PARAM) || '';
    let routePath = null;
    let view = null;
    if (pageRoute || this.useFriendlyRouting) {
      // Old routing logic is used when the olsPage query is present
      const routesConfig = pageRoute ? ROUTE_CONFIG : FRIENDLY_ROUTE_CONFIG;
      const queryValue = pageRoute ? pageRoute : urlParams.initialOlsPath;

      const routeKeys = Object.keys(routesConfig);
      for (let i = 0; i < routeKeys.length; i++) {
        if (this.testRoutePath(routeKeys[i], queryValue)) {
          routePath = this.normalizeRoutePath(routeKeys[i]);
          view = routesConfig[routePath];
          break;
        }
      }
    }

    if (!view) {
      view = defaultView;
    }

    // construct params object as well as strip unwanted params from baseQueryString
    // so that we can re-use it every time we call navigate
    const params = { routePath };

    let remainingPath, splitRoute;
    if (routePath && routePath.indexOf('/' !== -1)) {
      const rp = routePath.split('/');
      splitRoute = (pageRoute || urlParams.initialOlsPath).split('/');
      const splitCount = this.useFriendlyRouting ? 3 : 2;
      const qp = splitRoute.slice(0, splitCount);
      remainingPath = splitRoute.slice(2).join('/');
      if (rp.length === qp.length) {
        rp.forEach((key, index) => {
          if (key.indexOf(':') === 0) {
            params[key.substring(1)] = qp[index];
          }
        });
      }
    }

    if (remainingPath && remainingPath.length) {
      // grabs the :sku from 'products/:slug/v/:sku'
      const splitRouteIndex = this.useFriendlyRouting ? 4 : 3;
      if (splitRoute[splitRouteIndex]) {
        params.selectedVariantSku = decodeURIComponent(splitRoute[splitRouteIndex]);
      }
    }

    let baseQueryString = query || '';
    const stripParams = ALLOWED_QUERY_PARAMS[view] || [];

    stripParams.forEach((p) => {
      const paramMatch = extractQueryValue(baseQueryString, p, true);
      if (paramMatch) {
        params[p] = extractQueryValue(baseQueryString, p);
        baseQueryString = baseQueryString.replace('&' + paramMatch, '');
      }
    });

    if (view) {
      // Skip url rewrite if there is no initialOlsPath and no pageRoute.
      // if pageRoute is set (i.e. a ?olsPage= request), then we want to rewrite to friendly url
      const skipUrlRewrite = this.useFriendlyRouting && !urlParams.initialOlsPath && !pageRoute;
      this.navigate(view, params, true, skipUrlRewrite);
    }
  }

  navigate(view, params, replaceState, skipUrlRewrite) {
    const { keywords, sortOption, pageToken, tokenDirection } = params || {};
    if (!keywords && sortOption === 'descend_by_match') {
      delete params.sortOption;
    }
    this.dispatchView(view, params);
    // In the case of initial load with default path/params, we don't want to force a url override
    if (typeof window === 'undefined' || skipUrlRewrite) {
      return;
    }
    this.rewriteURL({ replaceState, view, params });
  }

  rewriteURL({ replaceState, view, params }) {
    const method = replaceState ? 'replaceState' : 'pushState';
    const stateObj = {
      view: view
    };

    if (params) {
      stateObj.params = params;
    }
    const url = this.generateUrl(view, params);
    window.history[method](stateObj, document.title, url);
  }

  get PRODUCTS_ROUTE() {
    return this.useFriendlyRouting ? PRODUCTS_ROUTE_FRIENDLY : PRODUCTS_ROUTE;
  }

  get ALL_PRODUCTS_ROUTE() {
    return this.useFriendlyRouting ? ALL_PRODUCTS_ROUTE_FRIENDLY : ALL_PRODUCTS_ROUTE;
  }
}

export default new RouteHandler();
