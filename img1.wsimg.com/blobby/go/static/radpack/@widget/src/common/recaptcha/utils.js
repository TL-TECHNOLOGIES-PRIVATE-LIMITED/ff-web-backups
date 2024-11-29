/* eslint-disable callback-return */

// NOTE: Exported functions within this module expect to be executed within the
// context of the browser.

const URL = 'https://www.google.com/recaptcha/api.js';
const RECAPTCHA_SCRIPT_ID = 'recaptcha-script';

const initialRecaptchaState = () => ({
  siteKeyCallbacks: [],
  scriptCallbacks: []
});

function addRecaptchaToWindow() {
  if (window.wsb && window.wsb.recaptcha) {
    return;
  }

  window.wsb = window.wsb || {};
  window.wsb.recaptcha = initialRecaptchaState();
}

function scriptLoaded() {
  return typeof window.grecaptcha !== 'undefined' && window.grecaptcha.execute;
}

function getExistingScript() {
  return document.querySelector(`#${RECAPTCHA_SCRIPT_ID}`);
}

function onScriptLoad() {
  window.grecaptcha.ready(() => {
    const callbacks = window.wsb.recaptcha.scriptCallbacks;
    while (callbacks.length) {
      const callback = callbacks.pop();
      callback();
    }
  });
}

function createScript(siteKey) {
  const script = document.createElement('script');
  script.setAttribute('src', `${URL}?render=${encodeURIComponent(siteKey)}`);
  script.setAttribute('id', RECAPTCHA_SCRIPT_ID);
  script.setAttribute('async', true);
  script.setAttribute('defer', true);
  script.onload = onScriptLoad;
  document.body.appendChild(script);
  return script;
}

function addScriptLoadCallback(callback) {
  window.wsb.recaptcha.scriptCallbacks.push(callback);
}

export function loadScript({ siteKey }, onLoad) {
  addRecaptchaToWindow();
  if (scriptLoaded()) {
    onLoad();
    return;
  }

  addScriptLoadCallback(onLoad);
  if (getExistingScript()) {
    return;
  }

  createScript(siteKey);
}
