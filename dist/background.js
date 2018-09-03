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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/li/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/li/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, definition, context) {

  //try CommonJS, then AMD (require.js), then use global.

  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  else context[name] = definition();

})('li', function () {
  // compile regular expressions ahead of time for efficiency
  var relsRegExp = /^;\s*([^"=]+)=(?:"([^"]+)"|([^";,]+)(?:[;,]|$))/;
  var sourceRegExp = /^<([^>]*)>/;
  var delimiterRegExp = /^\s*,\s*/;

  return {
    parse: function (linksHeader, options) {
      var match;
      var source;
      var rels;
      var extended = options && options.extended || false;
      var links = [];

      while (linksHeader) {
        linksHeader = linksHeader.trim();

        // Parse `<link>`
        source = sourceRegExp.exec(linksHeader);
        if (!source) break;

        var current = {
          link: source[1]
        };

        // Move cursor
        linksHeader = linksHeader.slice(source[0].length);

        // Parse `; attr=relation` and `; attr="relation"`

        var nextDelimiter = linksHeader.match(delimiterRegExp);
        while(linksHeader && (!nextDelimiter || nextDelimiter.index > 0)) {
          match = relsRegExp.exec(linksHeader);
          if (!match) break;

          // Move cursor
          linksHeader = linksHeader.slice(match[0].length);
          nextDelimiter = linksHeader.match(delimiterRegExp);


          if (match[1] === 'rel' || match[1] === 'rev') {
            // Add either quoted rel or unquoted rel
            rels = (match[2] || match[3]).split(/\s+/);
            current[match[1]] = rels;
          } else {
            current[match[1]] = match[2] || match[3];
          }
        }

        links.push(current);
        // Move cursor
        linksHeader = linksHeader.replace(delimiterRegExp, '');
      }

      if (!extended) {
        return links.reduce(function(result, currentLink) {
          if (currentLink.rel) {
            currentLink.rel.forEach(function(rel) {
              result[rel] = currentLink.link;
            });
          }
          return result;
        }, {});
      }

      return links;
    },
    stringify: function (params) {
      var grouped = Object.keys(params).reduce(function(grouped, key) {
        grouped[params[key]] = grouped[params[key]] || [];
        grouped[params[key]].push(key);
        return grouped;
      }, {});

      var entries = Object.keys(grouped).reduce(function(result, link) {
        return result.concat('<' + link + '>; rel="' + grouped[link].join(' ') + '"');
      }, []);

      return entries.join(', ');
    }
  };

}, this);


/***/ }),

/***/ "./node_modules/micropub-helper/src/dependencies-browser.js":
/*!******************************************************************!*\
  !*** ./node_modules/micropub-helper/src/dependencies-browser.js ***!
  \******************************************************************/
/*! exports provided: qsParse, qsStringify, li, relScraper, objectToFormData, appendQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qs */ "./node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "qsParse", function() { return qs__WEBPACK_IMPORTED_MODULE_0__["parse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "qsStringify", function() { return qs__WEBPACK_IMPORTED_MODULE_0__["stringify"]; });

/* harmony import */ var li__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! li */ "./node_modules/li/lib/index.js");
/* harmony import */ var li__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(li__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "li", function() { return li__WEBPACK_IMPORTED_MODULE_1___default.a; });
/* harmony import */ var _lib_rel_scraper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/rel-scraper */ "./node_modules/micropub-helper/src/lib/rel-scraper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "relScraper", function() { return _lib_rel_scraper__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _lib_object_to_form_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/object-to-form-data */ "./node_modules/micropub-helper/src/lib/object-to-form-data.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectToFormData", function() { return _lib_object_to_form_data__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _lib_append_query_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/append-query-string */ "./node_modules/micropub-helper/src/lib/append-query-string.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "appendQueryString", function() { return _lib_append_query_string__WEBPACK_IMPORTED_MODULE_4__["default"]; });








/***/ }),

