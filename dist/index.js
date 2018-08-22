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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
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

/***/ "./node_modules/micropub-helper/node_modules/qs/lib/formats.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micropub-helper/node_modules/qs/lib/formats.js ***!
  \*********************************************************************/
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

/***/ "./node_modules/micropub-helper/node_modules/qs/lib/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/micropub-helper/node_modules/qs/lib/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/micropub-helper/node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/micropub-helper/node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/micropub-helper/node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/micropub-helper/node_modules/qs/lib/parse.js":
/*!*******************************************************************!*\
  !*** ./node_modules/micropub-helper/node_modules/qs/lib/parse.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/micropub-helper/node_modules/qs/lib/utils.js");

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

/***/ "./node_modules/micropub-helper/node_modules/qs/lib/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/micropub-helper/node_modules/qs/lib/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/micropub-helper/node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/micropub-helper/node_modules/qs/lib/formats.js");

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

/***/ "./node_modules/micropub-helper/node_modules/qs/lib/utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/micropub-helper/node_modules/qs/lib/utils.js ***!
  \*******************************************************************/
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

/***/ "./node_modules/micropub-helper/src/dependencies-browser.js":
/*!******************************************************************!*\
  !*** ./node_modules/micropub-helper/src/dependencies-browser.js ***!
  \******************************************************************/
/*! exports provided: qsParse, qsStringify, li, relScraper, objectToFormData, appendQueryString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! qs */ "./node_modules/micropub-helper/node_modules/qs/lib/index.js");
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
      fetch(url)
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

/***/ "./node_modules/preact/dist/preact.mjs":
/*!*********************************************!*\
  !*** ./node_modules/preact/dist/preact.mjs ***!
  \*********************************************/
/*! exports provided: default, h, createElement, cloneElement, Component, render, rerender, options */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
var VNode = function VNode() {};

var options = {};

var stack = [];

var EMPTY_CHILDREN = [];

function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		try {
			node[name] = value == null ? '' : value;
		} catch (e) {}
		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

var mounts = [];

var diffLevel = 0;

var isSvgMode = false;

var hydrating = false;

function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	if (!diffLevel++) {
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	if (! --diffLevel) {
		hydrating = false;

		if (!componentRoot) flushMounts();
	}

	return ret;
}

function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			}
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	} else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	diffAttributes(out, vnode.attributes, props);

	isSvgMode = prevSvgMode;

	return out;
}

function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			} else if (min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		unmountComponent(component);
	} else {
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

function diffAttributes(dom, attrs, old) {
	var name;

	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

var recyclerComponents = [];

function createComponent(Ctor, props, context) {
	var inst,
	    i = recyclerComponents.length;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	while (i--) {
		if (recyclerComponents[i].constructor === Ctor) {
			inst.nextBase = recyclerComponents[i].nextBase;
			recyclerComponents.splice(i, 1);
			return inst;
		}
	}

	return inst;
}

function doRender(props, state, context) {
	return this.constructor(props, context);
}

function setComponentProps(component, props, renderMode, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	component.__ref = props.ref;
	component.__key = props.key;
	delete props.ref;
	delete props.key;

	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
		if (!component.base || mountAll) {
			if (component.componentWillMount) component.componentWillMount();
		} else if (component.componentWillReceiveProps) {
			component.componentWillReceiveProps(props, context);
		}
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (renderMode !== 0) {
		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

function renderComponent(component, renderMode, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    snapshot = previousContext,
	    rendered,
	    inst,
	    cbase;

	if (component.constructor.getDerivedStateFromProps) {
		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
		component.state = state;
	}

	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		if (isUpdate && component.getSnapshotBeforeUpdate) {
			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || renderMode === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, snapshot);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	while (component._renderCallbacks.length) {
		component._renderCallbacks.pop().call(component);
	}if (!diffLevel && !isChild) flushMounts();
}

function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
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
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		recyclerComponents.push(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

function Component(props, context) {
	this._dirty = true;

	this.context = context;

	this.props = props;

	this.state = this.state || {};

	this._renderCallbacks = [];
}

extend(Component.prototype, {
	setState: function setState(state, callback) {
		var prev = this.prevState = this.state;
		if (typeof state === 'function') state = state(prev, this.props);
		this.state = extend(extend({}, prev), state);
		if (callback) this._renderCallbacks.push(callback);
		enqueueRender(this);
	},
	forceUpdate: function forceUpdate(callback) {
		if (callback) this._renderCallbacks.push(callback);
		renderComponent(this, 2);
	},
	render: function render() {}
});

function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

/* harmony default export */ __webpack_exports__["default"] = (preact);

//# sourceMappingURL=preact.mjs.map


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

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _LoginForm = __webpack_require__(/*! ./LoginForm */ "./src/components/LoginForm.js");

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _NoteForm = __webpack_require__(/*! ./form/NoteForm */ "./src/components/form/NoteForm.js");

var _NoteForm2 = _interopRequireDefault(_NoteForm);

var _Logs = __webpack_require__(/*! ./log/Logs */ "./src/components/log/Logs.js");

var _Logs2 = _interopRequireDefault(_Logs);

var _Message = __webpack_require__(/*! ./Message */ "./src/components/Message.js");

var _Message2 = _interopRequireDefault(_Message);

var _SettingsForm = __webpack_require__(/*! ./settings/SettingsForm */ "./src/components/settings/SettingsForm.js");

var _SettingsForm2 = _interopRequireDefault(_SettingsForm);

var _utils = __webpack_require__(/*! ../util/utils */ "./src/util/utils.js");

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
        _this.getPageUrl();
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

    _this.handleLogs = function () {
      _this.setState({ currentView: 'logs' });
    };

    _this.handleLogout = function () {
      (0, _utils.logout)();
      _this.setState({ currentView: 'login' });
    };

    _this.state = {
      pageUrl: ''
    };
    _this.setDefaultView();
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      switch (this.state.currentView) {
        case 'login':
          return (0, _preact.h)(_LoginForm2.default, {
            handleSettings: this.handleSettings,
            handleLogs: this.handleLogs
          });
        case 'feedback':
          return (0, _preact.h)(
            _Message2.default,
            { location: this.state.postLocation },
            this.state.message
          );
        case 'settings':
          return (0, _preact.h)(_SettingsForm2.default, { onClose: this.setDefaultView });
        case 'logs':
          return (0, _preact.h)(_Logs2.default, { onClose: this.setDefaultView });
        default:
          return (0, _preact.h)(_NoteForm2.default, {
            handleLogout: this.handleLogout,
            handleSettings: this.handleSettings,
            handleLogs: this.handleLogs,
            userFeedback: this.displayMessage,
            pageUrl: this.state.pageUrl
          });
      }
    }
  }, {
    key: 'isAuthenticated',
    value: function isAuthenticated() {
      return !!localStorage.getItem('token') && !!localStorage.getItem('micropubEndpoint');
    }
  }, {
    key: 'getPageUrl',
    value: function getPageUrl() {
      var _this2 = this;

      (0, _utils.getPageUrl)().then(function (url) {
        _this2.setState({
          pageUrl: url
        });
      });
    }
  }]);

  return App;
}(_preact.Component);

