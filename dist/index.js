/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

!function(global, factory) {
     true ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var children, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !0 && child !== !1) {
            if ('number' == typeof child) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                (children || (children = [])).push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent && 'undefined' != typeof parent.ownerSVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var ref = vnode && vnode.attributes && vnode.attributes.ref;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text && dom.parentNode) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        if (ref) (props.ref = ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
//# sourceMappingURL=preact.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openLink = openLink;
exports.clone = clone;
exports.getAuthTab = getAuthTab;
exports.logout = logout;
exports.generateSlug = generateSlug;
function openLink(e) {
  e.preventDefault();
  if (e.target.href) {
    chrome.tabs.create({ url: e.target.href });
  }
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getAuthTab() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({ url: 'https://omnibear.com/auth/success*' }, function (tabs) {
      if (tabs.length) {
        resolve(tabs[0]);
      } else {
        reject('Auth tab not found');
      }
    });
  });
}

function logout() {
  var items = ['token', 'domain', 'authEndpoint', 'tokenEndpoint', 'micropubEndpoint'];
  items.map(function (item) {
    return localStorage.removeItem(item);
  });
}

var NON_ALPHANUM = /[^A-Za-z0-9\-]/g;
var FROM = 'áäâàãåčçćďéěëèêẽĕȇęėíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
var TO = 'aaaaaacccdeeeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';

function generateSlug(content) {
  var formatted = content.toLocaleLowerCase().trim();
  formatted = formatted.replace(/\s/g, '-');
  for (var i = 0, l = FROM.length; i < l; i++) {
    formatted = formatted.replace(new RegExp(FROM.charAt(i), 'g'), TO.charAt(i));
  }
  formatted = formatted.replace(NON_ALPHANUM, '');
  formatted = formatted.replace(/\-\-+/g, '-');
  var parts = formatted.split('-');
  return parts.splice(0, 6).join('-');
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NEW_NOTE = exports.NEW_NOTE = 'new-note';
var PAGE_REPLY = exports.PAGE_REPLY = 'page-reply';
var ITEM_REPLY = exports.ITEM_REPLY = 'item-reply';

var MESSAGE_SUCCESS = exports.MESSAGE_SUCCESS = 'success';
var MESSAGE_ERROR = exports.MESSAGE_ERROR = 'error';

var DEFAULT_REACJI = exports.DEFAULT_REACJI = ['👍', '👎', '🎉', '😆', '😢', '😠'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _micropubHelper = __webpack_require__(14);

var _micropubHelper2 = _interopRequireDefault(_micropubHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _micropubHelper2.default({
  clientId: 'https://omnibear.com',
  redirectUri: 'https://omnibear.com/auth/success/',
  state: 'very-secret-omnibear-state',
  me: localStorage.getItem('domain'),
  authEndpoint: localStorage.getItem('authEndpoint'),
  tokenEndpoint: localStorage.getItem('tokenEndpoint'),
  micropubEndpoint: localStorage.getItem('micropubEndpoint'),
  token: localStorage.getItem('token')
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _constants = __webpack_require__(2);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
  }

  _createClass(Message, [{
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'div',
        { className: this.getClass() },
        this.props.children,
        this.props.location ? (0, _preact.h)(
          'span',
          null,
          ':',
          (0, _preact.h)('br', null),
          (0, _preact.h)(
            'a',
            { href: this.props.location },
            this.props.location
          )
        ) : null
      );
    }
  }, {
    key: 'getClass',
    value: function getClass() {
      var _types;

      var types = (_types = {}, _defineProperty(_types, _constants.MESSAGE_INFO, 'message message--info'), _defineProperty(_types, _constants.MESSAGE_SUCCESS, 'message message--success'), _defineProperty(_types, _constants.MESSAGE_ERROR, 'message message--danger'), _types);
      return types[this.props.type] || types[_constants.MESSAGE_INFO];
    }
  }]);

  return Message;
}(_preact.Component);

exports.default = Message;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(9);
var parse = __webpack_require__(8);
var formats = __webpack_require__(3);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var formats = __webpack_require__(3);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qs__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_qs__, "parse")) __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_qs__["parse"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_qs__, "stringify")) __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0_qs__["stringify"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_rel_scraper__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__lib_rel_scraper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_object_to_form_data__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__lib_object_to_form_data__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_append_query_string__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__lib_append_query_string__["a"]; });