/***/ "./node_modules/micropub-helper/src/lib/append-query-string.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micropub-helper/src/lib/append-query-string.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return appendQueryString; });
function appendQueryString(url, queryVars) {
  const firstSeperator = url.indexOf('?') == -1 ? '?' : '&';
  let queryStringParts = [];
  for (var key in queryVars) {
    if (Array.isArray(queryVars[key])) {
      queryVars[key].forEach(val => {
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

/***/ "./node_modules/micropub-helper/src/lib/object-to-form-data.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micropub-helper/src/lib/object-to-form-data.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return objectToFormData; });
// const FormData = require('form-data');

function objectToFormData(
  object,
  formData = new FormData(),
  name = false,
) {
  Object.keys(object).forEach(key => {
    const data = object[key];
    if (name) {
      key = name + '[' + key + ']';
    }
    if (Array.isArray(data)) {
      data.forEach(arrayItem => {
        const arrayData = {};
        arrayData[key + '[]'] = arrayItem;
        formData = objectToFormData(arrayData, formData);
      });
    } else {
      formData.append(key, data);
    }
  });
  return formData;
}


/***/ }),

/***/ "./node_modules/micropub-helper/src/lib/rel-scraper.js":
/*!*************************************************************!*\
  !*** ./node_modules/micropub-helper/src/lib/rel-scraper.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(htmlString, url) {
  let rels = {};
  let baseUrl = url;

  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  const baseEl = doc.querySelector('base[href]');
  const relEls = doc.querySelectorAll('[rel][href]');

  if (baseEl) {
    const value = baseEl.getAttribute('href');
    const urlObj = new URL(value, url);
    baseUrl = urlObj.toString();
  }

  if (relEls.length) {
    relEls.forEach(relEl => {
      const names = relEl
        .getAttribute('rel')
        .toLowerCase()
        .split('\\s+');
      const value = relEl.getAttribute('href');
      if (names.length && value !== null) {
        names.forEach(name => {
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

/***/ "./node_modules/micropub-helper/src/main.js":
/*!**************************************************!*\
  !*** ./node_modules/micropub-helper/src/main.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _dependencies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dependencies */ "./node_modules/micropub-helper/src/dependencies-browser.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


const qsParse = _dependencies__WEBPACK_IMPORTED_MODULE_0__["qsParse"];
const relScraper = _dependencies__WEBPACK_IMPORTED_MODULE_0__["relScraper"];
const qsStringify = _dependencies__WEBPACK_IMPORTED_MODULE_0__["qsStringify"];
const objectToFormData = _dependencies__WEBPACK_IMPORTED_MODULE_0__["objectToFormData"];
const appendQueryString = _dependencies__WEBPACK_IMPORTED_MODULE_0__["appendQueryString"];
const linkHeaderParser = _dependencies__WEBPACK_IMPORTED_MODULE_0__["li"].parse;
if (_dependencies__WEBPACK_IMPORTED_MODULE_0__["FormData"] && !global.FormData) {
  global.FormData = _dependencies__WEBPACK_IMPORTED_MODULE_0__["FormData"];
}
if (_dependencies__WEBPACK_IMPORTED_MODULE_0__["DOMParser"] && !global.DOMParser) {
  global.DOMParser = _dependencies__WEBPACK_IMPORTED_MODULE_0__["DOMParser"];
}
if (_dependencies__WEBPACK_IMPORTED_MODULE_0__["URL"] && !global.URL) {
  global.URL = _dependencies__WEBPACK_IMPORTED_MODULE_0__["URL"];
}

const defaultSettings = {
  me: '',
  scope: 'create delete update',
  token: '',
  authEndpoint: '',
  tokenEndpoint: '',
  micropubEndpoint: '',
};

/**
 * Creates an error object
 * @param {string} message A human readable error message
 * @param {int} status A http response status from the micropub endpoint
 * @param {object} error A full error object if available
 * @return {object} A consistently formatted error object
 */
const micropubError = (message, status = null, error = null) => {
  return {
    message: message,
    status: status,
    error: error,
  };
};

/**
 * A micropub helper class
 */
class Micropub {
  /**
   * Micropub class constructor
   * @param {object} userSettings Settings supplied for this micropub client
   */
  constructor(userSettings = {}) {
    this.options = Object.assign({}, defaultSettings, userSettings);

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
    };
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
      axios__WEBPACK_IMPORTED_MODULE_1___default()({ url, method: 'get', responseType: 'text' })
        .then(res => {
          // Check for endpoints in headers
          const linkHeaders = res.headers.link;
          if (linkHeaders) {
            const links = linkHeaderParser(linkHeaders);
            Object.keys(endpoints).forEach(key => {
              if (links[key]) {
                endpoints[key] = links[key];
              }
            });
          }

          const html = res.data;

          // Get rel links
          const rels = relScraper(html, baseUrl);

          // Save necessary endpoints.
          this.options.me = url;
          if (rels) {
            Object.keys(endpoints).forEach(key => {
              if (rels[key] && rels[key][0]) {
                endpoints[key] = rels[key][0];
              }
            });
          }

          if (
            endpoints.micropub &&
            endpoints.authorization_endpoint &&
            endpoints.token_endpoint
          ) {
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
        .catch(err =>
          reject(micropubError('Error fetching url', err.response.status, err)),
        );
    });
  }

  /**
   * Exchanges a code for an access token
   * @param {string} code A code received from the auth endpoint
   * @return {promise} Promise which resolves with the access token on success
   */
  getToken(code) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions([
        'me',
        'clientId',
        'redirectUri',
        'tokenEndpoint',
      ]);
      if (!requirements.pass) {
        return reject(
          micropubError(
            'Missing required options: ' + requirements.missing.join(', '),
          ),
        );
      }

      const data = {
        grant_type: 'authorization_code',
        me: this.options.me,
        code: code,
        client_id: this.options.clientId,
        redirect_uri: this.options.redirectUri,
      };

      const request = {
        url: this.options.tokenEndpoint,
        method: 'POST',
        data: qsStringify(data),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          accept: 'application/json, application/x-www-form-urlencoded',
        },
      };
      // This could maybe use the postMicropub method
      axios__WEBPACK_IMPORTED_MODULE_1___default()(request)
        .then(res => {
          let result = res.data;
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
            return reject(
              micropubError(
                'The token endpoint did not return the expected parameters',
              ),
            );
          }
          // Check me is the same (removing any trailing slashes)
          if (
            result.me &&
            result.me.replace(/\/+$/, '') !==
              this.options.me.replace(/\/+$/, '')
          ) {
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
        .catch(err =>
          reject(
            micropubError(
              'Error requesting token endpoint',
              err.response.status,
              err,
            ),
          ),
        );
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
        return reject(
          micropubError(
            'Missing required options: ' + requirements.missing.join(', '),
          ),
        );
      }
      this.getEndpointsFromUrl(this.options.me)
        .then(() => {
          let requirements = this.checkRequiredOptions([
            'me',
            'state',
            'scope',
            'clientId',
            'redirectUri',
          ]);
          if (!requirements.pass) {
            return reject(
              micropubError(
                'Missing required options: ' + requirements.missing.join(', '),
              ),
            );
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
        .catch(err =>
          reject(micropubError('Error getting auth url', null, err)),
        );
    });
  }

  /**
   * Verify the stored access token
   * @return {promise} A promise that resolves true or rejects
   */
  verifyToken() {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions([
        'token',
        'micropubEndpoint',
      ]);
      if (!requirements.pass) {
        return reject(
          micropubError(
            'Missing required options: ' + requirements.missing.join(', '),
          ),
        );
      }

      const request = {
        url: this.options.micropubEndpoint,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.options.token,
        },
      };

      axios__WEBPACK_IMPORTED_MODULE_1___default()(request)
        .then(res => {
          return fulfill(true);
        })
        .catch(err =>
          reject(
            micropubError('Error verifying token', err.response.status, err),
          ),
        );
    });
  }

  /**
   * Creates a micropub post
   * @param {object} post Micropub post data
   * @param {string} type The type of form encoding to use
   * @return {promise} Resolves on success with the url of the post or null if could not read the location header.
   */
  create(post, type = 'json') {
    return this.postMicropub(post, type);
  }

  /**
   * Updates a micropub post
   * @param {string} url The url of the post to update
   * @param {object} update The micropub update object
   * @return {promise} Resolves on success with the url of the post or null if could not read the location header.
   */
  update(url, update) {
    return this.postMicropub(
      Object.assign(
        {
          action: 'update',
          url: url,
        },
        update,
      ),
    );
  }

  /**
   * Deletes a micropub post
   * @param {string} url The url of a post to delete
   * @return {promise} Resolves on successful deletion
   */
  delete(url) {
    return this.postMicropub({
      action: 'delete',
      url: url,
    });
  }

  /**
   * Undeletes a post
   * @param {string} url The url of a post to undelete
   *  @return {promise} Resolves on successful undeletion
   */
  undelete(url) {
    return this.postMicropub({
      action: 'undelete',
      url: url,
    });
  }

  /**
   * Posts a micropub object
   * @param {object} object A micropub post
   * @param {string} type The type of form encoding for the post
   * @return {promise} Resolves with the returned location header or null on success
   */
  postMicropub(object, type = 'json') {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions([
        'token',
        'micropubEndpoint',
      ]);
      if (!requirements.pass) {
        return reject(
          micropubError(
            'Missing required options: ' + requirements.missing.join(', '),
          ),
        );
      }

      let request = {
        url: this.options.micropubEndpoint,
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + this.options.token,
        },
      };

      if (type == 'json') {
        request.data = JSON.stringify(object);
        request.headers['content-type'] = 'application/json';
      } else if (type == 'form') {
        request.data = qsStringify(object, { arrayFormat: 'brackets' });
        request.headers['content-type'] =
          'application/x-www-form-urlencoded;charset=UTF-8';
        request.headers.accept =
          'application/json, application/x-www-form-urlencoded';
      } else if (type == 'multipart') {
        request.data = objectToFormData(object);
        request.headers.accept =
          'application/json, application/x-www-form-urlencoded';
      }

      axios__WEBPACK_IMPORTED_MODULE_1___default()(request)
        .then(result => {
          if (result.headers.location) {
            return fulfill(result.headers.location);
          }
          if (typeof result.data === 'string') {
            result.data = qsParse(result.data);
          }
          if (result.data.error_description) {
            return reject(micropubError(result.data.error_description));
          } else if (result.data.error) {
            return reject(micropubError(result.data.error));
          } else {
            if (
              Object.keys(result.data).length === 0 &&
              result.data.constructor === Object
            ) {
              return fulfill(null);
            }
            return fulfill(result.data);
          }
        })
        .catch(err =>
          reject(
            micropubError('Error sending request', err.response.status, err),
          ),
        );
    });
  }

  /**
   * Posts a file to the media endpoint
   * @param {Buffer|ReadableStream} file The file to post
   * @return {promise} Resolves on success with the url of the created file, or null if could not read location
   */
  postMedia(file) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions([
        'token',
        'mediaEndpoint',
      ]);
      if (!requirements.pass) {
        return reject(
          micropubError(
            'Missing required options: ' + requirements.missing.join(', '),
          ),
        );
      }

      let request = {
        url: this.options.mediaEndpoint,
        method: 'POST',
        data: objectToFormData({ file: file }),
        headers: {
          authorization: 'Bearer ' + this.options.token,
          accept: '*/*',
        },
      };

      axios__WEBPACK_IMPORTED_MODULE_1___default()(request)
        .then(res => {
          if (res.status !== 201) {
            return reject(micropubError('Error creating media', res.status));
          }
          const location = res.headers.location;
          if (location) {
            return fulfill(location);
          } else {
            return reject(
              micropubError(
                'Media endpoint did not return a location',
                res.status,
              ),
            );
          }
        })
        .catch(err =>
          reject(
            micropubError('Error sending request', err.response.status, err),
          ),
        );
    });
  }

  /**
   * Querys the micropub endpoint, for the config for example
   * @param {string} type The type passed the the micropub q parameter
   * @return {promise} Resolves with the object that the server replied with
   */
  query(type) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions([
        'token',
        'micropubEndpoint',
      ]);
      if (!requirements.pass) {
        return reject(
          micropubError(
            'Missing required options: ' + requirements.missing.join(', '),
          ),
        );
      }

      const url = appendQueryString(this.options.micropubEndpoint, { q: type });

      const request = {
        url,
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + this.options.token,
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          accept: 'application/json',
        },
      };

      axios__WEBPACK_IMPORTED_MODULE_1___default()(request)
        .then(res => fulfill(res.data))
        .catch(err =>
          reject(
            micropubError('Error getting ' + type, err.response.status, err),
          ),
        );
    });
  }

  /**
   * Query for the source of a post
   * @param {string} url The url of the post to query
   * @param {array} properties An array of properties to query for
   * @return {promise} A promise which resolves with the returned mf2 json / properties
   */
  querySource(url, properties = []) {
    return new Promise((fulfill, reject) => {
      const requirements = this.checkRequiredOptions([
        'token',
        'micropubEndpoint',
      ]);
      if (!requirements.pass) {
        return reject(
          micropubError(
            'Missing required options: ' + requirements.missing.join(', '),
          ),
        );
      }

      url = appendQueryString(this.options.micropubEndpoint, {
        q: 'source',
        url: url,
        properties: properties,
      });

      const request = {
        url,
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + this.options.token,
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          accept: 'application/json',
        },
      };

      axios__WEBPACK_IMPORTED_MODULE_1___default()(request)
        .then(res => fulfill(res.data))
        .catch(err =>
          reject(
            micropubError('Error getting source', err.response.status, err),
          ),
        );
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Micropub);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/parse-uri/index.js":
/*!*****************************************!*\
  !*** ./node_modules/parse-uri/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseURI (str, opts) {
  opts = opts || {}

  var o = {
    key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
    q: {
      name: 'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  }

  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str)
  var uri = {}
  var i = 14

  while (i--) uri[o.key[i]] = m[i] || ''

  uri[o.q.name] = {}
  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2
  })

  return uri
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
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

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

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

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

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

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
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

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
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
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
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
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
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

var compact = function compact(value) {
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

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _url = __webpack_require__(/*! ./util/url */ "./src/util/url.js");