exports.default = App;

/***/ }),

/***/ "./src/components/Footer.js":
/*!**********************************!*\
  !*** ./src/components/Footer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

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
        this.props.onLogs ? (0, _preact.h)(
          "button",
          {
            className: "button-link",
            type: "button",
            onClick: this.props.onLogs
          },
          "Logs"
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

/***/ "./src/components/LoginForm.js":
/*!*************************************!*\
  !*** ./src/components/LoginForm.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _Message = __webpack_require__(/*! ./Message */ "./src/components/Message.js");

var _Message2 = _interopRequireDefault(_Message);

var _Footer = __webpack_require__(/*! ./Footer */ "./src/components/Footer.js");

var _Footer2 = _interopRequireDefault(_Footer);

var _utils = __webpack_require__(/*! ../util/utils */ "./src/util/utils.js");

var _micropub = __webpack_require__(/*! ../util/micropub */ "./src/util/micropub.js");

var _micropub2 = _interopRequireDefault(_micropub);

var _settings = __webpack_require__(/*! ../util/settings */ "./src/util/settings.js");

var _log = __webpack_require__(/*! ../util/log */ "./src/util/log.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this.handleChange = function (e) {
      _this.setState({
        domain: e.target.value,
        hasErrors: false
      });
    };

    _this.handleSubmit = function (e) {
      e.preventDefault();
      var domain = _this.getNormalizedDomain();
      _this.setState({ isLoading: true, domain: domain });
      (0, _log.info)('Begin authentication to ' + domain);
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
        console.log(err.message);
        return _this.setState({
          hasErrors: true,
          errorMessage: 'Missing micropub data on ' + _this.state.domain + '. Please ensure the following links are present: authorization_endpoint, token_endpoint, micropub',
          isLoading: false
        });
      });
    };

    _this.state = {
      logsEnabled: (0, _settings.getSettings)().debugLog
    };
    return _this;
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
                className: this.state.isLoading ? 'button is-loading' : 'button'
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
        (0, _preact.h)(_Footer2.default, {
          onSettings: this.props.handleSettings,
          onLogs: this.state.logsEnabled ? this.props.handleLogs : null
        })
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

/***/ "./src/components/Message.js":
/*!***********************************!*\
  !*** ./src/components/Message.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _constants = __webpack_require__(/*! ../constants */ "./src/constants.js");

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

/***/ "./src/components/Tab.js":
/*!*******************************!*\
  !*** ./src/components/Tab.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

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

/***/ "./src/components/form/ChangeViewTabs.js":
/*!***********************************************!*\
  !*** ./src/components/form/ChangeViewTabs.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _Tab = __webpack_require__(/*! ../Tab */ "./src/components/Tab.js");

var _Tab2 = _interopRequireDefault(_Tab);

