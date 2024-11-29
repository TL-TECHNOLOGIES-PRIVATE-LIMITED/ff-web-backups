define("@wsb/guac-widget-shared/c/OlsConfigStore-52bf928d.js",["exports","~/c/_commonjsHelpers","~/c/interopRequireDefault"],(function(e,t,s){"use strict";var o=t.c((function(e){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},e.exports.__esModule=!0,e.exports.default=e.exports})),r=t.c((function(e){function t(e,t){for(var s=0;s<t.length;s++){var o=t[s];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}e.exports=function(e,s,o){return s&&t(e.prototype,s),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e},e.exports.__esModule=!0,e.exports.default=e.exports})),n=t.c((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s.i(o),i=s.i(r),a=function(){function e(){(0,n.default)(this,e),this.listeners={}}return(0,i.default)(e,[{key:"emit",value:function(e){for(var t=arguments.length,s=new Array(t>1?t-1:0),o=1;o<t;o++)s[o-1]=arguments[o];var r=this.listeners[e];return!!r&&(r.forEach((function(e){return e.apply(void 0,s)})),!0)}},{key:"addListener",value:function(e,t){return this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(t),this}},{key:"on",value:function(e,t){return this.addListener(e,t)}},{key:"removeListener",value:function(e,t){var s=this.listeners[e];if(!s)return this;for(var o=0;o<s.length;o++)if(s[o]===t){s.splice(o,1);break}return this}},{key:"off",value:function(e,t){return this.removeListener(e,t)}}]),e}();t.default=a})),i=t.g(n),a=function(e,t,s,o,r,n,i,a){if(!e){var l;if(void 0===t)l=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[s,o,r,n,i,a],c=0;l=new Error("Invariant Violation: "+t.replace(/%s/g,(function(){return u[c++]})))}throw l.framesToPop=1,l}},l=t.c((function(e,t){t.__esModule=!0;var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._callbacks={},this._isDispatching=!1,this._isHandled={},this._isPending={},this._lastID=1}return e.prototype.register=function(e){var t="ID_"+this._lastID++;return this._callbacks[t]=e,t},e.prototype.unregister=function(e){this._callbacks[e]||a(!1),delete this._callbacks[e]},e.prototype.waitFor=function(e){this._isDispatching||a(!1);for(var t=0;t<e.length;t++){var s=e[t];this._isPending[s]?this._isHandled[s]||a(!1):(this._callbacks[s]||a(!1),this._invokeCallback(s))}},e.prototype.dispatch=function(e){this._isDispatching&&a(!1),this._startDispatching(e);try{for(var t in this._callbacks)this._isPending[t]||this._invokeCallback(t)}finally{this._stopDispatching()}},e.prototype.isDispatching=function(){return this._isDispatching},e.prototype._invokeCallback=function(e){this._isPending[e]=!0,this._callbacks[e](this._pendingPayload),this._isHandled[e]=!0},e.prototype._startDispatching=function(e){for(var t in this._callbacks)this._isPending[t]=!1,this._isHandled[t]=!1;this._pendingPayload=e,this._isDispatching=!0},e.prototype._stopDispatching=function(){delete this._pendingPayload,this._isDispatching=!1},e}();e.exports=s})),u=l;const c=(global.keyMirror||guac.keymirror)({SERVER_ACTION:null,VIEW_ACTION:null}),d=new u,_=e=>{d.dispatch({source:c.VIEW_ACTION,action:e})},p=e=>{d.dispatch({source:c.SERVER_ACTION,action:e})};d.dispatchViewAction=_,d.dispatchServerAction=p;var h=(global.keyMirror||guac.keymirror)({SET_CONFIG:null,LOAD_CONFIG:null,CLEAR_ERROR:null,UPDATE_I18N:null,CONFIG_WAS_LOADED:null,ERROR_LOADING_CONFIG:null,LOAD_ACCOUNT_INFO:null,ACCOUNT_INFO_WAS_LOADED:null,ERROR_LOADING_ACCOUNT_INFO:null,TOGGLE_PRODUCT_SORTING:null,START_PROVISION_ACCOUNT:null,ACCOUNT_PROVISIONED:null,ERROR_ACCOUNT_PROVISIONED:null}),g={local:{olsHost:"https://{websiteId}.onlinestore.dev-godaddy.com",olsPublishedSiteHost:"https://{websiteId}.dev-mysimplestore.com",olsAccountStatusHost:"https://onlinestore.dev-godaddy.com",reseller:{olsHost:"https://{websiteId}.onlinestore.dev-secureserver.net",olsPublishedSiteHost:"https://{websiteId}.dev-mysimplestore.com",olsAccountStatusHost:"https://onlinestore.dev-secureserver.net"},noProductImage:"//onlinestore.wsimg.com/assets/themes/__master/assets/images/prod_no_image_padded.png",requestRetries:2,requestTimeout:{default:3e4,addToCart:15e3,loadProducts:1e4,loadProduct:25e3,loadSimilarProducts:1e4}},development:{olsHost:"https://{websiteId}.onlinestore.dev-godaddy.com",olsPublishedSiteHost:"https://{websiteId}.dev-mysimplestore.com",olsAccountStatusHost:"https://onlinestore.dev-godaddy.com",reseller:{olsHost:"https://{websiteId}.onlinestore.dev-secureserver.net",olsPublishedSiteHost:"https://{websiteId}.dev-mysimplestore.com",olsAccountStatusHost:"https://onlinestore.dev-secureserver.net"},noProductImage:"//onlinestore.wsimg.com/assets/themes/__master/assets/images/prod_no_image_padded.png",requestRetries:2,requestTimeout:{default:3e4,addToCart:15e3,loadProducts:1e4,loadProduct:25e3,loadSimilarProducts:1e4}},test:{olsHost:"https://{websiteId}.onlinestore.test-godaddy.com",olsPublishedSiteHost:"https://{websiteId}.mysimplestore.test-godaddy.com",olsAccountStatusHost:"https://onlinestore.test-godaddy.com",reseller:{olsHost:"https://{websiteId}.onlinestore.test-secureserver.net",olsPublishedSiteHost:"https://{websiteId}.test-mysimplestore.com",olsAccountStatusHost:"https://onlinestore.test-secureserver.net"},noProductImage:"//onlinestore.wsimg.com/assets/themes/__master/assets/images/prod_no_image_padded.png",requestRetries:2,requestTimeout:{default:3e4,addToCart:15e3,loadProducts:1e4,loadProduct:25e3,loadSimilarProducts:1e4}},production:{olsHost:"https://{websiteId}.onlinestore.godaddy.com",olsPublishedSiteHost:"https://{websiteId}.mysimplestore.com",olsAccountStatusHost:"https://onlinestore.godaddy.com",reseller:{olsHost:"https://{websiteId}.onlinestore.secureserver.net",olsPublishedSiteHost:"https://{websiteId}.mysimplestore.com",olsAccountStatusHost:"https://onlinestore.secureserver.net"},noProductImage:"//onlinestore.wsimg.com/assets/themes/__master/assets/images/prod_no_image_padded.png",requestRetries:2,requestTimeout:{default:3e4,addToCart:15e3,loadProducts:1e4,loadProduct:25e3,loadSimilarProducts:1e4}}};const f={ACTIVE:"ACTIVE",SUSPENDED:"SUSPENDED",ABUSE_SUSPENDED:"ABUSE-SUSPENDED",CANCELLED:"CANCELLED",DB_SEEDED:"DB-SEEDED"};var b=new class extends i{constructor(){super(...arguments),this.state={olsHost:null,olsPublishedSiteHost:null,olsAccountStatusHost:null,noProductImage:null,requestTimeout:{},requestRetries:0,websiteId:null,olsAccountStatus:null,renderMode:null,env:null,fetchingAccount:!1,fetchingConfig:!1,defaultCategory:null,allProductsCategory:{},error:null,errorRetryable:!1,configWasSet:!1,configWasLoaded:!1,productSortingEnabled:!1,resourcesToPreload:{},i18n:{},subscribe_coupon:{},store_page_url:null,checkout_allowed:!0,provisionInProgress:!1,provisionTried:!1,buyNowEnabled:!1,freeShippingLabelEnabled:!1,freeShippingBannerEnabled:!1},(global._||guac.lodash).assign(this.state,this.defaultConfig()),this.register()}defaultConfig(){return{locale:"en-US",store_status:"LIVE",number:{format:{strip_insignificant_zeros:!1,pattern:"[\\d\\,]*(\\.[\\d\\,]+)?",precision:3,thousands_separator:",",significant:!1,decimal_mark:"."}},country_iso3:"USA",country_iso:"US",date_format:"%Y-%m-%d",categories_taxonomy_id:null,featured_products_taxon_permalink:null,defaultCategory:null,allProductsCategory:{},show_coupon:!1,fb_pixel_tracking:!1,tracks_fbe_pixel:!1,ga_ad_tracking:null,taxon_show_extended_details:!1,use_best_match:!1,store_name:null,freeShippingLabelEnabled:!1,freeShippingBannerEnabled:!1,buyNowEnabled:!1,stripe_config:{with_apple_pay:!1,apple_pay_on_cart:!1,apple_pay_on_product_detail:!1,with_payment_request:!1,publishable_key:null,reference_id:null},poynt_config:{application_id:null,business_id:null,sdk_url:null,with_apple_pay:!1},currency:{format:{symbol_first:!0,pattern:"[\\d\\,]*(\\.[\\d\\,]+)?",symbol:"$",precision:2,thousands_separator:",",decimal_mark:"."},code:"USD"},yotpo_config:{app_key:null,script_url:null},i18n:{},subscribe_coupon:{description:null,code:null}}}setState(e){(global._||guac.lodash).assign(this.state,e),this.emit("change")}getState(){return this.state}getCurrentCurrency(){return this.getState().currency.code}getSubscribeCoupon(){return this.getState().subscribe_coupon||{}}getStorePageUrl(){const{store_page_url:e}=this.getState();return e}getCheckoutAllowed(){return this.getState().checkout_allowed}getI18n(){return this.getState().i18n||{}}getWebsiteId(){return this.getState().websiteId}getApiBaseUrl(){const{renderMode:e,olsHost:t,olsPublishedSiteHost:s}=this.getState();return"PUBLISH"===e?s:t}isProvisioned(){const{olsAccountStatus:e,renderMode:t}=this.getState();return"PUBLISH"===t||(s=e,-1!==Object.values(f).indexOf(s));var s}provisionTried(){return this.getState().provisionTried}isProvisionInProgress(){return this.getState().provisionInProgress}getHostConfig(e){const{isReseller:t,env:s,websiteId:o}=e,r=g[s||"local"],n=t?r.reseller:r;return{olsHost:n.olsHost.replace("{websiteId}",o),olsPublishedSiteHost:n.olsPublishedSiteHost.replace("{websiteId}",o),olsAccountStatusHost:n.olsAccountStatusHost}}getDefaultCategory(){return this.getState().defaultCategory}getAllProductsInfo(){return this.getState().allProductsCategory||{}}register(){this.dispatchToken=d.register((e=>{const{action:t}=e,{data:s}=t,{i18n:o}=this.state;let r,n;switch(t.type){case h.SET_CONFIG:n=g[s.env||"local"],this.setState({...this.getHostConfig(s),noProductImage:n.noProductImage,requestTimeout:n.requestTimeout,requestRetries:n.requestRetries,websiteId:s.websiteId,olsAccountStatus:s.olsAccountStatus,renderMode:s.renderMode,env:s.env,configWasSet:!0});break;case h.UPDATE_I18N:this.setState({i18n:(global._||guac.lodash).merge(o,s.staticContent,s.i18n)});break;case h.LOAD_CONFIG:this.setState({fetchingConfig:!0,error:null,errorRetryable:!1});break;case h.LOAD_ACCOUNT_INFO:this.setState({fetchingAccount:!0,error:null,errorRetryable:!1});break;case h.START_PROVISION_ACCOUNT:this.setState({provisionInProgress:!0,error:null,errorRetryable:!1});break;case h.CONFIG_WAS_LOADED:this.setState({fetchingConfig:!1,locale:s.locale,store_status:s.store_status,olsAccountStatus:s.status,number:s.number,country_iso3:s.country_iso3,country_iso:s.country_iso,date_format:s.date_format,currency:s.currency,categories_taxonomy_id:s.categories_taxonomy_id,featured_products_taxon_permalink:s.featured_products_taxon_permalink,defaultCategory:s.default_category,allProductsCategory:s.all_products_category,show_coupon:s.show_coupon,fb_pixel_tracking:s.fb_pixel_tracking,tracks_fbe_pixel:s.tracks_fbe_pixel,ga_ad_tracking:s.ga_ad_tracking,taxon_show_extended_details:s.taxon_show_extended_details,use_best_match:s.use_best_match,store_name:s.store_name,stripe_config:s.stripe_config,poynt_config:s.poynt_config,resourcesToPreload:s.resources_to_preload||{},subscribe_coupon:s.subscribe_coupon,yotpo_config:s.yotpo_config||{app_key:null,script_url:null},configWasLoaded:!0,store_page_url:s.store_page_url,checkout_allowed:s.checkout_allowed,buyNowEnabled:s.buy_now_enabled,freeShippingLabelEnabled:s.free_shipping_label_enabled,freeShippingBannerEnabled:s.free_shipping_banner_enabled});break;case h.ERROR_LOADING_CONFIG:r=this.defaultConfig(),this.setState({fetchingConfig:!1,error:t.error,store_status:r.store_status,number:r.number,country_iso3:r.country_iso3,country_iso:r.country_iso,date_format:r.date_format,currency:r.currency});break;case h.ACCOUNT_INFO_WAS_LOADED:this.setState({fetchingAccount:!1,olsAccountStatus:s.status});break;case h.ERROR_LOADING_ACCOUNT_INFO:this.setState({fetchingAccount:!1,error:t.error});break;case h.TOGGLE_PRODUCT_SORTING:this.setState({productSortingEnabled:s});break;case h.ACCOUNT_PROVISIONED:this.setState({olsAccountStatus:f.ACTIVE,provisionInProgress:!1,provisionTried:!0});break;case h.ERROR_ACCOUNT_PROVISIONED:this.setState({provisionInProgress:!1,provisionTried:!0,error:t.error});break;case h.CLEAR_ERROR:this.setState({error:null})}}))}};e.A=d,e.E=i,e.O=b,e.a=p,e.b=h,e.d=_})),"undefined"!=typeof window&&(window.global=window);
//# sourceMappingURL=OlsConfigStore-52bf928d.js.map