define("@widget/LAYOUT/bs-Hamburger-Component-00199ec8.js",["exports","~/c/bs-_rollupPluginBabelHelpers","~/c/bs-Toggle","~/c/bs-dataAids","~/c/bs-index","~/c/bs-navigationDrawer"],(function(e,t,o,s,n,i){"use strict";const{PUBLISH:a}=(global.Core||guac["@wsb/guac-widget-core"]).constants.renderModes;class r extends(global.React||guac.react).Component{constructor(){super(...arguments),t._(this,"onLoad",(()=>{window.addEventListener("resize",this.onResize)})),t._(this,"onResize",(()=>{this.offsetLeft=this.toggleTarget?.offsetLeft,this.setNavigationOffset()})),t._(this,"setNavigationOffset",(()=>{const{open:e}=this.state;this.toggleTarget&&void 0!==this.offsetLeft&&(this.toggleTarget.style.cssText=`\n          visibility: visible;\n          transform: ${e?`translateX(-${this.offsetLeft}px)`:`translateX(${i.N})`};\n        `)})),t._(this,"toggleMobileTouchScrolling",(()=>{const{open:e}=this.state;e?document.body.style.setProperty("overflow","hidden"):document.body.style.setProperty("overflow","initial")})),this.handleChange=(global._||guac.lodash).throttle(this.handleChange.bind(this),100,{leading:!1}),this.state={open:!1}}componentDidMount(){this.toggleTarget=document.getElementById(this.props.toggleId),this.offsetLeft=this.toggleTarget?.offsetLeft,"undefined"!=typeof window&&window.addEventListener("load",this.onLoad)}componentDidUpdate(e,t){let{open:o}=t;const{isMobile:s}=this.props;o!==this.state.open&&("undefined"!=typeof window&&window.dispatchEvent(new Event("NavigationDrawer"+(this.state.open?"Opened":"Closed"))),this.toggleTarget&&(this.setNavigationOffset(),s&&this.props.renderMode===a&&this.toggleMobileTouchScrolling()))}componentWillUnmount(){"undefined"!=typeof window&&(window.removeEventListener("load",this.onLoad),window.removeEventListener("resize",this.onResize))}handleChange(e){this.setState({open:e})}renderIcon(){const{icon:e,openIcon:t}=this.props,{open:o}=this.state;return o&&"close"===t?(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.CloseIcon,{size:n.I}):(global.React||guac.react).createElement((global.Core||guac["@wsb/guac-widget-core"]).UX2.Element.Icon.Hamburger,{icon:o?t:e,size:n.I,minTarget:!0})}render(){const e=(global._||guac.lodash).omit(this.props,["Component","renderMode"]),{style:n,staticContent:i={}}=e;return(global.React||guac.react).createElement(o.T,t.a({},e,{onChange:this.handleChange,closeAttr:"data-close","data-edit-interactive":!0,closeOnOutsideClick:!0,style:{border:0,justifyContent:"flex-start",...n},"data-aid":s.D.HAMBURGER_MENU_LINK,"aria-label":i.hamburgerIcon||"Hamburger Site Navigation Icon"}),this.renderIcon())}}r.propTypes={toggleId:(global.PropTypes||guac["prop-types"]).string.isRequired,uniqueId:(global.PropTypes||guac["prop-types"]).string.isRequired,icon:(global.PropTypes||guac["prop-types"]).string,openIcon:(global.PropTypes||guac["prop-types"]).string,style:(global.PropTypes||guac["prop-types"]).object,staticContent:(global.PropTypes||guac["prop-types"]).object,isMobile:(global.PropTypes||guac["prop-types"]).bool,renderMode:(global.PropTypes||guac["prop-types"]).string},r.defaultProps={icon:"hamburger",openIcon:"hamburger",style:{},staticContent:{},isMobile:!0},e.default=r,Object.defineProperty(e,"__esModule",{value:!0})})),"undefined"!=typeof window&&(window.global=window);
//# sourceMappingURL=bs-Hamburger-Component-00199ec8.js.map