/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = appendQueryString;
function appendQueryString(url, queryVars) {
  const firstSeperator = (url.indexOf('?') == -1 ? '?' : '&');
  let queryStringParts = [];
  for(var key in queryVars) {
    if (Array.isArray(queryVars[key])) {
      queryVars[key].forEach((val) => {
        queryStringParts.push(key + '[]=' + encodeURIComponent(val));
      });
    } else {
      queryStringParts.push(key + '=' + encodeURIComponent(queryVars[key]));
    }
  }
  const queryString = queryStringParts.join('&');
  return url + firstSeperator + queryString;
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = objectToFormData;
// const FormData = require('form-data');

function objectToFormData(object, formData = new FormData(), name = false) {
  Object.keys(object).forEach((key) => {
    const data = object[key];
    if (name) {
      key = name + '[' + key + ']'
    }
    if (Array.isArray(data)) {
      formData = objectToFormData(data, formData, key)
    } else {
      formData.append(key, data);
    }
  });
  return formData;
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (htmlString, url) {
  let rels = {};
  let baseUrl = url;

  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  const baseEl = doc.querySelector('base[href]');
  const relEls = doc.querySelectorAll('[rel][href]');

  if (baseEl) {
    const value = baseEl.getAttribute('href');
    const url = new URL(value, url);
    baseUrl = url.toString();
  }

  if (relEls.length) {
    relEls.forEach((relEl) => {
      const names = relEl.getAttribute('rel').toLowerCase().split("\\s+");
      const value = relEl.getAttribute('href');
      if (names.length && value !== null) {
        names.forEach((name) => {
          if (!rels[name]) {
            rels[name] = [];
          }
          const url = new URL(value, baseUrl).toString();
          if (rels[name].indexOf(url) === -1) {
            rels[name].push(url);
          }
        });
      }
    });
  }

  return rels;
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dependencies__ = __webpack_require__(10);



const qsParse = __WEBPACK_IMPORTED_MODULE_0__dependencies__["a" /* qsParse */];
const relScraper = __WEBPACK_IMPORTED_MODULE_0__dependencies__["b" /* relScraper */];
const qsStringify = __WEBPACK_IMPORTED_MODULE_0__dependencies__["c" /* qsStringify */];
const objectToFormData = __WEBPACK_IMPORTED_MODULE_0__dependencies__["d" /* objectToFormData */];
const appendQueryString = __WEBPACK_IMPORTED_MODULE_0__dependencies__["e" /* appendQueryString */];
if (__WEBPACK_IMPORTED_MODULE_0__dependencies__["FormData"] && !global.FormData) {
  global.FormData = __WEBPACK_IMPORTED_MODULE_0__dependencies__["FormData"];
}
if (__WEBPACK_IMPORTED_MODULE_0__dependencies__["DOMParser"] && !global.DOMParser) {
  global.DOMParser = __WEBPACK_IMPORTED_MODULE_0__dependencies__["DOMParser"];
}
if (__WEBPACK_IMPORTED_MODULE_0__dependencies__["URL"] && !global.URL) {
  global.URL = __WEBPACK_IMPORTED_MODULE_0__dependencies__["URL"];
}

const defaultSettings = {
  me: '',
  scope: 'post create delete update',
  token: '',
  authEndpoint: '',
  tokenEndpoint: '',
  micropubEndpoint: '',
};

const micropubError = (message, status = null, error = null) => {
  return {
    message: message,
    status: status,
    error: error,
  };
};

class Micropub {
  constructor(userSettings = {}) {
    this.options = Object.assign(defaultSettings, userSettings);

    // Bind all the things
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.undelete = this.undelete.bind(this);
    this.postMicropub = this.postMicropub.bind(this);
    this.checkRequiredOptions = this.checkRequiredOptions.bind(this);
    this.getAuthUrl = this.getAuthUrl.bind(this);
    this.getEndpointsFromUrl = this.getEndpointsFromUrl.bind(this);
  }

  /**
   * Checks to see if the given options are set
   * @param  {array} requirements An array of option keys to check
   * @return {object}             An object with boolean pass property and array missing property listing missing options
   */
  checkRequiredOptions(requirements) {
    let missing = [];
    let pass = true;
    for (var i = 0; i < requirements.length; i++) {
      const optionName = requirements[i];
      const option = this.options[optionName];
      if (!option) {
        pass = false;
        missing.push(optionName);
      }
    }
    return {
      pass: pass,
      missing: missing,
    }
  }

  /**
   * Get the various endpoints needed from the given url
   * @param  {string} url The url to scrape
   * @return {Promise}    Passes an object of endpoints on success: auth, token and micropub
   */
  getEndpointsFromUrl(url) {
    return new Promise((fulfill, reject) => {
      let endpoints = {
        micropub: null,
        authorization_endpoint: null,
        token_endpoint: null,
      };
      // Get the base url from the given url
      let baseUrl = url;
      // Fetch the given url
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            return reject(micropubError('Error getting page', res.status));
          }
          baseUrl = res.url;

          // Check for endpoints in headers
          const linkHeaders = res.headers.get('link');
          if (linkHeaders) {
            const links = linkHeaders.split(',');
            links.forEach((link) => {
              Object.keys(endpoints).forEach((key) => {
                const rel = link.match(/rel=("([^"]*)"|([^,"<]+))/)
                if (rel && rel[1] && rel[1].indexOf(key) >= 0) {
                  const linkValues = link.match(/[^<>|\s]+/g);
                  if (linkValues && linkValues[0]) {
                    endpoints[key] = linkValues[0];
                  }
                }
              });
            });
          }

          return res.text()
        })
        .then((html) => {
          // Get rel links
          const rels = relScraper(html, baseUrl);

          // Save necessary endpoints.
          this.options.me = url;
          if (rels) {
            Object.keys(endpoints).forEach((key) => {
              if (rels[key] && rels[key][0]) {
                endpoints[key] = rels[key][0];
              }
            });
          }

          if (endpoints.micropub && endpoints.authorization_endpoint && endpoints.token_endpoint) {
            this.options.micropubEndpoint = endpoints.micropub;
            this.options.tokenEndpoint = endpoints.token_endpoint;
            this.options.authEndpoint = endpoints.authorization_endpoint;
            return fulfill({
              auth: this.options.authEndpoint,
              token: this.options.tokenEndpoint,
              micropub: this.options.micropubEndpoint,
            });
          }

          return reject(micropubError('Error getting microformats data'));
        })
        .catch((err) => reject(micropubError('Error fetching url', null, err)));
    });
  }

  getToken(code) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions(['me', 'state', 'scope', 'clientId', 'redirectUri', 'tokenEndpoint']);
      if (!requirements.pass) {
        return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
      }

      const data = {
        grant_type: 'authorization_code',
        state: this.options.state,
        me: this.options.me,
        code: code,
        scope: this.options.scope,
        state: this.options.state,
        client_id: this.options.clientId,
        redirect_uri: this.options.redirectUri,
      };

      const request = {
        method: 'POST',
        body: qsStringify(data),
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept': 'application/json, application/x-www-form-urlencoded',
        }),
        // mode: 'cors',
      };
      // This could maybe use the postMicropub method
      fetch(this.options.tokenEndpoint, request)
        .then((res) => {
          if (!res.ok) {
            return reject(micropubError('Error getting token', res.status));
          }
          const contentType = res.headers.get('Content-Type');
          if (contentType && contentType.indexOf('application/json') === 0) {
            return res.json()
          } else {
            return res.text();
          }
        })
        .then((result) => {
          // Parse the response from the indieauth server
          if (typeof result === 'string') {
            result = qsParse(result);
          }
          if (result.error_description) {
            return reject(micropubError(result.error_description));
          } else if (result.error) {
            return reject(micropubError(result.error));
          }
          if (!result.me || !result.scope || !result.access_token) {
            return reject(micropubError('The token endpoint did not return the expected parameters'));
          }
          // Check me is the same (removing any trailing slashes)
          if (result.me && result.me.replace(/\/+$/, '') !== this.options.me.replace(/\/+$/, '')) {
            return reject(micropubError('The me values did not match'));
          }
          // Check scope matches (not reliable)
          // console.log(result.scope);
          // console.log(this.options.scope);
          // if (result.scope && result.scope !== this.options.scope) {
          //   reject('The scope values did not match');
          // }
          // Successfully got the token
          this.options.token = result.access_token;
          fulfill(result.access_token);
        })
        .catch((err) => reject(micropubError('Error requesting token endpoint', null, err)));
    });
  }

  /**
   * Get the authentication url based on the set options
   * @return {string|boolean} The authentication url or false on missing options
   */
  getAuthUrl() {
    return new Promise((fulfill, reject) => {
      let requirements = this.checkRequiredOptions(['me', 'state']);
      if (!requirements.pass) {
        return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
      }
      this.getEndpointsFromUrl(this.options.me)
        .then(() => {
          let requirements = this.checkRequiredOptions(['me', 'state', 'scope', 'clientId', 'redirectUri']);
          if (!requirements.pass) {
            return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
          }
          const authParams = {
            me: this.options.me,
            client_id: this.options.clientId,
            redirect_uri: this.options.redirectUri,
            response_type: 'code',
            scope: this.options.scope,
            state: this.options.state,
          };

          fulfill(this.options.authEndpoint + '?' + qsStringify(authParams));
        })
        .catch((err) => reject(micropubError('Error getting auth url', null, err)));
    });
  }

  verifyToken() {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions(['token', 'micropubEndpoint']);
      if (!requirements.pass) {
        return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
      }

      const request = {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + this.options.token,
        }),
      };

      fetch(this.options.micropubEndpoint, request)
        .then((res) => {
          if (res.ok) {
            return fulfill(true);
          } else {
            return reject(micropubError('Error verifying token', res.status));
          }
        })
        .catch((err) => reject(micropubError('Error verifying token', null, err)));
    });
  }

  create(post, type = 'json') {
    return this.postMicropub(post, type);
  }

  update(url, update) {
    return this.postMicropub(Object.assign({
      action: 'update',
      url: url,
    }, update));
  }

  delete(url) {
    return this.postMicropub({
      action: 'delete',
      url: url,
    })
  }

  undelete(url) {
    return this.postMicropub({
      action: 'undelete',
      url: url,
    })
  }

  postMicropub(object, type = 'json') {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions(['token', 'micropubEndpoint']);
      if (!requirements.pass) {
        return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
      }

      let request = {
        method: 'POST',
      };

      if (type == 'json') {
        request.body = JSON.stringify(object);
        request.headers = new Headers({
          'Authorization': 'Bearer ' + this.options.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/x-www-form-urlencoded',
        });
      } else if (type == 'form') {
        request.body = qsStringify(object);
        request.headers = new Headers({
          'Authorization': 'Bearer ' + this.options.token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept': 'application/json, application/x-www-form-urlencoded',
        });
      } else if (type == 'multipart') {
        request.body = objectToFormData(object);
        request.headers = new Headers({
          'Authorization': 'Bearer ' + this.options.token,
          'Content-Type': undefined,
          'Accept': 'application/json, application/x-www-form-urlencoded',
        });
      }

      fetch(this.options.micropubEndpoint, request)
        .then((res) => {
          if (!res.ok) {
            return reject(micropubError('Error with micropub request', res.status));
          }
          const location = res.headers.get('Location') || res.headers.get('location');
          if (location) {
            return fulfill(location);
          }
          const contentType = res.headers.get('Content-Type');
          if (contentType && contentType.indexOf('application/json') === 0) {
            return res.json()
          } else {
            return res.text();
          }
        })
        .then((result) => {
          if (typeof result === 'string') {
            result = qsParse(result);
          }
          if (result.error_description) {
            return reject(micropubError(result.error_description));
          } else if (result.error) {
            return reject(micropubError(result.error));
          } else {
            return fulfill(result);
          }
        })
        .catch((err) => reject(micropubError('Error sending request', null, err)));
    });
  }

  postMedia(file) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions(['token', 'mediaEndpoint']);
      if (!requirements.pass) {
        return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
      }

      let request = {
        method: 'POST',
        body: objectToFormData({file: file}),
        headers: new Headers({
          'Authorization': 'Bearer ' + this.options.token,
          'Content-Type': undefined,
          'Accept': '*/*',
        }),
      };

      fetch(this.options.mediaEndpoint, request)
        .then((res) => {
          if (res.status !== 201) {
            return reject(micropubError('Error creating media', res.status));
          }
          const location = res.headers.get('Location') || res.headers.get('location');
          if (location) {
            return fulfill(location);
          } else {
            return reject(micropubError('Media endpoint did not return a location', res.status));
          }
        })
        .catch((err) => reject(micropubError('Error sending request')));
    });
  }

  query(type) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions(['token', 'micropubEndpoint']);
      if (!requirements.pass) {
        return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
      }

      const url = appendQueryString(this.options.micropubEndpoint, {q: type});

      const request = {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + this.options.token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept': 'application/json',
        }),
        // mode: 'cors',
      };

      fetch(url, request)
        .then((res) => {
          if (!res.ok) {
            return reject(micropubError('Error getting ' + type, res.status));
          }
          return res.json()
        })
        .then((json) => fulfill(json))
        .catch((err) => reject(micropubError('Error getting ' + type, null, err)));
    });
  }

  querySource(url, properties = []) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions(['token', 'micropubEndpoint']);
      if (!requirements.pass) {
        return reject(micropubError('Missing required options: ' + requirements.missing.join(', ')));
      }

      url = appendQueryString(this.options.micropubEndpoint, {q: 'source', url: url, properties: properties});

      const request = {
        method: 'GET',
        headers: new Headers({
          'Authorization': 'Bearer ' + this.options.token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Accept': 'application/json',
        }),
        // mode: 'cors',
      };

      fetch(url, request)
        .then((res) => {
          if (!res.ok) {
            return reject(micropubError('Error getting source', res.status));
          }
          return res.json()
        })
        .then((json) => fulfill(json))
        .catch((err) => reject(micropubError('Error getting source', null, err)));
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Micropub);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(15)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)(
        "footer",
        { className: "footer" },
        this.props.domain ? (0, _preact.h)(
          "div",
          { className: "footer__message" },
          "Authenticated to ",
          (0, _preact.h)(
            "strong",
            null,
            this.props.domain
          )
        ) : null,
        this.props.onSettings ? (0, _preact.h)(
          "button",
          {
            className: "button-link",
            type: "button",
            onClick: this.props.onSettings
          },
          "Settings"
        ) : null,
        this.props.onLogout ? (0, _preact.h)(
          "button",
          {
            className: "button-link",
            type: "button",
            onClick: this.props.onLogout
          },
          "Logout"
        ) : null
      );
    }
  }]);

  return Footer;
}(_preact.Component);

