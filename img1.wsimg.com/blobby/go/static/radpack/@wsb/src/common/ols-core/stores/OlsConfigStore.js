/* eslint-disable id-length */
/* eslint-disable camelcase */

import { assign, merge } from 'lodash';
import EventEmitter from '@wsb/commerce-event-emitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import OlsConfigConstants from '../constants/OlsConfigConstants';
import Config from '../config';
import OlsStoreProvisionedStates, { isAccountProvisioned } from '../constants/OlsStoreProvisionedStates';

class OlsConfigStore extends EventEmitter {
  constructor() {
    super(...arguments);

    this.state = {
      olsHost: null,
      olsPublishedSiteHost: null,
      olsAccountStatusHost: null,
      noProductImage: null,
      requestTimeout: {},
      requestRetries: 0,
      websiteId: null,
      olsAccountStatus: null,
      renderMode: null,
      env: null,
      fetchingAccount: false,
      fetchingConfig: false,
      defaultCategory: null,
      allProductsCategory: {},
      error: null,
      errorRetryable: false,
      configWasSet: false,
      configWasLoaded: false,
      productSortingEnabled: false,
      resourcesToPreload: {},
      i18n: {},
      subscribe_coupon: {},
      store_page_url: null,
      checkout_allowed: true,
      provisionInProgress: false,
      provisionTried: false,
      buyNowEnabled: false,
      freeShippingLabelEnabled: false,
      freeShippingBannerEnabled: false
    };
    assign(this.state, this.defaultConfig());

    this.register();
  }

  defaultConfig() {
    return {
      locale: 'en-US',
      store_status: 'LIVE',
      number: {
        format: {
          strip_insignificant_zeros: false,
          pattern: '[\\d\\,]*(\\.[\\d\\,]+)?',
          precision: 3,
          thousands_separator: ',',
          significant: false,
          decimal_mark: '.'
        }
      },
      country_iso3: 'USA',
      country_iso: 'US',
      date_format: '%Y-%m-%d',
      categories_taxonomy_id: null,
      featured_products_taxon_permalink: null,
      defaultCategory: null,
      allProductsCategory: {},
      show_coupon: false,
      fb_pixel_tracking: false,
      tracks_fbe_pixel: false,
      ga_ad_tracking: null,
      taxon_show_extended_details: false,
      use_best_match: false,
      store_name: null,
      freeShippingLabelEnabled: false,
      freeShippingBannerEnabled: false,
      buyNowEnabled: false,
      stripe_config: {
        with_apple_pay: false,
        apple_pay_on_cart: false,
        apple_pay_on_product_detail: false,
        with_payment_request: false,
        publishable_key: null,
        reference_id: null
      },
      poynt_config: {
        application_id: null,
        business_id: null,
        sdk_url: null,
        with_apple_pay: false
      },
      currency: {
        format: {
          symbol_first: true,
          pattern: '[\\d\\,]*(\\.[\\d\\,]+)?',
          symbol: '$',
          precision: 2,
          thousands_separator: ',',
          decimal_mark: '.'
        },
        code: 'USD'
      },
      yotpo_config: {
        app_key: null,
        script_url: null
      },
      i18n: {},
      subscribe_coupon: {
        description: null,
        code: null
      }
    };
  }

  setState(newState) {
    assign(this.state, newState);
    this.emit('change');
  }

  getState() {
    return this.state;
  }

  getCurrentCurrency() {
    return this.getState().currency.code;
  }

  getSubscribeCoupon() {
    return this.getState().subscribe_coupon || {};
  }

  getStorePageUrl() {
    const { store_page_url } = this.getState();
    return store_page_url;
  }

  getCheckoutAllowed() {
    return this.getState().checkout_allowed;
  }

  getI18n() {
    return this.getState().i18n || {};
  }

  getWebsiteId() {
    return this.getState().websiteId;
  }

  getApiBaseUrl() {
    const { renderMode, olsHost, olsPublishedSiteHost } = this.getState();
    return renderMode === 'PUBLISH' ? olsPublishedSiteHost : olsHost;
  }

  isProvisioned() {
    const { olsAccountStatus, renderMode } = this.getState();
    return renderMode === 'PUBLISH' || isAccountProvisioned(olsAccountStatus);
  }

  provisionTried() {
    return this.getState().provisionTried;
  }

  isProvisionInProgress() {
    return this.getState().provisionInProgress;
  }

  getHostConfig(data) {
    const { isReseller, env, websiteId } = data;
    const envConfig = Config[env || 'local'];
    const hostRef = isReseller ? envConfig.reseller : envConfig;
    return {
      olsHost: hostRef.olsHost.replace('{websiteId}', websiteId),
      olsPublishedSiteHost: hostRef.olsPublishedSiteHost.replace('{websiteId}', websiteId),
      olsAccountStatusHost: hostRef.olsAccountStatusHost
    };
  }