var _constants = __webpack_require__(/*! ../../constants */ "./src/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UNICODE_NBSP = '\xA0';

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
        this.renderTab(_constants.NOTE, 'New' + UNICODE_NBSP + 'note'),
        this.renderTab(_constants.REPLY, 'Reply'),
        this.renderTab(_constants.BOOKMARK, 'Bookmark'),
        this.renderTab(_constants.REPOST, 'Repost'),
        this.renderTab(_constants.LIKE, 'Like')
      );
    }
  }, {
    key: 'renderTab',
    value: function renderTab(postType, label) {
      return (0, _preact.h)(
        _Tab2.default,
        {
          isActive: this.props.postType === postType,
          onClick: this.switchTo(postType)
        },
        label
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

/***/ "./src/components/form/FormInputs.js":
/*!*******************************************!*\
  !*** ./src/components/form/FormInputs.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _QuickReplies = __webpack_require__(/*! ./QuickReplies */ "./src/components/form/QuickReplies.js");

var _QuickReplies2 = _interopRequireDefault(_QuickReplies);

var _SyndicateInputs = __webpack_require__(/*! ./SyndicateInputs */ "./src/components/form/SyndicateInputs.js");

var _SyndicateInputs2 = _interopRequireDefault(_SyndicateInputs);

var _draft = __webpack_require__(/*! ../../util/draft */ "./src/util/draft.js");

var _utils = __webpack_require__(/*! ../../util/utils */ "./src/util/utils.js");

var _constants = __webpack_require__(/*! ../../constants */ "./src/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Props:
postType,
entry,
syndicateOptions,
isDisabled,
isLoading,
updateEntry: (entry) => void,
onSubmit: (entry) => void,
*/

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
      _this.props.updateEntry(entry);
      _this.setState({
        isSlugModified: slug !== ''
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

    _this.updateSyndicateTo = function (values) {
      var entry = (0, _utils.clone)(_this.props.entry);
      entry['mp-syndicate-to'] = values;
      _this.props.updateEntry(entry);
    };

    _this.onSubmit = function (e) {
      e.preventDefault();
      _this.props.onSubmit(_this.props.entry);
    };

    _this.state = {
      isSlugModified: false
    };
    return _this;
  }

  _createClass(FormInputs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      setTimeout(this.focus, 150);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      (0, _draft.saveDraft)(this.props.entry);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          postType = _props.postType,
          entry = _props.entry,
          syndicateOptions = _props.syndicateOptions,
          isDisabled = _props.isDisabled,
          isLoading = _props.isLoading;

      return (0, _preact.h)(
        'form',
        { onSubmit: this.onSubmit },
        postType === _constants.REPLY ? (0, _preact.h)(_QuickReplies2.default, null) : null,
        (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'label',
            { 'for': 'input-content' },
            'Content'
          ),
          (0, _preact.h)('textarea', {
            id: 'input-content',
            value: entry.content,
            onInput: this.updateContent,
            onBlur: this.updateContent,
            rows: '4',
            disabled: isDisabled,
            ref: function ref(el) {
              _this2.content = el;
            }
          }),
          (0, _preact.h)(
            'div',
            { 'class': 'input-extra' },
            entry.content.length
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
            value: entry.category.join(' '),
            onChange: this.updateFieldArray('category'),
            disabled: isDisabled
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
            value: entry['mp-slug'],
            onInput: this.updateSlug,
            disabled: isDisabled
          })
        ),
        (0, _preact.h)(_SyndicateInputs2.default, {
          options: syndicateOptions,
          selected: entry['mp-syndicate-to'],
          onUpdate: this.updateSyndicateTo,
          isDisabled: isDisabled
        }),
        (0, _preact.h)(
          'button',
          {
            type: 'submit',
            disabled: isDisabled || !entry.content,
            className: isLoading ? 'button is-loading' : 'button'
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
      if (this.state.isSlugModified) {
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

/***/ "./src/components/form/NoteForm.js":
/*!*****************************************!*\
  !*** ./src/components/form/NoteForm.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _QuickActions = __webpack_require__(/*! ./QuickActions */ "./src/components/form/QuickActions.js");

var _QuickActions2 = _interopRequireDefault(_QuickActions);

var _Message = __webpack_require__(/*! ../Message */ "./src/components/Message.js");

var _Message2 = _interopRequireDefault(_Message);

var _ChangeViewTabs = __webpack_require__(/*! ./ChangeViewTabs */ "./src/components/form/ChangeViewTabs.js");

var _ChangeViewTabs2 = _interopRequireDefault(_ChangeViewTabs);

var _UrlSelector = __webpack_require__(/*! ./UrlSelector */ "./src/components/form/UrlSelector.js");

var _UrlSelector2 = _interopRequireDefault(_UrlSelector);

var _FormInputs = __webpack_require__(/*! ./FormInputs */ "./src/components/form/FormInputs.js");

var _FormInputs2 = _interopRequireDefault(_FormInputs);

var _Footer = __webpack_require__(/*! ../Footer */ "./src/components/Footer.js");

var _Footer2 = _interopRequireDefault(_Footer);

var _draft = __webpack_require__(/*! ../../util/draft */ "./src/util/draft.js");

var _utils = __webpack_require__(/*! ../../util/utils */ "./src/util/utils.js");

var _micropub = __webpack_require__(/*! ../../util/micropub */ "./src/util/micropub.js");

var _micropub2 = _interopRequireDefault(_micropub);

var _constants = __webpack_require__(/*! ../../constants */ "./src/constants.js");

var _settings = __webpack_require__(/*! ../../util/settings */ "./src/util/settings.js");

var _log = __webpack_require__(/*! ../../util/log */ "./src/util/log.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoteForm = function (_Component) {
  _inherits(NoteForm, _Component);

  function NoteForm(props) {
    _classCallCheck(this, NoteForm);

    var _this = _possibleConstructorReturn(this, (NoteForm.__proto__ || Object.getPrototypeOf(NoteForm)).call(this, props));

    _this.setUrl = function (url) {
      console.log('setting activeUrl', url);
      _this.setState({ activeUrl: url });
    };

    _this.handleLike = function () {
      var url = _this.getCurrentUrl();
      if (!url) {
        (0, _log.warning)('Cannot send like; no current URL found');
        return;
      }
      _this.postEntry({
        h: 'entry',
        'like-of': url
      }).then(function (location) {
        var type = _this.state.postType === ITEM_REPLY ? 'Item' : 'Page';
        _this.flashSuccessMessage(type + ' liked successfully', location);
      }).catch(function (err) {
        _this.flashErrorMessage('Error posting like', err);
      });
    };

    _this.handleRepost = function () {
      var url = _this.getCurrentUrl();
      if (!url) {
        (0, _log.warning)('Cannot send repost; no current URL found');
        return;
      }
      _this.postEntry({
        h: 'entry',
        'repost-of': url
      }).then(function (location) {
        var type = _this.state.postType === ITEM_REPLY ? 'Item' : 'Page';
        _this.flashSuccessMessage(type + ' reposted successfully', location);
      }).catch(function (err) {
        _this.flashErrorMessage('Error reposting', err);
      });
    };

    _this.handleReacji = function (emoji) {
      var url = _this.getCurrentUrl();
      if (!url) {
        (0, _log.warning)('Cannot send reacji; no current URL found');
        return;
      }
      _this.postEntry({
        h: 'entry',
        content: emoji,
        'in-reply-to': url
      }).then(function (location) {
        var type = _this.state.postType === ITEM_REPLY ? 'Item' : 'Page';
        _this.flashSuccessMessage(type + ' reacted to successfully', location);
      }).catch(function (err) {
        _this.flashErrorMessage('Error reacting', err);
      });
    };

    _this.updateEntry = function (newEntry) {
      _this.setState({ entry: newEntry });
    };

    _this.handleSubmit = function (entry) {
      if (_this.state.postType !== _constants.NOTE) {
        entry['in-reply-to'] = _this.getCurrentUrl();
      }
      _this.postEntry(entry).then(function (location) {
        var type = _this.state.postType === _constants.NOTE ? 'Note' : 'Reply';
        (0, _draft.deleteDraft)();
        _this.flashSuccessMessage(type + ' posted successfully', location);
      }).catch(function (err) {
        if (err.status >= 400 && err.status < 500) {
          _this.flashErrorMessage('Error authenticating to micropub endpoint. Try logging out and back in.', err);
        } else {
          _this.flashErrorMessage('Error posting Note', err);
        }
      });
    };

    _this.changeView = function (postType) {
      var url = void 0;
      switch (postType) {
        case _constants.NOTE:
          url = null;
          break;
        default:
          url = localStorage.getItem('pageUrl');
          break;
        // case PAGE_REPLY:
        //   url = localStorage.getItem('pageUrl');
        //   break;
        // case ITEM_REPLY:
        //   url = localStorage.getItem('selectedEntry');
        //   break;
      }
      _this.setState({ url: url, postType: postType });
      _this.form.focus();
    };

    var selectedEntry = localStorage.getItem('selectedEntry');
    var settings = (0, _settings.getSettings)();
    var draft = (0, _draft.getDraft)();
    _this.state = {
      postType: _this.getPostType(settings),
      selectedEntry: localStorage.getItem('selectedEntry'),
      userDomain: localStorage.getItem('domain'),
      entry: draft,
      hasSelectedEntry: !!selectedEntry,
      isDisabled: false,
      isLoading: false,
      settings: settings,
      syndicateOptions: (0, _settings.getSyndicateOptions)()
    };
    return _this;
  }

  _createClass(NoteForm, [{
    key: 'getPostType',
    value: function getPostType(settings) {
      // TODO: support other post types?
      // const selectedEntry = localStorage.getItem('selectedEntry');
      if (location.search.indexOf('type=reply') === -1 && !settings.defaultToCurrentPage) {
        return _constants.NOTE;
      }
      return _constants.REPLY;
    }
  }, {
    key: 'getCurrentUrl',
    value: function getCurrentUrl() {
      switch (this.state.postType) {
        case _constants.NOTE:
          return null;
        // case PAGE_REPLY:
        default:
          return this.props.pageUrl;
        // case ITEM_REPLY:
        //   return this.state.selectedEntry;
        //   break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          postType = _state.postType,
          isDisabled = _state.isDisabled,
          isLoading = _state.isLoading,
          settings = _state.settings,
          userDomain = _state.userDomain,
          entry = _state.entry,
          syndicateOptions = _state.syndicateOptions,
          hasSelectedEntry = _state.hasSelectedEntry,
          errorMessage = _state.errorMessage,
          activeUrl = _state.activeUrl;
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
        postType !== _constants.NOTE ? (0, _preact.h)(_UrlSelector2.default, { url: activeUrl, onChange: this.setUrl }) : null,
        (0, _preact.h)(
          'div',
          { className: 'container' },
          (0, _preact.h)(_FormInputs2.default, {
            postType: postType,
            entry: entry,
            settings: settings,
            syndicateOptions: syndicateOptions,
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
          onLogs: this.state.settings.debugLog ? this.props.handleLogs : null,
          onLogout: handleLogout
        })
      );
    }
  }, {
    key: 'flashSuccessMessage',
    value: function flashSuccessMessage(message, location) {
      (0, _log.info)(message, location);
      this.props.userFeedback(message, _constants.MESSAGE_SUCCESS, location);
      if (this.state.settings.closeAfterPosting) {
        setTimeout(function () {
          window.close();
        }, 3000);
      }
    }
  }, {
    key: 'flashErrorMessage',
    value: function flashErrorMessage(message, err) {
      var _this3 = this;

      (0, _log.error)(message, err);
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
      this.setState({
        isDisabled: true,
        isLoading: true
      });
      var aliasedEntry = (0, _utils.clone)(entry);
      var slugName = this.state.settings.slug;
      var syndicateName = this.state.settings.syndicateTo;
      if (slugName && slugName !== 'mp-slug') {
        aliasedEntry[slugName] = aliasedEntry['mp-slug'];
        delete aliasedEntry['mp-slug'];
      }
      if (syndicateName && syndicateName !== 'mp-syndicate-to') {
        aliasedEntry[syndicateName] = aliasedEntry['mp-syndicate-to'];
        delete aliasedEntry['mp-syndicate-to'];
      }
      return _micropub2.default.create(aliasedEntry, 'form');
    }
  }]);

  return NoteForm;
}(_preact.Component);

exports.default = NoteForm;

/***/ }),

/***/ "./src/components/form/QuickActions.js":
/*!*********************************************!*\
  !*** ./src/components/form/QuickActions.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _constants = __webpack_require__(/*! ../../constants */ "./src/constants.js");

var _HeartSvg = __webpack_require__(/*! ../svg/HeartSvg */ "./src/components/svg/HeartSvg.js");

var _HeartSvg2 = _interopRequireDefault(_HeartSvg);

var _RepostSvg = __webpack_require__(/*! ../svg/RepostSvg */ "./src/components/svg/RepostSvg.js");

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

/***/ "./src/components/form/QuickReplies.js":
/*!*********************************************!*\
  !*** ./src/components/form/QuickReplies.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _constants = __webpack_require__(/*! ../../constants */ "./src/constants.js");

var _HeartSvg = __webpack_require__(/*! ../svg/HeartSvg */ "./src/components/svg/HeartSvg.js");

var _HeartSvg2 = _interopRequireDefault(_HeartSvg);

var _RepostSvg = __webpack_require__(/*! ../svg/RepostSvg */ "./src/components/svg/RepostSvg.js");

var _RepostSvg2 = _interopRequireDefault(_RepostSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Props:
settings
onReacji
isDisabled,
*/

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
      var reacji = this.getReacjiList();
      if (!reacji || !reacji.length) {
        return null;
      }
      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'h2',
          { className: 'minor-heading text-right' },
          'Quick Replies'
        ),
        (0, _preact.h)(
          'ul',
          { className: 'quick-actions' },
          reacji.map(this.renderReacji)
        )
      );
    }
  }, {
    key: 'getReacjiList',
    value: function getReacjiList() {
      var settings = this.props.settings;

      if (settings && settings.reacji) {
        return settings.reacji;
      }
      return _constants.DEFAULT_REACJI;
    }
  }]);

  return QuickActions;
}(_preact.Component);

