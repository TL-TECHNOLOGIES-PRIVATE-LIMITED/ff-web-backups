import { dispatchViewAction, dispatchServerAction } from '../dispatcher/AppDispatcher';
import OlsConfigConstants from '../constants/OlsConfigConstants';
import OlsConfigStore from '../stores/OlsConfigStore';
import * as APIUtils from '../utils/OlsConfigApi';
import { isEqual, isObject, merge } from 'lodash';
import EditorRenderModes from '../constants/EditorRenderModes';

function setConfig(config) {
  const { configWasSet, i18n, websiteId } = OlsConfigStore.getState();
  let newI18n = config && config.staticContent;
  if (!newI18n) {
    newI18n = config && config.i18n;
  }
  const hasNewWebsiteId = !websiteId && config.websiteId;
  const hasI18nChanges = isObject(newI18n) && Object.keys(newI18n).length && !isEqual(merge({ ...i18n }, newI18n), i18n);

  if (hasI18nChanges) {
    dispatchViewAction({
      type: OlsConfigConstants.UPDATE_I18N,
      data: config
    });
  }

  if (configWasSet && !hasNewWebsiteId) {
    return;
  }

  dispatchViewAction({
    type: OlsConfigConstants.SET_CONFIG,
    data: config
  });
}

function clearError() {
  dispatchViewAction({
    type: OlsConfigConstants.CLEAR_ERROR
  });
}

function toggleProductSorting(enableSorting = false) {
  dispatchViewAction({
    type: OlsConfigConstants.TOGGLE_PRODUCT_SORTING,
    data: enableSorting
  });
}

function loadConfig(forceLoad = false) {
  const storeState = OlsConfigStore.getState();
  const fetchingConfig = storeState.fetchingConfig;
  const wasLoaded = storeState.configWasLoaded;
  const error = storeState.error;

  if (fetchingConfig || error || (!forceLoad && wasLoaded))  {
    return;
  }

  dispatchViewAction({
    type: OlsConfigConstants.LOAD_CONFIG
  });

  APIUtils.loadConfig()
    .then(function (data) {
      return configWasLoaded(data);
    })
    .catch(function (data) {
      // NEMO-13403: when the config call fails, we
      // should try to provision the account in OLS only once
      errorLoadingConfig(data.error || data, data.response);
      return provisionAccount();
    });
}

function provisionAccount() {
  const { provisionInProgress, provisionTried, renderMode } = OlsConfigStore.getState();

  if (([EditorRenderModes.EDIT, EditorRenderModes.PREVIEW].indexOf(renderMode) === -1) || provisionInProgress || provisionTried) {
    return;
  }

  dispatchViewAction({
    type: OlsConfigConstants.START_PROVISION_ACCOUNT
  });

  APIUtils.provisionAccount(OlsConfigStore.getState().websiteId)
    .then(function () {
      return accountWasProvisioned();
    })
    .catch(function (data) {
      return errorProvisioningAccount(data.error || data, data.response);
    });
}

function loadAccount() {
  const { fetchingAccount } = OlsConfigStore.getState();

  if (fetchingAccount) {
    return;
  }

  dispatchViewAction({
    type: OlsConfigConstants.LOAD_ACCOUNT_INFO
  });

  APIUtils.loadAccount(OlsConfigStore.getState().websiteId)
    .then(function (data) {
      return accountWasLoaded(data);
    })
    .catch(function (data) {
      return errorLoadingAccount(data.error);
    });
}

// Server Actions - need this format
export function configWasLoaded(data) {
  dispatchServerAction({
    type: OlsConfigConstants.CONFIG_WAS_LOADED,
    data: data
  });
}

export function errorLoadingConfig(error) {
  dispatchServerAction({
    type: OlsConfigConstants.ERROR_LOADING_CONFIG,
    error
  });
}

export function accountWasLoaded(data) {
  dispatchServerAction({
    type: OlsConfigConstants.ACCOUNT_INFO_WAS_LOADED,
    data: data
  });
}

export function errorLoadingAccount(error) {
  dispatchServerAction({
    type: OlsConfigConstants.ERROR_LOADING_ACCOUNT_INFO,
    error
  });
}

export function accountWasProvisioned() {
  dispatchServerAction({
    type: OlsConfigConstants.ACCOUNT_PROVISIONED
  });
  return loadConfig(true);
}

export function errorProvisioningAccount(error) {
  dispatchServerAction({
    type: OlsConfigConstants.ERROR_ACCOUNT_PROVISIONED,
    error
  });
}

export default { setConfig, clearError, loadConfig, loadAccount, provisionAccount, toggleProductSorting };
