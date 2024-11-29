/* eslint-disable id-length */
import { dispatchServerAction, dispatchViewAction } from '../dispatcher/AppDispatcher';
import ProductConstants from '../constants/ProductConstants';
import ProductListStore from '../stores/ProductListStore';
import ProductDetailStore from '../stores/ProductDetailStore';
import OlsConfigActions from './OlsConfigActions';
import OlsConfigStore from '../stores/OlsConfigStore';
import CategoryListStore from '../stores/CategoryListStore';
import ShopStore from '../stores/ShopStore';
import * as APIUtils from '../utils/ApiUtils';

// View Actions
function loadProducts(props = {}) {
  const { page = 1, taxonPermalink = null, searchKeywords, sortOption, routePath, tokenDirection = '', pageToken = null } = props;
  const { fetching, perPage, pagination, defaultSortOption } = ProductListStore.getState();
  const { taxonsWereLoaded } = ShopStore.getState();
  const { renderMode } = OlsConfigStore.getState();
  const { fetchTaxons } = CategoryListStore.getState();

  if (fetching) {
    return;
  }

  const actionData = {
    selectedTaxonPermalink: taxonPermalink,
    searchKeywords,
    fetchTaxons,
    sortOption,
    routePath,
    tokenDirection,
    pageToken
  };

  if (renderMode !== 'PUBLISH' || !taxonsWereLoaded) {
    actionData.fetchTaxons = true;
  }

  dispatchViewAction({
    type: ProductConstants.LOAD_PRODUCTS,
    data: actionData
  });

  const attrs = {
    page,
    per_page: perPage,
    pagination
  };
  if (taxonPermalink) {
    attrs.taxon_permalink = taxonPermalink;
  }

  if (pageToken) {
    attrs.pageToken = pageToken;
  }

  if (tokenDirection) {
    attrs.tokenDirection = tokenDirection;
  }

  if (searchKeywords) {
    attrs['q[keywords]'] = searchKeywords;
    attrs['q[name_or_description_text_cont]'] = searchKeywords;
  }

  const sortParam = sortOption || defaultSortOption || 'descend_by_popularity';
  attrs[`q[${sortParam}]`] = true;

  APIUtils.loadProducts(attrs)
    .then(function (data) {
      return productsWereLoaded(data);
    }).then(() => {
      window.dispatchEvent(new Event('finishLoadingProducts'));
    })
    .catch(function (data) {
      return errorLoadingProductsData(data.error);
    });
}

function setProductSlug(slug) {
  dispatchViewAction({
    type: ProductConstants.SET_PRODUCT_SLUG,
    data: slug
  });
}

function setProductDetailData({ slug, selectedVariantSku }) {
  dispatchViewAction({
    type: ProductConstants.SET_PRODUCT_DETAIL_DATA,
    data: { slug, selectedVariantSku }
  });
}

function loadProduct() {
  const { slug, fetching } = ProductDetailStore.getState();
  if (!slug || fetching) {
    return;
  }

  dispatchViewAction({
    type: ProductConstants.LOAD_PRODUCT
  });

  APIUtils.loadProduct(slug)
    .then(function (data) {
      return productWasLoaded(data);
    })
    .catch(function (data) {
      return errorLoadingProductData(data.error);
    });
}

function setProductConfig(props) {
  const data = { defaultPerPage: props.defaultPerPage, defaultSortOption: props.defaultSortOption };
  dispatchViewAction({
    type: ProductConstants.SET_PRODUCT_CONFIG,
    data: data
  });
}

// Server Actions - need this format
export function productsWereLoaded(data) {
  const product = data.products[0];

  if (product && product.currency !== OlsConfigStore.getCurrentCurrency()) {
    OlsConfigActions.loadConfig(true);
  }

  dispatchServerAction({
    type: ProductConstants.PRODUCTS_WERE_LOADED,
    data: data
  });
}

export function productWasLoaded(data) {
  if (data.currency !== OlsConfigStore.getCurrentCurrency()) {
    OlsConfigActions.loadConfig(true);
  }

  dispatchServerAction({
    type: ProductConstants.PRODUCT_WAS_LOADED,
    data: data
  });
}

export function errorLoadingProductsData(error) {
  dispatchServerAction({
    type: ProductConstants.ERROR_LOADING_PRODUCTS_DATA,
    error
  });
}

export function errorLoadingProductData(error) {
  dispatchServerAction({
    type: ProductConstants.ERROR_LOADING_PRODUCT_DATA,
    error
  });
}

function loadSimilarProducts(currentSlug) {
  const slug = currentSlug || ProductDetailStore.getState().slug;
  if (!slug) {
    return;
  }

  dispatchServerAction({
    type: ProductConstants.LOAD_SIMILAR_PRODUCTS
  });

  APIUtils.loadSimilarProducts(slug)
    .then(function (data) {
      return similarProductsWereLoaded(data);
    })
    .catch(function (data) {
      return errorLoadingSimilarProductsData(data.error);
    });
}

export function similarProductsWereLoaded(data) {
  dispatchServerAction({
    type: ProductConstants.LOAD_SIMILAR_PRODUCTS_LOADED,
    data: data
  });
}

export function errorLoadingSimilarProductsData(error) {
  dispatchServerAction({
    type: ProductConstants.ERROR_LOADING_SIMILAR_PRODUCTS_DATA,
    error
  });
}

export default { loadProducts, setProductSlug, setProductDetailData, setProductConfig, loadProduct, loadSimilarProducts };