exports.default = Footer;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _LoginForm = __webpack_require__(24);

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _NoteForm = __webpack_require__(25);

var _NoteForm2 = _interopRequireDefault(_NoteForm);

var _Message = __webpack_require__(6);

var _Message2 = _interopRequireDefault(_Message);

var _SettingsForm = __webpack_require__(28);

var _SettingsForm2 = _interopRequireDefault(_SettingsForm);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.setDefaultView = function () {
      if (_this.isAuthenticated()) {
        _this.setState({
          currentView: 'new-note'
        });
      } else {
        _this.setState({
          currentView: 'login'
        });
      }
    };

    _this.displayMessage = function (message, status, location) {
      _this.setState({
        currentView: 'feedback',
        message: message,
        postLocation: typeof location === 'string' ? location : null
      });
    };

    _this.handleSettings = function () {
      _this.setState({ currentView: 'settings' });
    };

    _this.handleLogout = function () {
      (0, _utils.logout)();
      _this.setState({ currentView: 'login' });
    };

    _this.setDefaultView();
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      switch (this.state.currentView) {
        case 'login':
          return (0, _preact.h)(_LoginForm2.default, { handleSettings: this.handleSettings });
        case 'feedback':
          return (0, _preact.h)(
            _Message2.default,
            { location: this.state.postLocation },
            this.state.message
          );
        case 'settings':
          return (0, _preact.h)(_SettingsForm2.default, { onClose: this.setDefaultView });
        default:
          return (0, _preact.h)(_NoteForm2.default, {
            handleLogout: this.handleLogout,
            handleSettings: this.handleSettings,
            userFeedback: this.displayMessage
          });
      }
    }
  }, {
    key: 'isAuthenticated',
    value: function isAuthenticated() {
      return !!localStorage.getItem('token') && !!localStorage.getItem('micropubEndpoint');
    }
  }]);

  return App;
}(_preact.Component);