exports.default = QuickActions;

/***/ }),

/***/ "./src/components/form/SyndicateInputs.js":
/*!************************************************!*\
  !*** ./src/components/form/SyndicateInputs.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SyndicateInputs = function (_Component) {
  _inherits(SyndicateInputs, _Component);

  function SyndicateInputs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SyndicateInputs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SyndicateInputs.__proto__ || Object.getPrototypeOf(SyndicateInputs)).call.apply(_ref, [this].concat(args))), _this), _this.renderOption = function (option) {
      var _this$props = _this.props,
          selected = _this$props.selected,
          isDisabled = _this$props.isDisabled;

      var isChecked = selected ? selected.indexOf(option.uid) > -1 : false;
      return (0, _preact.h)(
        "label",
        null,
        (0, _preact.h)("input", {
          type: "checkbox",
          checked: isChecked,
          disabled: isDisabled,
          onClick: _this.toggleOption(option.uid)
        }),
        option.name
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SyndicateInputs, [{
    key: "render",
    value: function render() {
      var options = this.props.options;

      if (!options || !options.length) {
        return null;
      }
      return (0, _preact.h)(
        "div",
        null,
        (0, _preact.h)(
          "div",
          { "class": "label" },
          "Syndicate to"
        ),
        options.map(this.renderOption)
      );
    }
  }, {
    key: "toggleOption",
    value: function toggleOption(uid) {
      var _this2 = this;

      return function (e) {
        var selected = _this2.props.selected || [];
        if (e.target.checked) {
          selected.push(uid);
          _this2.props.onUpdate(selected);
        } else {
          var index = selected.indexOf(uid);
          selected.splice(index, 1);
          _this2.props.onUpdate(selected);
        }
      };
    }
  }]);

  return SyndicateInputs;
}(_preact.Component);

exports.default = SyndicateInputs;

/***/ }),

