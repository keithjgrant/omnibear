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
      fetch(url, { credentials: 'omit' })
        .then(res => {
          if (!res.ok) {
            return reject(micropubError('Error getting page', res.status));
          }
          baseUrl = res.url;

          // Check for endpoints in headers
          const linkHeaders = res.headers.get('link');
          if (linkHeaders) {
            const links = linkHeaderParser(linkHeaders);
            Object.keys(endpoints).forEach(key => {
              if (links[key]) {
                endpoints[key] = links[key];
              }
            });
          }

          return res.text();
        })
        .then(html => {
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
        .catch(err => reject(micropubError('Error fetching url', null, err)));
    });
  }

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
        method: 'POST',
        credentials: 'omit',
        body: qsStringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json, application/x-www-form-urlencoded',
        },
        // mode: 'cors',
      };
      // This could maybe use the postMicropub method
      fetch(this.options.tokenEndpoint, request)
        .then(res => {
          if (!res.ok) {
            return reject(micropubError('Error getting token', res.status));
          }
          const contentType = res.headers.get('Content-Type');
          if (contentType && contentType.indexOf('application/json') === 0) {
            return res.json();
          } else {
            return res.text();
          }
        })
        .then(result => {
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
          reject(micropubError('Error requesting token endpoint', null, err)),
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
        method: 'GET',
        credentials: 'omit',
        headers: {
          Authorization: 'Bearer ' + this.options.token,
        },
      };

      fetch(this.options.micropubEndpoint, request)
        .then(res => {
          if (res.ok) {
            return fulfill(true);
          } else {
            return reject(micropubError('Error verifying token', res.status));
          }
        })
        .catch(err =>
          reject(micropubError('Error verifying token', null, err)),
        );
    });
  }

  create(post, type = 'json') {
    return this.postMicropub(post, type);
  }

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

  delete(url) {
    return this.postMicropub({
      action: 'delete',
      url: url,
    });
  }

  undelete(url) {
    return this.postMicropub({
      action: 'undelete',
      url: url,
    });
  }

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
        method: 'POST',
        credentials: 'omit',
      };

      if (type == 'json') {
        request.body = JSON.stringify(object);
        request.headers = {
          Authorization: 'Bearer ' + this.options.token,
          'Content-Type': 'application/json',
          Accept: 'application/json, application/x-www-form-urlencoded',
        };
      } else if (type == 'form') {
        request.body = qsStringify(object, { arrayFormat: 'brackets' });
        request.headers = {
          Authorization: 'Bearer ' + this.options.token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json, application/x-www-form-urlencoded',
        };
      } else if (type == 'multipart') {
        request.body = objectToFormData(object);
        request.headers = {
          Authorization: 'Bearer ' + this.options.token,
          Accept: 'application/json, application/x-www-form-urlencoded',
        };
      }

      fetch(this.options.micropubEndpoint, request)
        .then(res => {
          if (!res.ok) {
            return reject(
              micropubError('Error with micropub request', res.status),
            );
          }
          const location =
            res.headers.get('Location') || res.headers.get('location');
          if (location) {
            return fulfill(location);
          }
          const contentType = res.headers.get('Content-Type');
          if (contentType && contentType.indexOf('application/json') === 0) {
            return res.json();
          } else {
            return res.text();
          }
        })
        .then(result => {
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
        .catch(err =>
          reject(micropubError('Error sending request', null, err)),
        );
    });
  }

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
        method: 'POST',
        credentials: 'omit',
        body: objectToFormData({ file: file }),
        headers: {
          Authorization: 'Bearer ' + this.options.token,
          Accept: '*/*',
        },
      };

      fetch(this.options.mediaEndpoint, request)
        .then(res => {
          if (res.status !== 201) {
            return reject(micropubError('Error creating media', res.status));
          }
          const location =
            res.headers.get('Location') || res.headers.get('location');
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
        .catch(err => reject(micropubError('Error sending request')));
    });
  }

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
        method: 'GET',
        credentials: 'omit',
        headers: {
          Authorization: 'Bearer ' + this.options.token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
        },
        // mode: 'cors',
      };

      fetch(url, request)
        .then(res => {
          if (!res.ok) {
            return reject(micropubError('Error getting ' + type, res.status));
          }
          return res.json();
        })
        .then(json => fulfill(json))
        .catch(err =>
          reject(micropubError('Error getting ' + type, null, err)),
        );
    });
  }

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
        method: 'GET',
        credentials: 'omit',
        headers: {
          Authorization: 'Bearer ' + this.options.token,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
        },
        // mode: 'cors',
      };

      fetch(url, request)
        .then(res => {
          if (!res.ok) {
            return reject(micropubError('Error getting source', res.status));
          }
          return res.json();
        })
        .then(json => fulfill(json))
        .catch(err => reject(micropubError('Error getting source', null, err)));
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