exports.default = App;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Tab = __webpack_require__(26);

var _Tab2 = _interopRequireDefault(_Tab);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChangeViewTabs = function (_Component) {
  _inherits(ChangeViewTabs, _Component);

  function ChangeViewTabs() {
    _classCallCheck(this, ChangeViewTabs);

    return _possibleConstructorReturn(this, (ChangeViewTabs.__proto__ || Object.getPrototypeOf(ChangeViewTabs)).apply(this, arguments));
  }

  _createClass(ChangeViewTabs, [{
    key: 'render',
    value: function render() {
      var postType = this.props.postType;
      return (0, _preact.h)(
        'div',
        { className: 'tabs' },
        this.renderNewNote(),
        this.renderPageReply(),
        this.renderItemReply()
      );
    }
  }, {
    key: 'renderNewNote',
    value: function renderNewNote() {
      return (0, _preact.h)(
        _Tab2.default,
        {
          isActive: this.props.postType === _constants.NEW_NOTE,
          onClick: this.switchTo(_constants.NEW_NOTE)
        },
        'New note'
      );
    }
  }, {
    key: 'renderPageReply',
    value: function renderPageReply() {
      return (0, _preact.h)(
        _Tab2.default,
        {
          isActive: this.props.postType === _constants.PAGE_REPLY,
          onClick: this.switchTo(_constants.PAGE_REPLY)
        },
        'Current page'
      );
    }
  }, {
    key: 'renderItemReply',
    value: function renderItemReply() {
      return (0, _preact.h)(
        _Tab2.default,
        {
          isActive: this.props.postType === _constants.ITEM_REPLY,
          isDisabled: !this.props.hasSelectedEntry,
          onClick: this.switchTo(_constants.ITEM_REPLY) },
        'Selected entry'
      );
    }
  }, {
    key: 'switchTo',
    value: function switchTo(postType) {
      var _this2 = this;

      return function () {
        _this2.props.onChange(postType);
      };
    }
  }]);

  return ChangeViewTabs;
}(_preact.Component);

exports.default = ChangeViewTabs;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _utils = __webpack_require__(1);

var _constants = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormInputs = function (_Component) {
  _inherits(FormInputs, _Component);

  function FormInputs(props) {
    _classCallCheck(this, FormInputs);

    var _this = _possibleConstructorReturn(this, (FormInputs.__proto__ || Object.getPrototypeOf(FormInputs)).call(this, props));

    _this.focus = function () {
      _this.content.focus();
    };

    _this.updateSlug = function (e) {
      var slug = e.target.value.trim();
      var entry = (0, _utils.clone)(_this.props.entry);
      entry['mp-slug'] = slug;
      console.log(slug);
      _this.props.updateEntry(entry);
      _this.setState({
        isSlugEdited: slug !== ''
      });
    };

    _this.updateContent = function (e) {
      var content = e.target.value;
      var entry = (0, _utils.clone)(_this.props.entry);
      entry.content = content;
      if (_this.shouldAutoSlug()) {
        entry['mp-slug'] = (0, _utils.generateSlug)(content);
      }
      _this.props.updateEntry(entry);
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      _this.props.onSubmit(_this.props.entry);
    };

    _this.state = {
      isSlugEdited: false
    };
    return _this;
  }

  _createClass(FormInputs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      setTimeout(this.focus, 150);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var postType = this.props.postType;

      return (0, _preact.h)(
        'form',
        { onSubmit: this.onSubmit },
        (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'label',
            { 'for': 'input-content' },
            postType === _constants.NEW_NOTE ? 'Content' : 'Reply'
          ),
          (0, _preact.h)('textarea', {
            id: 'input-content',
            value: this.props.entry.content,
            onInput: this.updateContent,
            onBlur: this.updateContent,
            rows: '4',
            disabled: this.props.isDisabled,
            ref: function ref(el) {
              _this2.content = el;
            }
          }),
          (0, _preact.h)(
            'div',
            { 'class': 'input-extra' },
            this.props.entry.content.length
          )
        ),
        (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'label',
            { 'for': 'input-category' },
            'Tags (space separated)'
          ),
          (0, _preact.h)('input', {
            id: 'input-category',
            type: 'text',
            placeholder: 'e.g. web  personal',
            value: this.props.entry.category.join(' '),
            onChange: this.updateFieldArray('category'),
            disabled: this.props.isDisabled
          })
        ),
        (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'label',
            { 'for': 'input-slug' },
            'Slug'
          ),
          (0, _preact.h)('input', {
            id: 'input-slug',
            type: 'text',
            name: 'mp-slug',
            value: this.props.entry['mp-slug'],
            onInput: this.updateSlug,
            disabled: this.props.isDisabled
          })
        ),
        (0, _preact.h)(
          'button',
          {
            type: 'submit',
            disabled: this.props.isDisabled || !this.props.entry.content,
            className: this.props.isLoading ? 'button is-loading' : 'button'
          },
          'Post'
        )
      );
    }
  }, {
    key: 'updateFieldArray',
    value: function updateFieldArray(fieldName) {
      var _this3 = this;

      return function (e) {
        e.preventDefault();
        var entry = (0, _utils.clone)(_this3.props.entry);
        entry[fieldName] = e.target.value.trim().split(' ');
        _this3.props.updateEntry(entry);
      };
    }
  }, {
    key: 'shouldAutoSlug',
    value: function shouldAutoSlug() {
      if (this.state.isSlugEdited) {
        return false;
      }
      if (this.props.settings && this.props.settings.autoSlug) {
        return true;
      }
      return false;
    }
  }]);

  return FormInputs;
}(_preact.Component);