/***/ "./src/components/form/UrlSelector.js":
/*!********************************************!*\
  !*** ./src/components/form/UrlSelector.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _utils = __webpack_require__(/*! ../../util/utils */ "./src/util/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
Props:
url
onChange
*/

var UrlSelector = function (_Component) {
  _inherits(UrlSelector, _Component);

  function UrlSelector(props) {
    _classCallCheck(this, UrlSelector);

    var _this = _possibleConstructorReturn(this, (UrlSelector.__proto__ || Object.getPrototypeOf(UrlSelector)).call(this, props));

    _this.toggle = function () {
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false,
      options: []
    };
    return _this;
  }

  _createClass(UrlSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.refreshUrls();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isOpen = _state.isOpen,
          options = _state.options;
      var url = this.props.url;

      return (0, _preact.h)(
        'div',
        { className: 'dropdown ' + (isOpen ? ' is-open' : '') },
        (0, _preact.h)(
          'button',
          { className: 'dropdown__toggle', onClick: this.toggle },
          this.renderUrlOption(this.findActiveOption())
        ),
        isOpen ? (0, _preact.h)(
          'div',
          { className: 'dropdown__drawer' },
          options.map(function (option) {
            return _this2.renderUrlOption(option, option.url === url);
          })
        ) : null
      );
    }
  }, {
    key: 'renderUrlOption',
    value: function renderUrlOption(option, isActive) {
      return (0, _preact.h)(
        'button',
        {
          className: 'url-option' + (isActive ? ' is-active' : ''),
          onClick: this.selectUrl.bind(this, option.url),
          disabled: option.isDisabled
        },
        (0, _preact.h)(
          'div',
          { className: 'url-option__type' },
          option.name
        ),
        (0, _preact.h)(
          'div',
          { className: 'url-option__url' },
          option.url
        )
      );
    }
  }, {
    key: 'findActiveOption',
    value: function findActiveOption() {
      var url = this.props.url;
      var options = this.state.options;

      return options.find(function (option) {
        return option.url === url;
      }) || { url: url };
    }
  }, {
    key: 'selectUrl',
    value: function selectUrl(url) {
      this.setState({
        url: url,
        isOpen: false
      });
      this.props.onChange(url);
    }
  }, {
    key: 'refreshUrls',
    value: function refreshUrls() {
      var _this3 = this;

      (0, _utils.getPageUrl)().then(function (url) {
        var options = [{
          name: 'Current page',
          url: url
        }];
        var selectedEntry = localStorage.getItem('selectedEntry');
        if (selectedEntry) {
          options.push({ name: 'Selected entry', url: selectedEntry });
        } else {
          options.push({ name: 'Selected entry', url: '—', isDisabled: true });
        }
        _this3.setState({ options: options });
        if (!_this3.props.url) {
          _this3.props.onChange(url);
        }
      });
    }
  }]);

  return UrlSelector;
}(_preact.Component);

exports.default = UrlSelector;

/***/ }),