var _authentication = __webpack_require__(/*! ./background/authentication */ "./src/background/authentication.js");

var _utils = __webpack_require__(/*! ./util/utils */ "./src/util/utils.js");

var _log = __webpack_require__(/*! ./util/log */ "./src/util/log.js");

var authTabId = null;
var menuId = void 0;

function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'begin-auth':
      handleBeginAuth(request.payload);
      break;
    case 'focus-window':
      updateFocusedWindow(sender.tab.id, request.payload.pageEntry, request.payload.selectedEntry);
      break;
    case 'select-entry':
      selectEntry(request.payload);
      break;
    case 'clear-entry':
      clearEntry();
  }
}

function handleBeginAuth(payload) {
  localStorage.setItem('domain', payload.domain);
  localStorage.setItem('authEndpoint', payload.metadata.authEndpoint);
  localStorage.setItem('tokenEndpoint', payload.metadata.tokenEndpoint);
  localStorage.setItem('micropubEndpoint', payload.metadata.micropub);
  chrome.tabs.create({ url: payload.authUrl }, function (tab) {
    authTabId = tab.id;
  });
}

function updateFocusedWindow(tabId, pageEntry, selectedEntry) {
  localStorage.setItem('pageEntry', JSON.stringify(pageEntry));
  localStorage.setItem('pageTabId', tabId);
  if (selectedEntry) {
    selectEntry(selectedEntry);
  } else {
    clearEntry();
  }
}