exports.default = FormInputs;

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _Message = __webpack_require__(6);

var _Message2 = _interopRequireDefault(_Message);

var _Footer = __webpack_require__(16);

var _Footer2 = _interopRequireDefault(_Footer);

var _utils = __webpack_require__(1);

var _micropub = __webpack_require__(5);

var _micropub2 = _interopRequireDefault(_micropub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoginForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (e) {
      _this.setState({
        domain: e.target.value,
        hasErrors: false
      });
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      var domain = _this.getNormalizedDomain();
      _this.setState({ isLoading: true, domain: domain });
      _micropub2.default.options.me = domain;
      _micropub2.default.getAuthUrl().then(function (url) {
        chrome.runtime.sendMessage({
          action: 'begin-auth',
          payload: {
            authUrl: url,
            domain: _this.state.domain,
            metadata: {
              authEndpoint: _micropub2.default.options.authEndpoint,
              tokenEndpoint: _micropub2.default.options.tokenEndpoint,
              micropub: _micropub2.default.options.micropubEndpoint
            }
          }
        });
      }).catch(function (err) {
        return _this.setState({
          hasErrors: true,
          errorMessage: 'Missing micropub data on ' + _this.state.domain + '. Please ensure the following links are present: authorization_endpoint, token_endpoint, micropub',
          isLoading: false
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LoginForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        _this2.input.focus();
      }, 150);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'form',
          { 'class': 'container', method: 'GET', onSubmit: this.handleSubmit },
          (0, _preact.h)(
            'p',
            null,
            'To use Omnibear, sign in with your domain. Your website will need to support',
            ' ',
            (0, _preact.h)(
              'a',
              { href: 'http://indieweb.org/micropub', onClick: _utils.openLink },
              'Micropub'
            ),
            ' ',
            'for creating new posts.'
          ),
          (0, _preact.h)(
            'div',
            { 'class': 'fields-inline' },
            (0, _preact.h)('input', {
              type: 'text',
              name: 'me',
              placeholder: 'https://example.com',
              className: 'fields-inline__fill',
              value: this.state.domain,
              onInput: this.handleChange,
              disabled: this.state.isLoading,
              ref: function ref(el) {
                return _this3.input = el;
              }
            }),
            (0, _preact.h)(
              'button',
              {
                type: 'submit',
                disabled: this.state.isLoading,
                className: this.state.isLoading ? 'is-loading' : ''
              },
              'Sign in'
            )
          ),
          this.state.hasErrors ? (0, _preact.h)(
            _Message2.default,
            { type: 'error' },
            this.state.errorMessage || 'Error'
          ) : null
        ),
        (0, _preact.h)(_Footer2.default, { onSettings: this.props.handleSettings })
      );
    }
  }, {
    key: 'getNormalizedDomain',
    value: function getNormalizedDomain() {
      if (this.state.domain.startsWith('http://') || this.state.domain.startsWith('https://')) {
        return this.state.domain;
      } else {
        return 'http://' + this.state.domain;
      }
    }
  }, {
    key: 'getFields',
    value: function getFields(domain) {
      return ['redirect_uri=https://omnibear.com/auth/success/', 'client_id=https://omnibear.com', 'response_type=code', 'scope=create', 'me=' + domain].join('&');
    }
  }]);

  return LoginForm;
}(_preact.Component);

exports.default = LoginForm;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _QuickActions = __webpack_require__(34);

var _QuickActions2 = _interopRequireDefault(_QuickActions);

var _Message = __webpack_require__(6);

var _Message2 = _interopRequireDefault(_Message);

var _ChangeViewTabs = __webpack_require__(21);

var _ChangeViewTabs2 = _interopRequireDefault(_ChangeViewTabs);

var _FormInputs = __webpack_require__(22);

var _FormInputs2 = _interopRequireDefault(_FormInputs);

var _Footer = __webpack_require__(16);

var _Footer2 = _interopRequireDefault(_Footer);

var _micropub = __webpack_require__(5);