/***/ "./src/components/log/LogDetails.js":
/*!******************************************!*\
  !*** ./src/components/log/LogDetails.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogDetails = function (_Component) {
  _inherits(LogDetails, _Component);

  function LogDetails() {
    _classCallCheck(this, LogDetails);

    return _possibleConstructorReturn(this, (LogDetails.__proto__ || Object.getPrototypeOf(LogDetails)).apply(this, arguments));
  }

  _createClass(LogDetails, [{
    key: 'render',
    value: function render() {
      var details = this.props.details;

      return (0, _preact.h)(
        'div',
        { 'class': 'log-details' },
        this.renderDetail(details, true)
      );
    }
  }, {
    key: 'renderDetail',
    value: function renderDetail(detail, isTopLevel) {
      var _this2 = this;

      var marginLeft = (isTopLevel ? 0 : 1) + 'em';
      if (typeof detail === 'string') {
        return (0, _preact.h)(
          'span',
          null,
          detail
        );
      }
      if (Array.isArray(detail)) {
        return (0, _preact.h)(
          'div',
          { style: { marginLeft: marginLeft } },
          '[',
          detail.map(function (d) {
            return (0, _preact.h)(
              'div',
              { style: { marginLeft: marginLeft } },
              _this2.renderDetail(d),
              ','
            );
          }),
          ']'
        );
      }
      return [(0, _preact.h)(
        'span',
        null,
        '{'
      ), (0, _preact.h)(
        'div',
        { style: { marginLeft: marginLeft } },
        Object.keys(detail).map(function (key) {
          return (0, _preact.h)(
            'div',
            { style: { marginLeft: '1em' } },
            key,
            ': ',
            _this2.renderDetail(detail[key])
          );
        })
      ), (0, _preact.h)(
        'span',
        null,
        '}'
      )];
    }
  }]);

  return LogDetails;
}(_preact.Component);

exports.default = LogDetails;

/***/ }),

/***/ "./src/components/log/LogItem.js":
/*!***************************************!*\
  !*** ./src/components/log/LogItem.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _LogDetails = __webpack_require__(/*! ./LogDetails */ "./src/components/log/LogDetails.js");

var _LogDetails2 = _interopRequireDefault(_LogDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogItem = function (_Component) {
  _inherits(LogItem, _Component);

  function LogItem(props) {
    _classCallCheck(this, LogItem);

    var _this = _possibleConstructorReturn(this, (LogItem.__proto__ || Object.getPrototypeOf(LogItem)).call(this, props));

    _this.toggle = function () {
      _this.setState({
        isExpanded: !_this.state.isExpanded
      });
    };

    _this.state = {
      isExpanded: false
    };
    return _this;
  }

  _createClass(LogItem, [{
    key: 'render',
    value: function render() {
      var log = this.props.log;

      return (0, _preact.h)(
        'li',
        null,
        (0, _preact.h)(
          'button',
          { type: 'button', className: this.getClass(), onClick: this.toggle },
          (0, _preact.h)(
            'time',
            null,
            log.timestamp
          ),
          (0, _preact.h)(
            'div',
            null,
            log.message
          )
        ),
        this.state.isExpanded ? (0, _preact.h)(_LogDetails2.default, { details: log.data }) : null
      );
    }
  }, {
    key: 'getClass',
    value: function getClass() {
      return ['log', 'log--' + this.props.log.type, this.state.isExpanded ? 'is-expanded' : '', this.props.log.data ? 'has-data' : ''].join(' ');
    }
  }]);

  return LogItem;
}(_preact.Component);

exports.default = LogItem;

/***/ }),

/***/ "./src/components/log/Logs.js":
/*!************************************!*\
  !*** ./src/components/log/Logs.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _LogItem = __webpack_require__(/*! ./LogItem */ "./src/components/log/LogItem.js");

var _LogItem2 = _interopRequireDefault(_LogItem);

var _log = __webpack_require__(/*! ../../util/log */ "./src/util/log.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logs = function (_Component) {
  _inherits(Logs, _Component);

  function Logs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Logs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Logs.__proto__ || Object.getPrototypeOf(Logs)).call.apply(_ref, [this].concat(args))), _this), _this.clearLogs = function () {
      (0, _log.clearLogs)();
      _this.forceUpdate();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Logs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.forceUpdate();
      }, 2000);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var onClose = this.props.onClose;

      var logs = (0, _log.getLogs)();
      return (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          'h1',
          { className: 'section-heading' },
          'Logs'
        ),
        (0, _preact.h)(
          'div',
          { 'class': 'container' },
          logs.length ? (0, _preact.h)(
            'ul',
            { className: 'logs' },
            logs.map(function (log) {
              return (0, _preact.h)(_LogItem2.default, { log: log });
            })
          ) : (0, _preact.h)(
            'p',
            { className: 'metadata' },
            'No logs found'
          ),
          (0, _preact.h)(
            'p',
            { className: 'text-right' },
            (0, _preact.h)(
              'button',
              { type: 'button', onClick: this.clearLogs },
              'Clear logs'
            )
          )
        ),
        (0, _preact.h)(
          'footer',
          { className: 'footer' },
          (0, _preact.h)(
            'button',
            { className: 'button-link', type: 'button', onClick: onClose },
            'Close logs'
          )
        )
      );
    }
  }]);

  return Logs;
}(_preact.Component);

exports.default = Logs;

/***/ }),

