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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/page/dom.js":
/*!*************************!*\
  !*** ./src/page/dom.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getAncestorNodeByClass = getAncestorNodeByClass;\nexports.getAncestorNode = getAncestorNode;\nfunction getAncestorNodeByClass(element, className) {\n  if (!Array.isArray(className)) {\n    className = [className];\n  }\n  return getAncestorNode(element, function (el) {\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = className[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var cn = _step.value;\n\n        if (el.classList.contains(cn)) {\n          return true;\n        }\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator.return) {\n          _iterator.return();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n\n    return false;\n  });\n}\n\nfunction getAncestorNode(el, filter) {\n  while (!filter(el) && el.tagName != 'BODY') {\n    el = el.parentElement;\n  }\n  if (!filter(el)) {\n    // el is <body> (and doesn't match filter)\n    return null;\n  }\n  return el;\n}\n\n//# sourceURL=webpack:///./src/page/dom.js?");

/***/ }),

/***/ "./src/page/dom.test.js":
/*!******************************!*\
  !*** ./src/page/dom.test.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _chai = __webpack_require__(/*! chai */ \"chai\");\n\nvar _jsdom = __webpack_require__(/*! jsdom */ \"jsdom\");\n\nvar _dom = __webpack_require__(/*! ./dom */ \"./src/page/dom.js\");\n\ndescribe('page/dom', function () {\n  describe('getAncestorNodeByClass', function () {\n    it('should find container node', function () {\n      var document = (0, _jsdom.jsdom)('\\n        <body>\\n          <div class=\"target\" id=\"the-container\">\\n            <div>\\n              <button id=\"el\">click</button>\\n            </div>\\n          </div>\\n        </body>\\n      ');\n      var el = document.getElementById('el');\n      // compare ids for equality check\n      _chai.assert.equal((0, _dom.getAncestorNodeByClass)(el, 'target').id, 'the-container');\n      _chai.assert.equal(true, false);\n    });\n\n    it('should find return null if not found', function () {\n      var document = (0, _jsdom.jsdom)('\\n        <body>\\n          <div>\\n            <div>\\n              <button id=\"el\">click</button>\\n            </div>\\n          </div>\\n        </body>\\n      ');\n      var el = document.getElementById('el');\n      _chai.assert.isNull((0, _dom.getAncestorNodeByClass)(el, 'target'));\n    });\n\n    it('should not find find target if not a direct ancestor', function () {\n      var document = (0, _jsdom.jsdom)('\\n        <body>\\n          <div>\\n            <div>\\n              <button id=\"el\">click</button>\\n            </div>\\n            <div class=\"target\">the target</div>\\n          </div>\\n        </body>\\n      ');\n      var el = document.getElementById('el');\n      _chai.assert.isNull((0, _dom.getAncestorNodeByClass)(el, 'target'));\n    });\n\n    it('should match from array', function () {\n      var document = (0, _jsdom.jsdom)('\\n        <body>\\n          <div class=\"target\" id=\"the-container\">\\n            <div>\\n              <button id=\"el\">click</button>\\n            </div>\\n          </div>\\n        </body>\\n      ');\n      var el = document.getElementById('el');\n      var match = (0, _dom.getAncestorNodeByClass)(el, ['other', 'target']);\n      _chai.assert.equal(match.id, 'the-container');\n    });\n\n    it('should return body if it matches', function () {\n      var document = (0, _jsdom.jsdom)('\\n        <body class=\"target\" id=\"the-container\">\\n          <div>\\n            <div>\\n              <button id=\"el\">click</button>\\n            </div>\\n          </div>\\n        </body>\\n      ');\n      var el = document.getElementById('el');\n      // compare ids for equality check\n      _chai.assert.equal((0, _dom.getAncestorNodeByClass)(el, 'target').id, 'the-container');\n    });\n  });\n\n  describe('getAncestorNode', function () {\n    it('should find matching element', function () {\n      var document = (0, _jsdom.jsdom)('\\n        <body>\\n          <div id=\"foo_123\">\\n            <div id=\"ignored_321\">\\n              <button id=\"el\">click</button>\\n            </div>\\n          </div>\\n        </body>\\n      ');\n      var el = document.getElementById('el');\n      var match = (0, _dom.getAncestorNode)(el, function (e) {\n        return e.id.startsWith('foo_');\n      });\n      _chai.assert.equal(match.id, 'foo_123');\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/page/dom.test.js?");

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi ./src/page/dom.test.js dist/out.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /Users/kgrant/src/self/omnibear/src/page/dom.test.js */\"./src/page/dom.test.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'dist/out.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n//# sourceURL=webpack:///multi_./src/page/dom.test.js_dist/out.js?");

/***/ }),

/***/ "chai":
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chai\");\n\n//# sourceURL=webpack:///external_%22chai%22?");

/***/ }),

/***/ "jsdom":
/*!************************!*\
  !*** external "jsdom" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsdom\");\n\n//# sourceURL=webpack:///external_%22jsdom%22?");

/***/ })

/******/ });