function selectEntry(entry) {
  localStorage.setItem('itemEntry', JSON.stringify(entry));
}

function clearEntry() {
  localStorage.removeItem('itemEntry');
}

function handleTabChange(tabId, changeInfo, tab) {
  if (tabId !== authTabId || !isAuthRedirect(changeInfo)) {
    return;
  }
  var code = (0, _url.getParamFromUrl)('code', changeInfo.url);
  (0, _log.info)('Auth code found beginning \'' + code.substr(0, 6) + '\'. Fetching token\u2026');
  (0, _authentication.fetchToken)(code).then(function () {
    (0, _log.info)('Token retrieved. Fetching syndication targets…');
    return (0, _authentication.fetchSyndicationTargets)();
  }).then(function () {
    (0, _log.info)('Authentication complete. Closing authentication tab.');
    chrome.tabs.remove(tab.id);
    authTabId = null;
  }).catch(function (err) {
    (0, _log.error)(err.message, err);
  });
}

function isAuthRedirect(changeInfo) {
  var url = 'https://omnibear.com/auth/success';
  return changeInfo.url && changeInfo.url.startsWith(url);
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.tabs.onUpdated.addListener(handleTabChange);
menuId = chrome.contextMenus.create({
  title: 'Reply to entry',
  contexts: ['page', 'selection'],
  onclick: function onclick() {
    if (typeof browser === 'undefined') {
      // Chrome
      window.open('index.html?type=reply', 'extension_popup', 'width=450,height=510,status=no,scrollbars=yes,resizable=no,top=80,left=2000');
    } else {
      // Firefox (and others?)
      browser.windows.create({
        url: 'index.html?type=reply',
        width: 450,
        height: 580,
        type: 'panel',
        left: 2000
      });
    }
  }
});

/***/ }),