/***/ "./src/components/settings/AuthenticationFields.js":
/*!*********************************************************!*\
  !*** ./src/components/settings/AuthenticationFields.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticationFields = function (_Component) {
  _inherits(AuthenticationFields, _Component);

  function AuthenticationFields(props) {
    _classCallCheck(this, AuthenticationFields);

    var _this = _possibleConstructorReturn(this, (AuthenticationFields.__proto__ || Object.getPrototypeOf(AuthenticationFields)).call(this, props));

    _this.showAuthenticationDetails = function () {
      _this.setState({
        showFields: true
      });
    };

    _this.state = {
      showFields: false
    };
    return _this;
  }

  _createClass(AuthenticationFields, [{
    key: "render",
    value: function render() {
      return (0, _preact.h)(
        "fieldset",
        null,
        (0, _preact.h)(
          "legend",
          null,
          "Authentication details (advanced)"
        ),
        (0, _preact.h)(
          "div",
          { "class": "settings-form__description" },
          "These values are set automatically upon logging in. Only edit them if you are having trouble authenticating and wish to do so manually."
        ),
        this.state.showFields ? [(0, _preact.h)(
          "div",
          null,
          (0, _preact.h)(
            "label",
            { htmlFor: "me" },
            "Me (domain name)"
          ),
          (0, _preact.h)("input", {
            id: "me",
            type: "text",
            value: this.props.me,
            onChange: this.update('me'),
            placeholder: "https://example.com"
          })
        ), (0, _preact.h)(
          "div",
          null,
          (0, _preact.h)(
            "label",
            { htmlFor: "mp-endpoint" },
            "Micropub endpoint"
          ),
          (0, _preact.h)("input", {
            id: "mp-endpoint",
            type: "text",
            value: this.props.micropubEndpoint,
            onChange: this.update('micropubEndpoint'),
            placeholder: "https://example.com/micropub"
          })
        ), (0, _preact.h)(
          "div",
          null,
          (0, _preact.h)(
            "label",
            { htmlFor: "token" },
            "Token"
          ),
          (0, _preact.h)("input", {
            id: "token",
            type: "text",
            value: this.props.token,
            onChange: this.update('token')
          })
        )] : (0, _preact.h)(
          "div",
          { "class": "text-right" },
          (0, _preact.h)(
            "button",
            { type: "button", onClick: this.showAuthenticationDetails },
            "Show"
          )
        )
      );
    }
  }, {
    key: "update",
    value: function update(fieldName) {
      var _this2 = this;

      return function (e) {
        _this2.props.onChange(fieldName)(e.target.value);
      };
    }
  }]);

  return AuthenticationFields;
}(_preact.Component);

exports.default = AuthenticationFields;

/***/ }),

/***/ "./src/components/settings/EndpointFields.js":
/*!***************************************************!*\
  !*** ./src/components/settings/EndpointFields.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EndpointFields = function (_Component) {
  _inherits(EndpointFields, _Component);

  function EndpointFields(props) {
    _classCallCheck(this, EndpointFields);

    var _this = _possibleConstructorReturn(this, (EndpointFields.__proto__ || Object.getPrototypeOf(EndpointFields)).call(this, props));

    _this.showAuthenticationDetails = function () {
      _this.setState({
        showFields: true
      });
    };

    _this.state = {
      showFields: false
    };
    return _this;
  }

  _createClass(EndpointFields, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          slug = _props.slug,
          syndicateTo = _props.syndicateTo;

      return (0, _preact.h)(
        "fieldset",
        null,
        (0, _preact.h)(
          "legend",
          null,
          "Customize endpoint fields"
        ),
        (0, _preact.h)(
          "div",
          { "class": "settings-form__description" },
          "If your micropub server expects custom or legacy fieldnames, you can specify those here"
        ),
        this.state.showFields ? [(0, _preact.h)(
          "div",
          null,
          (0, _preact.h)(
            "label",
            { htmlFor: "slug" },
            "Slug"
          ),
          (0, _preact.h)("input", {
            id: "slug",
            type: "text",
            value: slug,
            onChange: this.update('slug')
          }),
          (0, _preact.h)(
            "div",
            { "class": "settings-form__description" },
            "Choose the name of the field that the slug will be sent in. This should be ",
            (0, _preact.h)(
              "code",
              null,
              "mp-slug"
            ),
            " for up-to-date endpoints."
          )
        ), (0, _preact.h)(
          "div",
          null,
          (0, _preact.h)(
            "label",
            { htmlFor: "syndicate-to" },
            "Syndicate To"
          ),
          (0, _preact.h)("input", {
            id: "syndicate-to",
            type: "text",
            value: syndicateTo,
            onChange: this.update('syndicateTo')
          }),
          (0, _preact.h)(
            "div",
            { "class": "settings-form__description" },
            "Choose the name of the field that the syndicate-to UIDs will be sent in. This should be ",
            (0, _preact.h)(
              "code",
              null,
              "mp-syndicate-to"
            ),
            " for up-to-date endpoints."
          )
        )] : (0, _preact.h)(
          "div",
          { "class": "text-right" },
          (0, _preact.h)(
            "button",
            { type: "button", onClick: this.showAuthenticationDetails },
            "Show"
          )
        )
      );
    }
  }, {
    key: "update",
    value: function update(fieldName) {
      var _this2 = this;

      return function (e) {
        _this2.props.onChange(fieldName)(e.target.value);
      };
    }
  }]);

  return EndpointFields;
}(_preact.Component);

exports.default = EndpointFields;

/***/ }),

/***/ "./src/components/settings/ReacjiSettings.js":
/*!***************************************************!*\
  !*** ./src/components/settings/ReacjiSettings.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

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

/***/ "./src/components/settings/SettingsForm.js":
/*!*************************************************!*\
  !*** ./src/components/settings/SettingsForm.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _ReacjiSettings = __webpack_require__(/*! ./ReacjiSettings */ "./src/components/settings/ReacjiSettings.js");

var _ReacjiSettings2 = _interopRequireDefault(_ReacjiSettings);

var _EndpointFields = __webpack_require__(/*! ./EndpointFields */ "./src/components/settings/EndpointFields.js");

var _EndpointFields2 = _interopRequireDefault(_EndpointFields);

var _AuthenticationFields = __webpack_require__(/*! ./AuthenticationFields */ "./src/components/settings/AuthenticationFields.js");

var _AuthenticationFields2 = _interopRequireDefault(_AuthenticationFields);

var _constants = __webpack_require__(/*! ../../constants */ "./src/constants.js");

var _settings = __webpack_require__(/*! ../../util/settings */ "./src/util/settings.js");