  getDefaultCategory() {
    return this.getState().defaultCategory;
  }

  getAllProductsInfo() {
    return this.getState().allProductsCategory || {};
  }

  register() {
    this.dispatchToken = AppDispatcher.register((payload) => {
      const { action } = payload;
      const { data } = action;
      const { i18n } = this.state;
      let defaultData;
      let envConfig;

      switch (action.type) {
        case OlsConfigConstants.SET_CONFIG:
          envConfig = Config[data.env || 'local'];
          this.setState({
            ...this.getHostConfig(data),
            noProductImage: envConfig.noProductImage,
            requestTimeout: envConfig.requestTimeout,
            requestRetries: envConfig.requestRetries,
            websiteId: data.websiteId,
            olsAccountStatus: data.olsAccountStatus,
            renderMode: data.renderMode,
            env: data.env,
            configWasSet: true
          });
          break;
        case OlsConfigConstants.UPDATE_I18N:
          this.setState({
            i18n: merge(i18n, data.staticContent, data.i18n)
          });
          break;
        case OlsConfigConstants.LOAD_CONFIG:
          this.setState({
            fetchingConfig: true,
            error: null,
            errorRetryable: false
          });
          break;
        case OlsConfigConstants.LOAD_ACCOUNT_INFO:
          this.setState({
            fetchingAccount: true,
            error: null,
            errorRetryable: false
          });
          break;
        case OlsConfigConstants.START_PROVISION_ACCOUNT:
          this.setState({
            provisionInProgress: true,
            error: null,
            errorRetryable: false
          });
          break;
        case OlsConfigConstants.CONFIG_WAS_LOADED:
          this.setState({
            fetchingConfig: false,
            locale: data.locale,
            store_status: data.store_status,
            olsAccountStatus: data.status,
            number: data.number,
            country_iso3: data.country_iso3,
            country_iso: data.country_iso,
            date_format: data.date_format,
            currency: data.currency,
            categories_taxonomy_id: data.categories_taxonomy_id,
            featured_products_taxon_permalink: data.featured_products_taxon_permalink,
            defaultCategory: data.default_category,
            allProductsCategory: data.all_products_category,
            show_coupon: data.show_coupon,
            fb_pixel_tracking: data.fb_pixel_tracking,
            tracks_fbe_pixel: data.tracks_fbe_pixel,
            ga_ad_tracking: data.ga_ad_tracking,
            taxon_show_extended_details: data.taxon_show_extended_details,
            use_best_match: data.use_best_match,
            store_name: data.store_name,
            stripe_config: data.stripe_config,
            poynt_config: data.poynt_config,
            resourcesToPreload: data.resources_to_preload || {},
            subscribe_coupon: data.subscribe_coupon,
            yotpo_config: data.yotpo_config || { app_key: null, script_url: null },
            configWasLoaded: true,
            store_page_url: data.store_page_url,
            checkout_allowed: data.checkout_allowed,
            buyNowEnabled: data.buy_now_enabled,
            freeShippingLabelEnabled: data.free_shipping_label_enabled,
            freeShippingBannerEnabled: data.free_shipping_banner_enabled
          });
          break;
        case OlsConfigConstants.ERROR_LOADING_CONFIG:
          // Populate with the default config data
          defaultData = this.defaultConfig();
          this.setState({
            fetchingConfig: false,
            error: action.error,
            store_status: defaultData.store_status,
            number: defaultData.number,
            country_iso3: defaultData.country_iso3,
            country_iso: defaultData.country_iso,
            date_format: defaultData.date_format,
            currency: defaultData.currency
          });
          break;
        case OlsConfigConstants.ACCOUNT_INFO_WAS_LOADED:
          this.setState({
            fetchingAccount: false,
            olsAccountStatus: data.status
          });
          break;
        case OlsConfigConstants.ERROR_LOADING_ACCOUNT_INFO:
          this.setState({
            fetchingAccount: false,
            error: action.error
          });
          break;
        case OlsConfigConstants.TOGGLE_PRODUCT_SORTING:
          this.setState({
            productSortingEnabled: data
          });
          break;
        case OlsConfigConstants.ACCOUNT_PROVISIONED:
          this.setState({
            olsAccountStatus: OlsStoreProvisionedStates.ACTIVE,
            provisionInProgress: false,
            provisionTried: true
          });
          break;
        case OlsConfigConstants.ERROR_ACCOUNT_PROVISIONED:
          this.setState({
            provisionInProgress: false,
            provisionTried: true,
            error: action.error
          });
          break;
        case OlsConfigConstants.CLEAR_ERROR:
          this.setState({
            error: null
          });
          break;
        default:
          break;
      }
    });
  }
}

export default new OlsConfigStore();