/***/ "./src/background/authentication.js":
/*!******************************************!*\
  !*** ./src/background/authentication.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchToken = fetchToken;
exports.fetchSyndicationTargets = fetchSyndicationTargets;

var _micropub = __webpack_require__(/*! ../util/micropub */ "./src/util/micropub.js");

var _micropub2 = _interopRequireDefault(_micropub);

var _url = __webpack_require__(/*! ../util/url */ "./src/util/url.js");

var _utils = __webpack_require__(/*! ../util/utils */ "./src/util/utils.js");

var _log = __webpack_require__(/*! ../util/log */ "./src/util/log.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchToken(code) {
  _micropub2.default.options.me = localStorage.getItem('domain');
  _micropub2.default.options.tokenEndpoint = localStorage.getItem('tokenEndpoint');
  _micropub2.default.options.micropubEndpoint = localStorage.getItem('micropubEndpoint');
  return _micropub2.default.getToken(code).then(function (token) {
    if (!token) {
      throw new Error('Token not found in token endpoint response. Missing expected field `access_token`');
    }
    localStorage.setItem('token', token);
    _micropub2.default.options.token = token;
  }).catch(function (err) {
    (0, _log.error)('Error fetching token', err);
    (0, _utils.getAuthTab)().then(function (tab) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'fetch-token-error',
        payload: {
          error: err
        }
      });
      (0, _utils.logout)();
    });
  });
}