var _browser = __webpack_require__(/*! ./browser */ "./src/browser.js");

var _browser2 = _interopRequireDefault(_browser);

var _url = __webpack_require__(/*! ./util/url */ "./src/util/url.js");

var _utils = __webpack_require__(/*! ./util/utils */ "./src/util/utils.js");

var _authentication = __webpack_require__(/*! ./background/authentication */ "./src/background/authentication.js");

var _log = __webpack_require__(/*! ./util/log */ "./src/util/log.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authTabId = null;

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
  _browser2.default.tabs.create({ url: payload.authUrl }, function (tab) {
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
  setTimeout(function () {
    sendAuthStatusUpdate('Retrieving access token\u2026');
    (0, _authentication.fetchToken)(code).then(function () {
      sendAuthStatusUpdate('Fetching syndication targets…');
      return (0, _authentication.fetchSyndicationTargets)();
    }).then(function () {
      sendAuthStatusUpdate('Authentication complete.');
      authTabId = null;
      setTimeout(function () {
        _browser2.default.tabs.remove(tab.id);
      }, 500);
    }).catch(function (err) {
      (0, _log.error)(err.message, err);
    });
  }, 500);
}

function sendAuthStatusUpdate(message) {
  (0, _log.info)(message);
  (0, _utils.getAuthTab)().then(function (tab) {
    _browser2.default.tabs.sendMessage(tab.id, {
      action: 'auth-status-update',
      payload: { message: message }
    });
  });
}

function isAuthRedirect(changeInfo) {
  var url = 'https://omnibear.com/auth/success';
  return changeInfo.url && changeInfo.url.startsWith(url);
}

_browser2.default.runtime.onMessage.addListener(handleMessage);
_browser2.default.tabs.onUpdated.addListener(handleTabChange);
_browser2.default.contextMenus.create({
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

var _browser = __webpack_require__(/*! ../browser */ "./src/browser.js");

var _browser2 = _interopRequireDefault(_browser);

var _micropub = __webpack_require__(/*! ../util/micropub */ "./src/util/micropub.js");

var _micropub2 = _interopRequireDefault(_micropub);

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
      _browser2.default.tabs.sendMessage(tab.id, {
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

/***/ "./src/browser.js":
/*!************************!*\
  !*** ./src/browser.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
if (typeof browser === 'undefined') {
  // Chrome
  var browser = chrome;
}

exports.default = browser;

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
exports.sanitizeMicropubError = sanitizeMicropubError;

var _browser = __webpack_require__(/*! ../browser */ "./src/browser.js");

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openLink(e) {
  e.preventDefault();
  if (e.target.href) {
    _browser2.default.tabs.create({ url: e.target.href });
  }
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function getAuthTab() {
  return new Promise(function (resolve, reject) {
    _browser2.default.tabs.query({ url: 'https://omnibear.com/auth/success*' }, function (tabs) {
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
    _browser2.default.tabs.get(Number(tabId), function (tab) {
      resolve(tab.url);
    });
  });
}

function sanitizeMicropubError(error) {
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