var _log = __webpack_require__(/*! ../../util/log */ "./src/util/log.js");

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

    _this.set = function (fieldName) {
      return function (value) {
        _this.setState(_defineProperty({}, fieldName, value));
      };
    };

    _this.save = function (e) {
      e.preventDefault();
      var _this$state = _this.state,
          me = _this$state.me,
          token = _this$state.token,
          micropubEndpoint = _this$state.micropubEndpoint;

      (0, _settings.saveSettings)(_this.state);
      (0, _settings.saveAuthenticationDetails)(me, token, micropubEndpoint);
      if (!_this.state.debugLog) {
        (0, _log.clearLogs)();
      }
      _this.props.onClose();
    };

    var settings = (0, _settings.getSettings)();
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
          autoSlug = _state.autoSlug,
          closeAfterPosting = _state.closeAfterPosting,
          debugLog = _state.debugLog,
          reacji = _state.reacji,
          slug = _state.slug,
          syndicateTo = _state.syndicateTo,
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
            (0, _preact.h)(
              'label',
              null,
              (0, _preact.h)('input', {
                type: 'checkbox',
                checked: closeAfterPosting,
                onChange: this.updateBoolean('closeAfterPosting')
              }),
              'Close Omnibear window after posting'
            ),
            (0, _preact.h)(
              'label',
              null,
              (0, _preact.h)('input', {
                type: 'checkbox',
                checked: debugLog,
                onChange: this.updateBoolean('debugLog')
              }),
              'Record debug logs'
            ),
            (0, _preact.h)(_ReacjiSettings2.default, { reacji: reacji, onChange: this.set('reacji') }),
            (0, _preact.h)(_EndpointFields2.default, {
              slug: slug,
              syndicateTo: syndicateTo,
              onChange: this.set
            }),
            (0, _preact.h)(_AuthenticationFields2.default, {
              me: me,
              micropubEndpoint: micropubEndpoint,
              token: token,
              onChange: this.set
            }),
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
    key: 'updateBoolean',
    value: function updateBoolean(fieldName) {
      var _this3 = this;

      return function (e) {
        _this3.setState(_defineProperty({}, fieldName, e.target.checked));
      };
    }
  }]);

  return SettingsForm;
}(_preact.Component);

exports.default = SettingsForm;

/***/ }),

/***/ "./src/components/svg/HeartSvg.js":
/*!****************************************!*\
  !*** ./src/components/svg/HeartSvg.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

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

/***/ "./src/components/svg/RepostSvg.js":
/*!*****************************************!*\
  !*** ./src/components/svg/RepostSvg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

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
        { className: "svg-repost", viewBox: "390 45 396 225" },
        (0, _preact.h)("path", {
          d: " M 570 220 L 490 220 L 490 160 L 520 160 C 530.71 160 540 151.53 540 140 C 540 132.5 536.09 127.66 530 120 L 490 71.88 C 483.90999999999997 64.69 478.13 60 470 60 C 461.87 60 456.09000000000003 64.69 450 71.88 L 410 120 C 403.91 127.66 400 132.5 400 140 C 400 151.53 409.29 160 420 160 L 450 160 L 450 240 C 450 251.04 458.96 260 470 260 L 570 260 C 581.04 260 590 251.04 590 240 C 590 228.96 581.04 220 570 220 Z  M 760 160 L 730 160 L 730 80 C 730 68.96 721.04 60 710 60 L 610 60 C 598.96 60 590 68.96 590 80 C 590 91.03999999999999 598.96 100 610 100 L 690 100 L 690 160 L 660 160 C 649.29 160 640 168.47000000000003 640 180 C 640 187.5 643.91 192.34000000000003 650 200 L 690 248.13 C 696.09 255.31 701.88 260 710 260 C 718.12 260 723.91 255.31 730 248.12 L 770 200 C 776.09 192.34000000000003 780 187.5 780 180 C 780 168.47000000000003 770.71 160 760 160 Z ",
          fill: "transparent",
          stroke: "var(--green)",
          "stroke-width": "20"
        })
      );
    }
  }]);

  return RepostSvg;
}(_preact.Component);

exports.default = RepostSvg;

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

var PAGE_REPLY = exports.PAGE_REPLY = 'page-reply';
var ITEM_REPLY = exports.ITEM_REPLY = 'item-reply';

var MESSAGE_SUCCESS = exports.MESSAGE_SUCCESS = 'success';
var MESSAGE_ERROR = exports.MESSAGE_ERROR = 'error';

var DEFAULT_REACJI = exports.DEFAULT_REACJI = ['👍', '👎', '🎉', '😆', '😢', '😠'];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.mjs");

var _App = __webpack_require__(/*! ./components/App */ "./src/components/App.js");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  (0, _preact.render)((0, _preact.h)(_App2.default, null), document.body);
});

/***/ }),

/***/ "./src/util/draft.js":
/*!***************************!*\
  !*** ./src/util/draft.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDraft = getDraft;
exports.saveDraft = saveDraft;
exports.deleteDraft = deleteDraft;
var KEYS = ['h', 'content', 'category', 'mp-slug', 'mp-syndicate-to'];

var EMPTY_DRAFT = {
  h: 'entry',
  content: '',
  category: [],
  'mp-slug': '',
  'mp-syndicate-to': []
};

function getDraft() {
  var draft = JSON.parse(localStorage.getItem('draft'));
  if (draft) {
    return draft;
  }
  return EMPTY_DRAFT;
}

function saveDraft(draft) {
  var clean = {};
  KEYS.forEach(function (key) {
    clean[key] = draft[key];
  });
  localStorage.setItem('draft', JSON.stringify(clean));
}

function deleteDraft() {
  var draft = getDraft();
  saveDraft({
    h: 'entry',
    content: '',
    category: [],
    'mp-slug': '',
    'mp-syndicate-to': draft['mp-syndicate-to']
  });
}

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
      entry.data = {
        message: data.message,
        stack: data.stack.trim().split('\n')
      };
    } else {
      entry.data = data;
    }
  }
  log.push(entry);
  saveLog(log);
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

var _micropubHelper = __webpack_require__(/*! micropub-helper */ "./node_modules/micropub-helper/src/main.js");

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
  token: localStorage.getItem('token'),
  scope: 'create delete update'
});

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

function getPageUrl() {
  return new Promise(function (resolve, reject) {
    var tabId = localStorage.getItem('pageTabId');
    chrome.tabs.get(Number(tabId), function (tab) {
      resolve(tab.url);
    });
  });
}

/***/ })

/******/ });
//# sourceMappingURL=index.js.map