function fetchSyndicationTargets() {
  return _micropub2.default.query('syndicate-to').then(function (response) {
    var syndicateTo = response['syndicate-to'];
    (0, _log.info)('Syndication targets retreived', syndicateTo);
    if (Array.isArray(syndicateTo)) {
      localStorage.setItem('syndicateTo', JSON.stringify(syndicateTo));
    } else {
      (0, _log.warning)('Syndication targets not in array format. Saving as empty array.');
      localStorage.setItem('syndicateTo', JSON.stringify([]));
    }
  });
}

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NOTE = exports.NOTE = 'note';
var REPLY = exports.REPLY = 'reply';
var BOOKMARK = exports.BOOKMARK = 'bookmark';
var REPOST = exports.REPOST = 'repost';
var LIKE = exports.LIKE = 'like';
var SETTINGS = exports.SETTINGS = 'settings';
var LOGS = exports.LOGS = 'logs';
var LOGIN = exports.LOGIN = 'login';
var MESSAGE = exports.MESSAGE = 'message';

var PAGE_REPLY = exports.PAGE_REPLY = 'page-reply';
var ITEM_REPLY = exports.ITEM_REPLY = 'item-reply';

var MESSAGE_SUCCESS = exports.MESSAGE_SUCCESS = 'success';
var MESSAGE_ERROR = exports.MESSAGE_ERROR = 'error';

var DEFAULT_REACJI = exports.DEFAULT_REACJI = ['👍', '👎', '🎉', '😆', '😢', '😠'];

/***/ }),

/***/ "./src/util/log.js":
/*!*************************!*\
  !*** ./src/util/log.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogs = getLogs;
exports.clearLogs = clearLogs;
exports.info = info;
exports.warning = warning;
exports.error = error;

var _settings = __webpack_require__(/*! ./settings */ "./src/util/settings.js");

var INFO = 'info';
var WARNING = 'warning';
var ERROR = 'error';

function getLogs() {
  var log = JSON.parse(localStorage.getItem('log'));
  if (log) {
    return log;
  }
  return [];
}

function saveLog(log) {
  localStorage.setItem('log', JSON.stringify(log));
}

function clearLogs() {
  localStorage.setItem('log', '[]');
}

function formatDate(date) {
  var day = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
  return day + ' ' + time;
}

function append(message, data, type) {
  if (!logsEnabled() && type !== ERROR) {
    return;
  }
  var log = getLogs();
  if (log.length > 100) {
    log.unshift();
  }
  var entry = {
    message: message,
    type: type,
    timestamp: formatDate(new Date())
  };
  if (data) {
    if (data instanceof Error) {
      entry.data = serializeError(data);
    } else {
      entry.data = data;
    }
  }
  log.push(entry);
  saveLog(log);
}

function serializeError(err) {
  return {
    message: err.message,
    stack: err.stack.trim().split('\n')
  };
}

function info(message, data) {
  append(message, data, INFO);
}
exports.default = info;
function warning(message, data) {
  append(message, data, WARNING);
}