var _micropub2 = _interopRequireDefault(_micropub);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteForm = function (_Component) {
  _inherits(NoteForm, _Component);

  function NoteForm(props) {
    _classCallCheck(this, NoteForm);

    var _this = _possibleConstructorReturn(this, (NoteForm.__proto__ || Object.getPrototypeOf(NoteForm)).call(this, props));

    _initialiseProps.call(_this);

    var entryUrl = null;
    var postType = void 0;
    var selectedEntry = localStorage.getItem('selectedEntry');
    var settings = JSON.parse(localStorage.getItem('settings')) || {};
    if (location.search.indexOf('reply=true') === -1 && !settings.defaultToCurrentPage) {
      postType = _constants.NEW_NOTE;
    } else {
      if (selectedEntry) {
        postType = _constants.ITEM_REPLY;
        entryUrl = selectedEntry;
      } else {
        postType = _constants.PAGE_REPLY;
        entryUrl = localStorage.getItem('pageUrl');
      }
    }
    _this.state = {
      postType: postType,
      url: entryUrl,
      userDomain: localStorage.getItem('domain'),
      entry: {
        h: 'entry',
        content: '',
        category: [],
        'mp-slug': ''
      },
      hasSelectedEntry: !!selectedEntry,
      isDisabled: false,
      isLoading: false,
      settings: settings
    };
    return _this;
  }

  _createClass(NoteForm, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          postType = _state.postType,
          url = _state.url,
          isDisabled = _state.isDisabled,
          isLoading = _state.isLoading,
          settings = _state.settings,
          userDomain = _state.userDomain,
          entry = _state.entry,
          hasSelectedEntry = _state.hasSelectedEntry,
          errorMessage = _state.errorMessage;
      var _props = this.props,
          handleSettings = _props.handleSettings,
          handleLogout = _props.handleLogout;

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(_ChangeViewTabs2.default, {
          postType: postType,
          onChange: this.changeView,
          hasSelectedEntry: hasSelectedEntry
        }),
        (0, _preact.h)(_QuickActions2.default, {
          postType: postType,
          url: url,
          onLike: this.handleLike,
          onRepost: this.handleRepost,
          onReacji: this.handleReacji,
          isDisabled: isLoading,
          settings: settings
        }),
        (0, _preact.h)(
          'div',
          { className: 'container' },
          (0, _preact.h)('div', { className: 'text-right' }),
          (0, _preact.h)(_FormInputs2.default, {
            postType: postType,
            entry: entry,
            settings: settings,
            updateEntry: this.updateEntry,
            onSubmit: this.handleSubmit,
            isDisabled: isDisabled,
            isLoading: isLoading,
            ref: function ref(el) {
              return _this2.form = el;
            }
          }),
          errorMessage ? (0, _preact.h)(
            _Message2.default,
            { type: _constants.MESSAGE_ERROR },
            errorMessage
          ) : null
        ),
        (0, _preact.h)(_Footer2.default, {
          domain: userDomain,
          onSettings: handleSettings,
          onLogout: handleLogout
        })
      );
    }
  }, {
    key: 'flashSuccessMessage',
    value: function flashSuccessMessage(message, location) {
      this.props.userFeedback(message, _constants.MESSAGE_SUCCESS, location);
      setTimeout(function () {
        window.close();
      }, 3000);
    }
  }, {
    key: 'flashErrorMessage',
    value: function flashErrorMessage(message) {
      var _this3 = this;

      this.setState({
        errorMessage: message,
        isDisabled: false,
        isLoading: false
      });
      setTimeout(function () {
        if (_this3.state.errorMessage === message) {
          _this3.setState({ errorMessage: false });
        }
      }, 4000);
    }
  }, {
    key: 'postEntry',
    value: function postEntry(entry) {
      var slugName = this.state.settings.slug;
      this.setState({
        isDisabled: true,
        isLoading: true
      });
      if (slugName) {
        entry[slugName] = entry['mp-slug'];
        delete entry['mp-slug'];
      }
      return _micropub2.default.create(entry, 'form');
    }
  }]);

  return NoteForm;
}(_preact.Component);

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.handleLike = function () {
    if (!_this4.state.url) {
      return;
    }
    _this4.postEntry({
      h: 'entry',
      'like-of': _this4.state.url
    }).then(function (location) {
      var type = _this4.state.postType === _constants.ITEM_REPLY ? 'Item' : 'Page';
      _this4.flashSuccessMessage(type + ' liked successfully', location);
    }).catch(function (err) {
      console.error(err);
      _this4.flashErrorMessage('Error posting like');
    });
  };

  this.handleRepost = function () {
    if (!_this4.state.url) {
      return;
    }
    _this4.postEntry({
      h: 'entry',
      'repost-of': _this4.state.url
    }).then(function (location) {
      var type = _this4.state.postType === _constants.ITEM_REPLY ? 'Item' : 'Page';
      _this4.flashSuccessMessage(type + ' reposted successfully', location);
    }).catch(function (err) {
      console.error(err);
      _this4.flashErrorMessage('Error reposting');
    });
  };

  this.handleReacji = function (emoji) {
    if (!_this4.state.url) {
      return;
    }
    _this4.postEntry({
      h: 'entry',
      content: emoji,
      'in-reply-to': _this4.state.url
    }).then(function (location) {
      var type = _this4.state.postType === _constants.ITEM_REPLY ? 'Item' : 'Page';
      _this4.flashSuccessMessage(type + ' reacted to successfully', location);
    }).catch(function (err) {
      console.error(err);
      _this4.flashErrorMessage('Error reacting');
    });
  };

  this.updateEntry = function (newEntry) {
    _this4.setState({ entry: newEntry });
  };

  this.handleSubmit = function (entry) {
    if (_this4.state.postType !== _constants.NEW_NOTE) {
      entry['in-reply-to'] = _this4.state.url;
    }
    _this4.postEntry(entry).then(function (location) {
      var type = _this4.state.postType === _constants.NEW_NOTE ? 'Note' : 'Reply';
      _this4.flashSuccessMessage(type + ' posted successfully', location);
    }).catch(function (err) {
      _this4.flashErrorMessage('Error posting Note');
    });
  };

  this.changeView = function (postType) {
    var url = void 0;
    switch (postType) {
      case _constants.NEW_NOTE:
        url = null;
        break;
      case _constants.PAGE_REPLY:
        url = localStorage.getItem('pageUrl');
        break;
      case _constants.ITEM_REPLY:
        url = localStorage.getItem('selectedEntry');
        break;
    }
    _this4.setState({ url: url, postType: postType });
    _this4.form.focus();
  };
};

exports.default = NoteForm;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      e.preventDefault();
      _this.props.onClick();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'button',
        {
          className: this.getClass(),
          disabled: this.props.isDisabled,
          onClick: this.handleClick
        },
        this.props.children
      );
    }
  }, {
    key: 'getClass',
    value: function getClass() {
      if (this.props.isActive) {
        return 'tab is-active';
      } else {
        return 'tab';
      }
    }
  }]);

  return Tab;
}(_preact.Component);

exports.default = Tab;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReacjiSettings = function (_Component) {
  _inherits(ReacjiSettings, _Component);

  function ReacjiSettings(props) {
    _classCallCheck(this, ReacjiSettings);

    var _this = _possibleConstructorReturn(this, (ReacjiSettings.__proto__ || Object.getPrototypeOf(ReacjiSettings)).call(this, props));

    _this.renderReacji = function (char, i) {
      return (0, _preact.h)(
        'div',
        { className: 'reacji-tag', key: char },
        char,
        (0, _preact.h)(
          'button',
          { type: 'button', onClick: _this.deleteReacji(i) },
          '\xD7'
        )
      );
    };

    _this.update = function (e) {
      _this.setState({ value: e.target.value });
    };

    _this.addReacji = function () {
      var value = _this.state.value;
      var reacji = _this.props.reacji;

      if (value && reacji.indexOf(value) === -1) {
        reacji.push(value);
        _this.props.onChange(reacji);
        _this.setState({ value: '' });
      }
    };

    _this.setState({
      value: ''
    });
    return _this;
  }

  _createClass(ReacjiSettings, [{
    key: 'render',
    value: function render() {
      var reacji = this.props.reacji;

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'label',
          null,
          'Quick replies (\u201CReacji\u201D)'
        ),
        (0, _preact.h)(
          'div',
          { className: 'reacji-row' },
          reacji.map(this.renderReacji)
        ),
        (0, _preact.h)(
          'div',
          { 'class': 'input-inline' },
          (0, _preact.h)('input', { type: 'text', value: this.state.value, onChange: this.update }),
          (0, _preact.h)(
            'button',
            { type: 'button', onClick: this.addReacji },
            'Add'
          )
        )
      );
    }
  }, {
    key: 'deleteReacji',
    value: function deleteReacji(index) {
      var _this2 = this;

      return function () {
        var reacji = _this2.props.reacji;

        reacji.splice(index, 1);
        _this2.props.onChange(reacji);
      };
    }
  }]);

  return ReacjiSettings;
}(_preact.Component);

