(function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=14)})([function(e,t,n){!function(e,n){n(t)}(this,function(e){function t(e,t,n){this.nodeName=e,this.attributes=t,this.children=n,this.key=t&&t.key}function n(e,n){var r,o,i,a,u;for(u=arguments.length;u-- >2;)F.push(arguments[u]);for(n&&n.children&&(F.length||F.push(n.children),delete n.children);F.length;)if((i=F.pop())instanceof Array)for(u=i.length;u--;)F.push(i[u]);else null!=i&&i!==!0&&i!==!1&&("number"==typeof i&&(i=String(i)),a="string"==typeof i,a&&o?r[r.length-1]+=i:((r||(r=[])).push(i),o=a));var s=new t(e,n||void 0,r||I);return W.vnode&&W.vnode(s),s}function r(e,t){if(t)for(var n in t)e[n]=t[n];return e}function o(e){return r({},e)}function i(e,t){for(var n=t.split("."),r=0;r<n.length&&e;r++)e=e[n[r]];return e}function a(e){return"function"==typeof e}function u(e){return"string"==typeof e}function s(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function l(e,t){return n(e.nodeName,r(o(e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function c(e,t,n){var r=t.split(".");return function(t){for(var o=t&&t.target||this,a={},s=a,l=u(n)?i(t,n):o.nodeName?o.type.match(/^che|rad/)?o.checked:o.value:t,c=0;c<r.length-1;c++)s=s[r[c]]||(s[r[c]]=!c&&e.state[r[c]]||{});s[r[c]]=l,e.setState(a)}}function p(e){!e._dirty&&(e._dirty=!0)&&1==Q.push(e)&&(W.debounceRendering||G)(f)}function f(){var e,t=Q;for(Q=[];e=t.pop();)e._dirty&&L(e)}function d(e){var t=e&&e.nodeName;return t&&a(t)&&!(t.prototype&&t.prototype.render)}function h(e,t){return e.nodeName(m(e),t||z)}function y(e,t){return u(t)?e instanceof Text:u(t.nodeName)?!e._componentConstructor&&b(e,t.nodeName):a(t.nodeName)?!e._componentConstructor||e._componentConstructor===t.nodeName||d(t):void 0}function b(e,t){return e.normalizedNodeName===t||V(e.nodeName)===V(t)}function m(e){var t=o(e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function v(e){var t=e.parentNode;t&&t.removeChild(e)}function _(e,t,n,r,o){if("className"===t&&(t="class"),"class"===t&&r&&"object"==typeof r&&(r=s(r)),"key"===t);else if("class"!==t||o)if("style"===t){if((!r||u(r)||u(n))&&(e.style.cssText=r||""),r&&"object"==typeof r){if(!u(n))for(var i in n)i in r||(e.style[i]="");for(var i in r)e.style[i]="number"!=typeof r[i]||q[i]?r[i]:r[i]+"px"}}else if("dangerouslySetInnerHTML"===t)r&&(e.innerHTML=r.__html||"");else if("o"==t[0]&&"n"==t[1]){var l=e._listeners||(e._listeners={});t=V(t.substring(2)),r?l[t]||e.addEventListener(t,w,!!J[t]):l[t]&&e.removeEventListener(t,w,!!J[t]),l[t]=r}else if("list"!==t&&"type"!==t&&!o&&t in e)g(e,t,null==r?"":r),null!=r&&r!==!1||e.removeAttribute(t);else{var c=o&&t.match(/^xlink\:?(.+)/);null==r||r===!1?c?e.removeAttributeNS("http://www.w3.org/1999/xlink",V(c[1])):e.removeAttribute(t):"object"==typeof r||a(r)||(c?e.setAttributeNS("http://www.w3.org/1999/xlink",V(c[1]),r):e.setAttribute(t,r))}else e.className=r||""}function g(e,t,n){try{e[t]=n}catch(e){}}function w(e){return this._listeners[e.type](W.event&&W.event(e)||e)}function O(e){if(v(e),e instanceof Element){e._component=e._componentConstructor=null;var t=e.normalizedNodeName||V(e.nodeName);(K[t]||(K[t]=[])).push(e)}}function E(e,t){var n=V(e),r=K[n]&&K[n].pop()||(t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e));return r.normalizedNodeName=n,r}function k(){for(var e;e=X.pop();)W.afterMount&&W.afterMount(e),e.componentDidMount&&e.componentDidMount()}function P(e,t,n,r,o,i){Z++||($=o&&"undefined"!=typeof o.ownerSVGElement,ee=e&&!(H in e));var a=C(e,t,n,r);return o&&a.parentNode!==o&&o.appendChild(a),--Z||(ee=!1,i||k()),a}function C(e,t,n,r){for(var o=t&&t.attributes&&t.attributes.ref;d(t);)t=h(t,n);if(null==t&&(t=""),u(t))return e&&e instanceof Text&&e.parentNode?e.nodeValue!=t&&(e.nodeValue=t):(e&&j(e),e=document.createTextNode(t)),e;if(a(t.nodeName))return R(e,t,n,r);var i=e,s=String(t.nodeName),l=$,c=t.children;if($="svg"===s||"foreignObject"!==s&&$,e){if(!b(e,s)){for(i=E(s,$);e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),j(e)}}else i=E(s,$);var p=i.firstChild,f=i[H];if(!f){i[H]=f={};for(var y=i.attributes,m=y.length;m--;)f[y[m].name]=y[m].value}return!ee&&c&&1===c.length&&"string"==typeof c[0]&&p&&p instanceof Text&&!p.nextSibling?p.nodeValue!=c[0]&&(p.nodeValue=c[0]):(c&&c.length||p)&&T(i,c,n,r,!!f.dangerouslySetInnerHTML),N(i,t.attributes,f),o&&(f.ref=o)(i),$=l,i}function T(e,t,n,r,o){var i,a,u,s,l=e.childNodes,c=[],p={},f=0,d=0,h=l.length,b=0,m=t&&t.length;if(h)for(var _=0;_<h;_++){var g=l[_],w=g[H],O=m?(a=g._component)?a.__key:w?w.key:null:null;null!=O?(f++,p[O]=g):(ee||o||w||g instanceof Text)&&(c[b++]=g)}if(m)for(var _=0;_<m;_++){u=t[_],s=null;var O=u.key;if(null!=O)f&&O in p&&(s=p[O],p[O]=void 0,f--);else if(!s&&d<b)for(i=d;i<b;i++)if(a=c[i],a&&y(a,u)){s=a,c[i]=void 0,i===b-1&&b--,i===d&&d++;break}s=C(s,u,n,r),s&&s!==e&&(_>=h?e.appendChild(s):s!==l[_]&&(s===l[_+1]&&v(l[_]),e.insertBefore(s,l[_]||null)))}if(f)for(var _ in p)p[_]&&j(p[_]);for(;d<=b;)s=c[b--],s&&j(s)}function j(e,t){var n=e._component;if(n)D(n,!t);else{e[H]&&e[H].ref&&e[H].ref(null),t||O(e);for(var r;r=e.lastChild;)j(r,t)}}function N(e,t,n){var r;for(r in n)t&&r in t||null==n[r]||_(e,r,n[r],n[r]=void 0,$);if(t)for(r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||_(e,r,n[r],n[r]=t[r],$)}function x(e){var t=e.constructor.name,n=te[t];n?n.push(e):te[t]=[e]}function S(e,t,n){var r=new e(t,n),o=te[e.name];if(A.call(r,t,n),o)for(var i=o.length;i--;)if(o[i].constructor===e){r.nextBase=o[i].nextBase,o.splice(i,1);break}return r}function M(e,t,n,r,o){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||o?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&W.syncComponentUpdates===!1&&e.base?p(e):L(e,1,o)),e.__ref&&e.__ref(e))}function L(e,t,n,i){if(!e._disable){var u,s,l,c,p=e.props,f=e.state,y=e.context,b=e.prevProps||p,v=e.prevState||f,_=e.prevContext||y,g=e.base,w=e.nextBase,O=g||w,E=e._component;if(g&&(e.props=b,e.state=v,e.context=_,2!==t&&e.shouldComponentUpdate&&e.shouldComponentUpdate(p,f,y)===!1?u=!0:e.componentWillUpdate&&e.componentWillUpdate(p,f,y),e.props=p,e.state=f,e.context=y),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!u){for(e.render&&(s=e.render(p,f,y)),e.getChildContext&&(y=r(o(y),e.getChildContext()));d(s);)s=h(s,y);var C,T,N=s&&s.nodeName;if(a(N)){var x=m(s);l=E,l&&l.constructor===N&&x.key==l.__key?M(l,x,1,y):(C=l,l=S(N,x,y),l.nextBase=l.nextBase||w,l._parentComponent=e,e._component=l,M(l,x,0,y),L(l,1,n,!0)),T=l.base}else c=O,C=E,C&&(c=e._component=null),(O||1===t)&&(c&&(c._component=null),T=P(c,s,y,n||!g,O&&O.parentNode,!0));if(O&&T!==O&&l!==E){var R=O.parentNode;R&&T!==R&&(R.replaceChild(T,O),C||(O._component=null,j(O)))}if(C&&D(C,T!==O),e.base=T,T&&!i){for(var A=e,U=e;U=U._parentComponent;)(A=U).base=T;T._component=A,T._componentConstructor=A.constructor}}!g||n?X.unshift(e):u||(e.componentDidUpdate&&e.componentDidUpdate(b,v,_),W.afterUpdate&&W.afterUpdate(e));var F,I=e._renderCallbacks;if(I)for(;F=I.pop();)F.call(e);Z||i||k()}}function R(e,t,n,r){for(var o=e&&e._component,i=o,a=e,u=o&&e._componentConstructor===t.nodeName,s=u,l=m(t);o&&!s&&(o=o._parentComponent);)s=o.constructor===t.nodeName;return o&&s&&(!r||o._component)?(M(o,l,3,n,r),e=o.base):(i&&!u&&(D(i,!0),e=a=null),o=S(t.nodeName,l,n),e&&!o.nextBase&&(o.nextBase=e,a=null),M(o,l,1,n,r),e=o.base,a&&e!==a&&(a._component=null,j(a))),e}function D(e,t){W.beforeUnmount&&W.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var r=e._component;if(r)D(r,t);else if(n){n[H]&&n[H].ref&&n[H].ref(null),e.nextBase=n,t&&(v(n),x(e));for(var o;o=n.lastChild;)j(o,!t)}e.__ref&&e.__ref(null),e.componentDidUnmount&&e.componentDidUnmount()}function A(e,t){this._dirty=!0,this.context=t,this.props=e,this.state||(this.state={})}function U(e,t,n){return P(n,e,{},!1,t)}var W={},F=[],I=[],Y={},V=function(e){return Y[e]||(Y[e]=e.toLowerCase())},B="undefined"!=typeof Promise&&Promise.resolve(),G=B?function(e){B.then(e)}:setTimeout,z={},H="undefined"!=typeof Symbol?Symbol.for("preactattr"):"__preactattr_",q={boxFlex:1,boxFlexGroup:1,columnCount:1,fillOpacity:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,fontWeight:1,lineClamp:1,lineHeight:1,opacity:1,order:1,orphans:1,strokeOpacity:1,widows:1,zIndex:1,zoom:1},J={blur:1,error:1,focus:1,load:1,resize:1,scroll:1},Q=[],K={},X=[],Z=0,$=!1,ee=!1,te={};r(A.prototype,{linkState:function(e,t){var n=this._linkedStates||(this._linkedStates={});return n[e+t]||(n[e+t]=c(this,e,t))},setState:function(e,t){var n=this.state;this.prevState||(this.prevState=o(n)),r(n,a(e)?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),p(this)},forceUpdate:function(){L(this,2)},render:function(){}}),e.h=n,e.cloneElement=l,e.Component=A,e.render=U,e.rerender=f,e.options=W})},function(e,t,n){"use strict";function r(e,t,n){console.warn("Using deprecated function: requests.post");var r;return r="string"==typeof t?t:o(t),fetch(e+"?"+r,{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:n?JSON.stringify(n):null}).then(function(e){return e.text()})}function o(e){var t=[];for(var n in e)t.push(n+"="+e[n]);return t.join("&")}function i(e,t,n){return console.warn("Using deprecated function: requests.postMicropub"),fetch(e,{method:"POST",headers:{Authorization:"Bearer "+n},body:new FormData(t)}).then(function(e){return e.text()})}function a(e,t,n){return fetch(e,{method:"POST",headers:{Authorization:"Bearer "+n},body:u(t)}).then(function(e){return e.text()})}function u(e){var t=new FormData;for(var n in e)Array.isArray(e[n])?e[n].forEach(function(e,r){t.append(n,e)}):t.append(n,e[n]);return t}Object.defineProperty(t,"__esModule",{value:!0}),t.post=r,t.getParamString=o,t.postMicropub=i,t.postFormData=a,t.formDataFromObject=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.NEW_NOTE="new-note",t.PAGE_REPLY="page-reply",t.ITEM_REPLY="item-reply"},function(e,t,n){"use strict";function r(e){e.preventDefault(),e.target.href&&chrome.tabs.create({url:e.target.href})}function o(){return new Promise(function(e,t){chrome.tabs.query({active:!0,currentWindow:!0},function(n){if(!n.length)return t();var r=n[0].url;e(r.split("?")[0])})})}function i(e){return JSON.parse(JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0}),t.openLink=r,t.getCurrentTabUrl=o,t.clone=i},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),l=n(11),c=r(l),p=n(10),f=r(p),d=n(9),h=r(d),y=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.displayMessage=function(e){n.setState({currentView:"feedback",message:e})},n.handleLogout=function(){localStorage.clear(),n.setState({currentView:"login"})},n.isAuthenticated()?n.setState({currentView:"new-note"}):n.setState({currentView:"login"}),n}return a(t,e),u(t,[{key:"render",value:function(){switch(this.state.currentView){case"login":return(0,s.h)(c.default,null);case"feedback":return(0,s.h)(h.default,null,this.state.message);default:return(0,s.h)(f.default,{handleLogout:this.handleLogout,userFeedback:this.displayMessage})}}},{key:"isAuthenticated",value:function(){return!!localStorage.getItem("token")}}]),t}(s.Component);t.default=y},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),s=n(2),l=function(e){function t(){var e,n,i,a;r(this,t);for(var u=arguments.length,l=Array(u),c=0;c<u;c++)l[c]=arguments[c];return n=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),i.handleClick=function(e){e.preventDefault();var t={};t[s.NEW_NOTE]=s.PAGE_REPLY,t[s.PAGE_REPLY]=s.NEW_NOTE,t[s.ITEM_REPLY]=s.PAGE_REPLY,i.props.onChange(t[i.props.postType])},a=n,o(i,a)}return i(t,e),a(t,[{key:"render",value:function(){return(0,u.h)("button",{className:"button-link button-small",onClick:this.handleClick},this.getText())}},{key:"getText",value:function(){var e={};return e[s.NEW_NOTE]="Reply to current page",e[s.PAGE_REPLY]="Create new note",e[s.ITEM_REPLY]="Reply to current page",e[this.props.postType]}}]),t}(u.Component);t.default=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),s=function(e){function t(){var e,n,i,a;r(this,t);for(var u=arguments.length,s=Array(u),l=0;l<u;l++)s[l]=arguments[l];return n=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),i.handleClick=function(e){e.preventDefault(),i.props.onLogout()},a=n,o(i,a)}return i(t,e),a(t,[{key:"render",value:function(){return(0,u.h)("footer",{className:"footer"},(0,u.h)("div",null,"Authenticated to ",(0,u.h)("strong",null,this.props.domain)),(0,u.h)("button",{className:"button-link",onClick:this.handleClick},"Logout"))}}]),t}(u.Component);t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),s=n(3),l=function(e){function t(){var e,n,i,a;r(this,t);for(var u=arguments.length,s=Array(u),l=0;l<u;l++)s[l]=arguments[l];return n=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),i.onSubmit=function(e){e.preventDefault(),i.props.onSubmit(i.props.entry)},a=n,o(i,a)}return i(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.content.focus()},150)}},{key:"render",value:function(){var e=this;return(0,u.h)("form",{onSubmit:this.onSubmit},(0,u.h)("div",null,(0,u.h)("label",{for:"input-content"},"Content"),(0,u.h)("textarea",{id:"input-content",value:this.props.entry.content,onChange:this.updateField("content"),rows:"4",disabled:this.props.isDisabled,ref:function(t){e.content=t}})),(0,u.h)("div",null,(0,u.h)("label",{for:"input-tags"},"Tags"),(0,u.h)("input",{id:"input-tags",type:"text",placeholder:"e.g. web, personal",value:this.props.entry.tags.join(" "),onChange:this.updateFieldArray("tags"),disabled:this.props.isDisabled})),(0,u.h)("div",null,(0,u.h)("label",{for:"input-slug"},"Slug"),(0,u.h)("input",{id:"input-slug",type:"text",name:"mp-slug",value:this.props.entry["mp-slug"],onChange:this.updateField("mp-slug"),disabled:this.props.isDisabled})),(0,u.h)("button",{type:"submit",disabled:this.props.isDisabled},"Post"))}},{key:"updateField",value:function(e){var t=this;return function(n){n.preventDefault();var r=(0,s.clone)(t.props.entry);r[e]=n.target.value,t.props.updateEntry(r)}}},{key:"updateFieldArray",value:function(e){var t=this;return function(n){n.preventDefault();var r=(0,s.clone)(t.props.entry);r[e]=n.target.value.trim().split(" "),t.props.updateEntry(r)}}}]),t}(u.Component);t.default=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),s=n(2),l=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),a(t,[{key:"render",value:function(){return(0,u.h)("header",{className:this.getClass()},(0,u.h)("div",null,this.getMessage(),this.props.url?(0,u.h)("div",{class:"metadata"},this.props.url):null),this.renderQuickActions())}},{key:"getClass",value:function(){var e={};return e[s.NEW_NOTE]="header header--new",e[s.PAGE_REPLY]="header header--page",e[s.ITEM_REPLY]="header header--item",e[this.props.postType]}},{key:"getMessage",value:function(){var e={};return e[s.NEW_NOTE]="New Note",e[s.PAGE_REPLY]="Reply to current page",e[s.ITEM_REPLY]="Reply to selected item",e[this.props.postType]}},{key:"renderQuickActions",value:function(){return this.props.url?(0,u.h)("ul",{className:"quick-actions"},(0,u.h)("li",null,(0,u.h)("button",{onClick:this.props.onRepost},"repost")),(0,u.h)("li",null,(0,u.h)("button",{onClick:this.props.onLike},"like"))):null}}]),t}(u.Component);t.default=l},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),s=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),a(t,[{key:"componentDidMount",value:function(){setTimeout(function(){window.close()},2e3)}},{key:"render",value:function(){return(0,u.h)("div",{className:"header header--new"},this.props.children)}}]),t}(u.Component);t.default=s},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),l=n(8),c=r(l),p=n(5),f=r(p),d=n(7),h=r(d),y=n(6),b=r(y),m=n(1),v=n(3),_=n(2),g=function(e){function t(e){o(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleLike=function(){n.state.url&&n.postEntry({h:"entry","like-of":n.state.url}).then(function(){var e=n.state.postType===_.ITEM_REPLY?"Item":"Page";n.props.userFeedback(e+" liked successfully")})},n.handleRepost=function(){n.state.url&&n.postEntry({h:"entry","repost-of":n.state.url}).then(function(){var e=n.state.postType===_.ITEM_REPLY?"Item":"Page";n.props.userFeedback(e+" reposted successfully")})},n.updateEntry=function(e){n.setState({entry:e})},n.handleSubmit=function(e){n.state.postType!==_.NEW_NOTE&&(e["in-reply-to"]=n.state.url),n.postEntry(e).then(function(){var e=n.state.postType===_.NEW_NOTE?"Note":"Reply";n.props.userFeedback(e+" posted successfully")})},n.changeView=function(e){e==_.PAGE_REPLY?(0,v.getCurrentTabUrl)().then(function(t){n.setState({url:t,postType:e})}):n.setState({url:null,postType:e})},n.state={postType:_.NEW_NOTE,url:null,userDomain:localStorage.getItem("domain"),entry:{h:"entry",content:"",tags:[],"mp-slug":""},isDisabled:!1},n}return a(t,e),u(t,[{key:"render",value:function(){return(0,s.h)("div",null,(0,s.h)(c.default,{postType:this.state.postType,url:this.state.url,onLike:this.handleLike,onRepost:this.handleRepost}),(0,s.h)("div",{className:"container"},(0,s.h)("div",{className:"text-right"},(0,s.h)(f.default,{postType:this.state.postType,onChange:this.changeView})),(0,s.h)(h.default,{entry:this.state.entry,updateEntry:this.updateEntry,onSubmit:this.handleSubmit,isDisabled:this.state.isDisabled})),(0,s.h)(b.default,{domain:this.state.userDomain,onLogout:this.props.handleLogout}))}},{key:"postEntry",value:function(e){var t=localStorage.getItem("micropubEndpoint"),n=localStorage.getItem("token");return this.setState({isDisabled:!0}),(0,m.postFormData)(t,e,n)}}]),t}(s.Component);t.default=g},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),s=n(3),l=n(12),c=function(e){function t(){var e,n,i,a;r(this,t);for(var u=arguments.length,s=Array(u),c=0;c<u;c++)s[c]=arguments[c];return n=i=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),i.handleChange=function(e){i.setState({domain:e.target.value})},i.handleSubmit=function(e){e.preventDefault(),i.setState({isLoading:!0}),(0,l.fetchSiteMetadata)(i.state.domain).then(function(e){if(!e.authEndpoint||!e.tokenEndpoint||!e.micropub)return i.setState({hasErrors:!0});var t=e.authEndpoint+"?"+i.getFields(i.state.domain);chrome.runtime.sendMessage({action:"begin-auth",payload:{authUrl:t,domain:i.state.domain,metadata:e}})})},a=n,o(i,a)}return i(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.input.focus()},150)}},{key:"render",value:function(){var e=this;return(0,u.h)("form",{class:"container",method:"GET",onSubmit:this.handleSubmit},(0,u.h)("p",null,"To use Omnibear, sign in with your domain. Your website will need to support"," ",(0,u.h)("a",{href:"http://indieweb.org/micropub",onClick:s.openLink},"Micropub")," ","for creating new posts."),(0,u.h)("div",{class:"fields-inline"},(0,u.h)("input",{type:"text",name:"me",placeholder:"https://example.com",className:"fields-inline__fill",value:this.state.domain,onChange:this.handleChange,ref:function(t){return e.input=t}}),(0,u.h)("button",{type:"submit",disabled:this.state.isLoading},"Sign in")))}},{key:"getFields",value:function(e){return["redirect_uri=http://omnibear.com/auth/success/","client_id=http://omnibear.com","response_type=code","scope=create","me="+e].join("&")}}]),t}(u.Component);t.default=c},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=e.querySelector('link[rel="'+t+'"]');return n?n.href:null}function i(e){return fetch(e).then(function(e){return e.text()}).then(function(e){var t=document.createElement("html");return t.innerHTML=e,{authEndpoint:o(t,"authorization_endpoint"),tokenEndpoint:o(t,"token_endpoint"),micropub:o(t,"micropub")}})}var a;e.exports=(a={getLinkValue:o},r(a,"getLinkValue",o),r(a,"fetchSiteMetadata",i),a)},,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=n(0),i=n(4),a=r(i);document.addEventListener("DOMContentLoaded",function(){(0,o.render)((0,o.h)(a.default,null),document.body)})}]);
//# sourceMappingURL=index.js.map