function error(message, data) {
  append(message, data, ERROR);
}

function logsEnabled() {
  var settings = (0, _settings.getSettings)();
  return settings.debugLog;
}

/***/ }),

/***/ "./src/util/micropub.js":
/*!******************************!*\
  !*** ./src/util/micropub.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postNote = postNote;
exports.postReply = postReply;
exports.postBookmark = postBookmark;
exports.postLike = postLike;
exports.postRepost = postRepost;

var _micropubHelper = __webpack_require__(/*! micropub-helper */ "./node_modules/micropub-helper/src/main.js");

var _micropubHelper2 = _interopRequireDefault(_micropubHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var micropub = new _micropubHelper2.default({
  clientId: 'https://omnibear.com',
  redirectUri: 'https://omnibear.com/auth/success/',
  state: 'very-secret-omnibear-state',
  me: localStorage.getItem('domain'),
  authEndpoint: localStorage.getItem('authEndpoint'),
  tokenEndpoint: localStorage.getItem('tokenEndpoint'),
  micropubEndpoint: localStorage.getItem('micropubEndpoint'),
  token: localStorage.getItem('token'),
  scope: 'create delete update'
});
exports.default = micropub;
function postNote(entry, aliases) {
  var _micropub$create;

  return micropub.create((_micropub$create = {
    h: 'entry',
    content: entry.content,
    category: entry.tagsArray
  }, _defineProperty(_micropub$create, aliases.slug, entry.slug), _defineProperty(_micropub$create, aliases.syndicateTo, entry.syndicateList), _micropub$create), 'form');
}

function postReply(entry, url, aliases) {
  var _micropub$create2;

  return micropub.create((_micropub$create2 = {
    h: 'entry',
    'in-reply-to': url,
    content: entry.content,
    category: entry.tagsArray
  }, _defineProperty(_micropub$create2, aliases.slug, entry.slug), _defineProperty(_micropub$create2, aliases.syndicateTo, entry.syndicateList), _micropub$create2), 'form');
}

function postBookmark(entry, url, aliases) {
  var _micropub$create3;

  return micropub.create((_micropub$create3 = {
    h: 'entry',
    'bookmark-of': url,
    name: entry.title,
    content: entry.content,
    category: entry.tagsArray
  }, _defineProperty(_micropub$create3, aliases.slug, entry.slug), _defineProperty(_micropub$create3, aliases.syndicateTo, entry.syndicateList), _micropub$create3), 'form');
}

function postLike(url) {
  var entry = {
    h: 'entry',
    'like-of': url
  };
  return micropub.create(entry, 'form');
}

function postRepost(url) {
  var entry = {
    h: 'entry',
    'repost-of': url
  };
  return micropub.create(entry, 'form');
}

/***/ }),

/***/ "./src/util/settings.js":
/*!******************************!*\
  !*** ./src/util/settings.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSettings = getSettings;
exports.saveSettings = saveSettings;
exports.saveAuthenticationDetails = saveAuthenticationDetails;
exports.getSyndicateOptions = getSyndicateOptions;

var _micropub = __webpack_require__(/*! ./micropub */ "./src/util/micropub.js");

var _micropub2 = _interopRequireDefault(_micropub);

var _constants = __webpack_require__(/*! ../constants */ "./src/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEYS = ['defaultToCurrentPage', 'autoSlug', 'closeAfterPosting', 'debugLog', 'reacji', 'slug', 'syndicateTo'];

var DEFAULT_SETTINGS = {
  defaultToCurrentPage: false,
  autoSlug: false,
  closeAfterPosting: true,
  debugLog: false,
  reacji: _constants.DEFAULT_REACJI,
  slug: 'mp-slug',
  syndicateTo: 'mp-syndicate-to'
};

function getSettings() {
  var settings = JSON.parse(localStorage.getItem('settings'));
  if (settings) {
    return settings;
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings) {
  var clean = {};
  KEYS.forEach(function (key) {
    clean[key] = settings[key];
  });
  localStorage.setItem('settings', JSON.stringify(clean));
}

function saveAuthenticationDetails(domain, token, micropubEndpoint) {
  if (domain) {
    localStorage.setItem('domain', domain);
    _micropub2.default.options.me = domain;
  }
  if (token) {
    localStorage.setItem('token', token);
    _micropub2.default.options.token = token;
  }
  if (micropubEndpoint) {
    localStorage.setItem('micropubEndpoint', micropubEndpoint);
    _micropub2.default.options.micropubEndpoint = micropubEndpoint;
  }
}

function getSyndicateOptions() {
  var options = localStorage.getItem('syndicateTo');
  if (options && options !== 'undefined') {
    return JSON.parse(options);
  } else {
    // Fix bad data from omnibear v1.0.0 bug that saved 'undefined' to localStorage
    localStorage.setItem('syndicateTo', '[]');
    return [];
  }
}

/***/ }),