exports.default = ReacjiSettings;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _ReacjiSettings = __webpack_require__(27);

var _ReacjiSettings2 = _interopRequireDefault(_ReacjiSettings);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsForm = function (_Component) {
  _inherits(SettingsForm, _Component);

  function SettingsForm(props) {
    _classCallCheck(this, SettingsForm);

    var _this = _possibleConstructorReturn(this, (SettingsForm.__proto__ || Object.getPrototypeOf(SettingsForm)).call(this, props));

    _this.showAuthenticationDetails = function () {
      _this.setState({
        showAuthenticationDetails: true
      });
    };

    _this.save = function (e) {
      e.preventDefault();
      var _this$state = _this.state,
          defaultToCurrentPage = _this$state.defaultToCurrentPage,
          reacji = _this$state.reacji,
          slug = _this$state.slug,
          autoSlug = _this$state.autoSlug,
          me = _this$state.me,
          token = _this$state.token,
          micropubEndpoint = _this$state.micropubEndpoint;

      localStorage.setItem('settings', JSON.stringify({
        defaultToCurrentPage: defaultToCurrentPage,
        reacji: reacji,
        slug: slug,
        autoSlug: autoSlug
      }));
      if (me) {
        localStorage.setItem('domain', me);
      }
      if (token) {
        localStorage.setItem('token', token);
      }
      if (micropubEndpoint) {
        localStorage.setItem('micropubEndpoint', micropubEndpoint);
      }
      _this.props.onClose();
    };

    var settings = JSON.parse(localStorage.getItem('settings'));
    if (!settings) {
      settings = {
        defaultToCurrentPage: false,
        reacji: _constants.DEFAULT_REACJI,
        slug: 'mp-slug',
        autoSlug: false
      };
    }
    settings.me = localStorage.getItem('domain');
    settings.micropubEndpoint = localStorage.getItem('micropubEndpoint');
    settings.token = localStorage.getItem('token');
    settings.showAuthenticationDetails = false;
    _this.setState(settings);
    return _this;
  }

  _createClass(SettingsForm, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          defaultToCurrentPage = _state.defaultToCurrentPage,
          reacji = _state.reacji,
          slug = _state.slug,
          autoSlug = _state.autoSlug,
          me = _state.me,
          micropubEndpoint = _state.micropubEndpoint,
          token = _state.token,
          showAuthenticationDetails = _state.showAuthenticationDetails;

      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'h1',
          { 'class': 'section-heading' },
          'Settings'
        ),
        (0, _preact.h)(
          'div',
          { 'class': 'container' },
          (0, _preact.h)(
            'form',
            { 'class': 'settings-form', onSubmit: this.save },
            (0, _preact.h)(
              'label',
              null,
              (0, _preact.h)('input', {
                type: 'checkbox',
                checked: defaultToCurrentPage,
                onChange: this.updateBoolean('defaultToCurrentPage')
              }),
              'Always open in \u201CReply to current page\u201D mode'
            ),
            (0, _preact.h)(
              'label',
              null,
              (0, _preact.h)('input', {
                type: 'checkbox',
                checked: autoSlug,
                onChange: this.updateBoolean('autoSlug')
              }),
              'Automatically generate slug from post content'
            ),
            (0, _preact.h)(_ReacjiSettings2.default, { reacji: reacji, onChange: this.set('reacji') }),
            (0, _preact.h)(
              'div',
              null,
              (0, _preact.h)(
                'label',
                { htmlFor: 'slug' },
                'Slug'
              ),
              (0, _preact.h)('input', {
                id: 'slug',
                type: 'text',
                value: slug,
                onChange: this.update('slug')
              }),
              (0, _preact.h)(
                'div',
                { 'class': 'settings-form__description' },
                'Choose the name of the field that the slug will be sent in. This should be ',
                (0, _preact.h)(
                  'code',
                  null,
                  'mp-slug'
                ),
                ' unless your endpoint is using a custom property or the deprecated ',
                (0, _preact.h)(
                  'code',
                  null,
                  'slug'
                ),
                ' property.'
              )
            ),
            (0, _preact.h)(
              'fieldset',
              null,
              (0, _preact.h)(
                'legend',
                null,
                'Authentication details (advanced)'
              ),
              (0, _preact.h)(
                'div',
                { 'class': 'settings-form__description' },
                'These values are set automatically upon logging in. Only edit them if you are having trouble authenticating and wish to do so manually.'
              ),
              showAuthenticationDetails ? [(0, _preact.h)(
                'div',
                null,
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'me' },
                  'Me (domain name)'
                ),
                (0, _preact.h)('input', {
                  id: 'me',
                  type: 'text',
                  value: me,
                  onChange: this.update('me'),
                  placeholder: 'https://example.com'
                })
              ), (0, _preact.h)(
                'div',
                null,
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'mp-endpoint' },
                  'Micropub endpoint'
                ),
                (0, _preact.h)('input', {
                  id: 'mp-endpoint',
                  type: 'text',
                  value: micropubEndpoint,
                  onChange: this.update('micropubEndpoint'),
                  placeholder: 'https://example.com/micropub'
                })
              ), (0, _preact.h)(
                'div',
                null,
                (0, _preact.h)(
                  'label',
                  { htmlFor: 'token' },
                  'Token'
                ),
                (0, _preact.h)('input', {
                  id: 'token',
                  type: 'text',
                  value: token,
                  onChange: this.update('token')
                })
              )] : (0, _preact.h)(
                'div',
                { 'class': 'text-right' },
                (0, _preact.h)(
                  'button',
                  {
                    type: 'button',
                    onClick: this.showAuthenticationDetails
                  },
                  'Show'
                )
              )
            ),
            (0, _preact.h)(
              'div',
              { 'class': 'form-buttons' },
              (0, _preact.h)(
                'button',
                { type: 'submit', className: 'button' },
                'Save'
              ),
              (0, _preact.h)(
                'button',
                {
                  type: 'button',
                  className: 'button-link',
                  onClick: this.props.onClose
                },
                'Cancel'
              )
            )
          )
        )
      );
    }
  }, {
    key: 'update',
    value: function update(fieldName) {
      var _this2 = this;

      return function (e) {
        _this2.set(fieldName)(e.target.value);
      };
    }
  }, {
    key: 'set',
    value: function set(fieldName) {
      var _this3 = this;

      return function (value) {
        _this3.setState(_defineProperty({}, fieldName, value));
      };
    }
  }, {
    key: 'updateBoolean',
    value: function updateBoolean(fieldName) {
      var _this4 = this;

      return function (e) {
        _this4.setState(_defineProperty({}, fieldName, e.target.checked));
      };
    }
  }]);

  return SettingsForm;
}(_preact.Component);

