define("@widget/LAYOUT/bs-CartIcon-Component-df8195f6.js",["radpack","exports","~/c/bs-_rollupPluginBabelHelpers","~/c/bs-ComponentPropTypes","~/c/bs-dataAids","~/c/bs-navigation","~/c/bs-index","~/bs-FlyoutMenu-Component"],(function(e,t,o,a,r,s,l,i){"use strict";class n extends(global.React||guac.react).Component{constructor(e){super(e),o._(this,"setupOlaCart",(async()=>{const{websiteId:e,rootDomain:t,env:o,renderMode:r}=this.props;if(!this.gopayCart)try{const s=!!window.sessionStorage;if(!await a.g({shouldUseCache:s,websiteId:e,rootDomain:t}))return;if(this.setState({olaGopayCartOn:!0}),r!==(global.Core||guac["@wsb/guac-widget-core"]).constants.renderModes.PUBLISH)return;this.gopayCart=await a.l.cartSetup({websiteId:e,env:o}),this.updateOlaStoreState(),this.gopayCartUnsubscribe=this.gopayCart.subscribe(this.updateOlaStoreState),a.h({cart:this.gopayCart,renderMode:r})}catch(e){this.gopayCart=null,this.setState({olaGopayCartOn:!1})}})),o._(this,"updateOlaStoreState",(()=>{if(!this.gopayCart)return;const{quantitiesByType:e}=this.gopayCart.getState(),t=e.service||0;this.setState({olaQuantity:t})})),o._(this,"updateOlsStoreState",(()=>{const{cart:e}=this._olsCoreUtils.CartStore.getState(),t=e?e.total_quantity:0,{olsQuantity:o}=this.state,a=this._olsCoreUtils.OlsConfigStore.isProvisioned();a!==this.state.olsProvisioned&&this.setState({olsProvisioned:a}),t!==o&&this.setState({olsQuantity:t},(()=>window.dispatchEvent(new Event("CartQuantityChange"))))})),o._(this,"onStoreChange",(()=>{const e=this._olsCoreUtils.OlsConfigStore.isProvisioned();!this.state.olsProvisioned&&e&&setTimeout((()=>{this._olsCoreUtils.CartActions.loadCart()}),0),this.updateOlsStoreState()})),o._(this,"forceReloadOlsCart",(()=>{setTimeout((()=>{this._olsCoreUtils.CartActions.loadCart()}),0)})),o._(this,"renderItemCount",(()=>{const e=a.a(this.props.category);return 0!==this.totalCartQuantity&&this._olsCoreUtils?(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Block,{style:{...e.wrapper,marginLeft:"!-6px"},"data-aid":r.D.CART_ICON_COUNT},(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Details.Minor,{style:{...e.count,color:"inherit"},featured:!0},this._olsCoreUtils.NumberFormatter.toFormattedNumber(this.totalCartQuantity))):null})),o._(this,"handleOlsClick",(()=>{this._olsCoreUtils.RouteHandler.navigate(this._olsCoreUtils.ShopViewConstants.CART),this._olsCoreUtils.ScrollWidgetActions.scrollShopWidget()})),o._(this,"getOlsLinkProps",(()=>{if(!this.isPublishMode)return{};const{isShopPage:e,shopPageId:t,shopRoute:o,domainName:a,renderMode:r,pageRoute:l}=this.props;return e?{onClick:this.handleOlsClick,href:"#",convertToAbsolute:!1}:{href:`${o}?${s.C}`,"data-page":t,"data-page-query":s.C,renderMode:r,domainName:a,pageRoute:l}})),o._(this,"getOlaLinkProps",(()=>this.isPublishMode?{onClick:()=>this.gopayCart.toggle(),href:"#"}:{})),o._(this,"getIconLinkProps",(()=>this.isPublishMode?this.enabledForOls&&!this.enabledForOla?this.getOlsLinkProps():this.enabledForOla&&!this.enabledForOls?this.getOlaLinkProps():{}:{})),o._(this,"renderDropdown",(()=>{const{staticContent:e={},sidebarWidth:t}=this.props,{olaQuantity:s,olsQuantity:l}=this.state,i={dropdown:{position:"absolute",right:"0",top:"large",whiteSpace:"nowrap",maxHeight:"45vh",overflowY:"auto",display:"none",zIndex:"20",listStyle:"none","@md":t?{right:"auto",top:"auto",left:"0",bottom:"large"}:{}},listItem:{display:"block",textAlign:"left",marginBottom:"0"},link:{display:"flex",alignItems:"center"},separator:{marginTop:"small",marginBottom:"small"},countLabel:{marginLeft:"xsmall"}},n=a.a(this.props.category);return(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Dropdown,{section:"default",tag:"ul",role:"menu",id:this.dropdownToggleId,style:i.dropdown,"data-aid":r.D.CART_DROPDOWN_RENDERED},(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.ListItem,{tag:"li",role:"menuitem",key:"cart-dropdown-ols-item",style:i.listItem},(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Link,o.a({},this.getOlsLinkProps(),{style:i.link}),(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Block,{style:n.wrapper},(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Details.Minor,{style:n.count,featured:!0},l)),(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Details,{style:i.countLabel},e.cartProducts))),(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.ListItem,{style:i.listItem},(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.HR,{style:i.separator})),(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.ListItem,{tag:"li",role:"menuitem",key:"cart-dropdown-ola-item",style:i.listItem},(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Link,o.a({},this.getOlaLinkProps(),{style:i.link}),(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Block,{style:n.wrapper},(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Details.Minor,{style:n.count,featured:!0},s)),(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Details,{style:i.countLabel},e.cartServices))))})),o._(this,"cartRouter",(()=>{const{staticContent:e={}}=this.props,t={menu:{position:"relative"},link:{display:"flex",alignItems:"center",cursor:this.isPublishMode?"pointer":"not-allowed"}};return this.shouldRenderDropdown?(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Block,{style:t.menu},(global.React||guac.react).createElement(i.default,{renderCustomContent:(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Block,{style:t.link},this.renderIcon(),this.renderItemCount()),toggleId:this.dropdownToggleId,dataAid:r.D.CART_ICON_RENDER,renderMode:this.props.renderMode}),this.renderDropdown()):(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Link,o.a({style:t.link,"aria-label":e.cartIcon||"Shopping Cart Icon",convertToAbsolute:!0},this.getIconLinkProps()),this.renderIcon(),this.renderItemCount())})),this.state={olsQuantity:0,olaQuantity:0,olsProvisioned:!1,olaGopayCartOn:!1},this.dropdownToggleId="cart-dropdown-"+ +new Date}componentDidMount(){this.enabledForOls&&(this._olsCorePromise=new Promise((function(t,o){e.require(["@wsb/guac-widget-shared@^1/lib/common/ols-core/core-bundle"],t,o)})).then((e=>{let{NumberFormatter:t,RouteHandler:o,ShopViewConstants:a,CartStore:r,CartActions:s,OlsConfigStore:l,OlsConfigActions:i,ScrollWidgetActions:n}=e;this._unmounted||(this._olsCoreUtils={NumberFormatter:t,RouteHandler:o,ShopViewConstants:a,CartStore:r,CartActions:s,OlsConfigStore:l,OlsConfigActions:i,ScrollWidgetActions:n},this.updateOlsStoreState(),window.addEventListener("forceOlsCartIconReload",this.forceReloadOlsCart),r.addListener("change",this.onStoreChange),l.addListener("change",this.onStoreChange),i.setConfig(this.props),i.loadConfig(),l.isProvisioned()&&s.loadCart())}))),this.hasOlaWidget&&this.setupOlaCart()}componentWillUnmount(){this._unmounted=!0,this.enabledForOls&&(this._olsCoreUtils?.CartStore.removeListener("change",this.onStoreChange),this._olsCoreUtils?.OlsConfigStore.removeListener("change",this.onStoreChange),window.removeEventListener("forceOlsCartIconReload",this.forceReloadOlsCart)),this.enabledForOla&&this.gopayCart&&this.gopayCartUnsubscribe&&this.gopayCartUnsubscribe()}get hasOlaWidget(){return!!this.props.appointmentsPageId}get enabledForOls(){return!!this.props.shopPageId}get enabledForOla(){return this.hasOlaWidget&&this.state.olaGopayCartOn}get shouldRender(){return this.enabledForOls||this.enabledForOla}get totalCartQuantity(){const{olsQuantity:e,olaQuantity:t}=this.state;return e+t}get isPublishMode(){return this.props.renderMode===(global.Core||guac["@wsb/guac-widget-core"]).constants.renderModes.PUBLISH}get shouldRenderDropdown(){return this.enabledForOls&&this.enabledForOla&&this.isPublishMode}renderIcon(){const{cartStyles:e}=this.props;return(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Icon,{icon:"cart1",style:e,"data-aid":r.D.CART_ICON_RENDER,size:l.I,minTarget:!0})}render(){if(!this.shouldRender)return null;return(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Block,{style:{display:"flex",alignItems:"center",fontSize:"xsmall"},children:this.cartRouter()})}}n.propTypes=a.C,t.default=n,Object.defineProperty(t,"__esModule",{value:!0})})),"undefined"!=typeof window&&(window.global=window);
//# sourceMappingURL=bs-CartIcon-Component-df8195f6.js.map