/***/ "./src/util/url.js":
/*!*************************!*\
  !*** ./src/util/url.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParamFromUrl = getParamFromUrl;
exports.getParamFromUrlString = getParamFromUrlString;
exports.cleanParams = cleanParams;
exports.paramsToQueryString = paramsToQueryString;
exports.getUrlOrigin = getUrlOrigin;
exports.cleanUrl = cleanUrl;

var _parseUri = __webpack_require__(/*! parse-uri */ "./node_modules/parse-uri/index.js");

var _parseUri2 = _interopRequireDefault(_parseUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParamFromUrl(paramName, url) {
  var params = url.split('?')[1] || '';
  return getParamFromUrlString(paramName, params);
}

function getParamFromUrlString(paramName, params) {
  var matches = params.split('&').filter(function (param) {
    return param.startsWith(paramName + '=');
  });
  if (matches && matches.length) {
    var value = matches[0].substr(paramName.length + 1);
    return decodeURIComponent(value);
  } else {
    return null;
  }
}

function cleanParams(params) {
  var clean = {};
  for (var i in params) {
    if (!i.startsWith('utm_')) {
      clean[i] = params[i];
    }
  }
  return clean;
}

function paramsToQueryString(params) {
  var parts = [];
  for (var i in params) {
    parts.push(i + '=' + params[i]);
  }
  if (!parts.length) {
    return '';
  }
  return '?' + parts.join('&');
}

function getUrlOrigin(url) {
  var parts = (0, _parseUri2.default)(url);
  return [parts.protocol, '://', parts.host, parts.port ? ':' + parts.port : ''].join('');
}

// strip hashes and utm_* query params
function cleanUrl(url) {
  var parts = (0, _parseUri2.default)(url);
  var base = [parts.protocol, '://', parts.host, parts.port ? ':' + parts.port : '', parts.path, paramsToQueryString(cleanParams(parts.queryKey))].join('');
  return base;
}

/***/ }),

/***/ "./src/util/utils.js":
/*!***************************!*\
  !*** ./src/util/utils.js ***!
  \***************************/
/*! no static exports found */
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
exports.getPageUrl = getPageUrl;
exports.sanitizeError = sanitizeError;
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

var NON_ALPHANUM = /[^A-Za-z0-9-]/g;
var FROM = 'áäâàãåčçćďéěëèêẽĕȇęėíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
var TO = 'aaaaaacccdeeeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';

function generateSlug(content) {
  var formatted = content.toLocaleLowerCase().trim();
  formatted = formatted.replace(/\s/g, '-');
  for (var i = 0, l = FROM.length; i < l; i++) {
    formatted = formatted.replace(new RegExp(FROM.charAt(i), 'g'), TO.charAt(i));
  }
  formatted = formatted.replace(NON_ALPHANUM, '');
  formatted = formatted.replace(/--+/g, '-');
  var parts = formatted.split('-');
  return parts.splice(0, 6).join('-');
}

function getPageUrl() {
  return new Promise(function (resolve) {
    var tabId = localStorage.getItem('pageTabId');
    chrome.tabs.get(Number(tabId), function (tab) {
      resolve(tab.url);
    });
  });
}

function sanitizeError(error) {
  if (!error) {
    return null;
  }
  var clean = {
    message: error.message,
    status: Number(error.status)
  };
  var config = error.config || error.error && error.error.config;
  if (!config) {
    return clean;
  }
  clean.data = config.data;
  clean.method = config.method;
  clean.url = config.url;
  if (config.headers) {
    clean.headers = {
      Accept: config.headers.Accept,
      'Content-Type': config.headers['Content-Type']
    };
  }
  if (config.response) {
    clean.response = {
      data: config.response.data,
      status: config.response.status,
      statusText: config.response.statusText
    };
  }
  return clean;
}

/***/ })

/******/ });
//# sourceMappingURL=background.js.map