exports.default = SettingsForm;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__(0);

var _App = __webpack_require__(17);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  (0, _preact.render)((0, _preact.h)(_App2.default, null), document.body);
});

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _constants = __webpack_require__(2);

var _HeartSvg = __webpack_require__(35);

var _HeartSvg2 = _interopRequireDefault(_HeartSvg);

var _RepostSvg = __webpack_require__(36);

var _RepostSvg2 = _interopRequireDefault(_RepostSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuickActions = function (_Component) {
  _inherits(QuickActions, _Component);

  function QuickActions() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, QuickActions);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = QuickActions.__proto__ || Object.getPrototypeOf(QuickActions)).call.apply(_ref, [this].concat(args))), _this), _this.renderReacji = function (content, i) {
      return (0, _preact.h)(
        'li',
        { key: content },
        (0, _preact.h)(
          'button',
          {
            onClick: function onClick() {
              return _this.props.onReacji(content);
            },
            disabled: _this.props.isDisabled
          },
          content
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(QuickActions, [{
    key: 'render',
    value: function render() {
      if (this.props.postType === _constants.NEW_NOTE || !this.props.url) {
        return null;
      }
      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'div',
          { className: 'info-banner' },
          this.props.url
        ),
        (0, _preact.h)(
          'div',
          { className: 'container' },
          (0, _preact.h)(
            'h2',
            { className: 'minor-heading' },
            'Quick Actions'
          ),
          this.renderQuickActions()
        )
      );
    }
  }, {
    key: 'renderQuickActions',
    value: function renderQuickActions() {
      var settings = this.props.settings;

      var reacji = void 0;
      if (settings && settings.reacji) {
        reacji = settings.reacji;
      } else {
        reacji = _constants.DEFAULT_REACJI;
      }

      return (0, _preact.h)(
        'ul',
        { className: 'quick-actions' },
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'button',
            {
              onClick: this.props.onRepost,
              disabled: this.props.isDisabled
            },
            (0, _preact.h)(_RepostSvg2.default, null),
            ' repost'
          )
        ),
        (0, _preact.h)(
          'li',
          null,
          (0, _preact.h)(
            'button',
            { onClick: this.props.onLike, disabled: this.props.isDisabled },
            (0, _preact.h)(_HeartSvg2.default, null),
            ' like'
          )
        ),
        reacji.map(this.renderReacji)
      );
    }
  }]);

  return QuickActions;
}(_preact.Component);

exports.default = QuickActions;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeartSVG = function (_Component) {
  _inherits(HeartSVG, _Component);

  function HeartSVG() {
    _classCallCheck(this, HeartSVG);

    return _possibleConstructorReturn(this, (HeartSVG.__proto__ || Object.getPrototypeOf(HeartSVG)).apply(this, arguments));
  }

  _createClass(HeartSVG, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)(
        "svg",
        { className: "svg-heart", viewBox: "-5 0 110 125" },
        (0, _preact.h)(
          "desc",
          null,
          "heart"
        ),
        (0, _preact.h)("path", {
          d: "M49.99,96.266c4.246-2.908,50.016-34.809,50.016-63.154c0-17.711-10.822-29.378-26.424-29.378  c-14.357,0-22.389,13.18-23.582,15.29c-1.194-2.109-9.225-15.29-23.582-15.29c-15.603,0-26.425,11.667-26.425,29.378  c0,28.345,45.724,60.246,49.97,63.154H49.99z",
          fill: "transparent",
          stroke: "var(--red)",
          "stroke-width": "10"
        })
      );
    }
  }]);

  return HeartSVG;
}(_preact.Component);

exports.default = HeartSVG;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RepostSvg = function (_Component) {
  _inherits(RepostSvg, _Component);

  function RepostSvg() {
    _classCallCheck(this, RepostSvg);

    return _possibleConstructorReturn(this, (RepostSvg.__proto__ || Object.getPrototypeOf(RepostSvg)).apply(this, arguments));
  }

  _createClass(RepostSvg, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)(
        "svg",
        { className: "svg-repost", viewBox: "395 52 390 210" },
        (0, _preact.h)("path", {
          d: " M 570 220 L 490 220 L 490 160 L 520 160 C 530.71 160 540 151.53 540 140 C 540 132.5 536.09 127.66 530 120 L 490 71.88 C 483.90999999999997 64.69 478.13 60 470 60 C 461.87 60 456.09000000000003 64.69 450 71.88 L 410 120 C 403.91 127.66 400 132.5 400 140 C 400 151.53 409.29 160 420 160 L 450 160 L 450 240 C 450 251.04 458.96 260 470 260 L 570 260 C 581.04 260 590 251.04 590 240 C 590 228.96 581.04 220 570 220 Z  M 760 160 L 730 160 L 730 80 C 730 68.96 721.04 60 710 60 L 610 60 C 598.96 60 590 68.96 590 80 C 590 91.03999999999999 598.96 100 610 100 L 690 100 L 690 160 L 660 160 C 649.29 160 640 168.47000000000003 640 180 C 640 187.5 643.91 192.34000000000003 650 200 L 690 248.13 C 696.09 255.31 701.88 260 710 260 C 718.12 260 723.91 255.31 730 248.12 L 770 200 C 776.09 192.34000000000003 780 187.5 780 180 C 780 168.47000000000003 770.71 160 760 160 Z ",
          fill: "transparent",
          stroke: "var(--green)",
          "stroke-width": "15"
        })
      );
    }
  }]);

  return RepostSvg;
}(_preact.Component);

exports.default = RepostSvg;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map