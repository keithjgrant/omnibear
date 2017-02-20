(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var requests = require('./requests');

var authTabId = null;

function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'begin-auth':
      handleBeginAuth(request.payload);
      break;
  }
}

function handleBeginAuth(payload) {
  localStorage.setItem('domain', payload.domain);
  authTabId = payload.tabId;
}

function handleTabChange (tabId, changeInfo, tab) {
  if (tabId !== authTabId || !isAuthRedirect(changeInfo)) {
    return;
  }
  var code = getParamFromUrl('code', changeInfo.url);
  fetchToken(code)
  .then(function (data) {
    var token = getParamFromUrlString('access_token', data);
    localStorage.setItem('token', token)
    chrome.tabs.remove(tab.id);
    authTabId = null;
  });
}

function isAuthRedirect (changeInfo) {
  var url = 'http://omnibear.com/auth/success';
  return changeInfo.status === 'loading' && changeInfo.url && changeInfo.url.startsWith(url);
}

// TODO move to util
function getParamFromUrl(paramName, url) {
  var params = url.split('?')[1];
  return getParamFromUrlString(paramName, params);
}

// TODO move to util
function getParamFromUrlString(paramName, params) {
  var matches = params.split('&').filter(param => param.startsWith(`${paramName}=`));
  if (matches && matches.length) {
    var value = matches[0].substr(paramName.length + 1);
    return decodeURIComponent(value);
  } else {
    return null;
  }
}

function fetchToken(code) {
  var params = {
    code: code,
    redirect_uri: 'http://omnibear.com/auth/success/',
    client_id: 'http://omnibear.com',
    me: 'http://keithjgrant.com'
  };
  var tokenEndpoint = localStorage.getItem('tokenEndpoint');
  return requests.post(tokenEndpoint, params);
}

module.exports = function () {
  chrome.runtime.onMessage.addListener(handleMessage);
  chrome.tabs.onUpdated.addListener(handleTabChange);
}

},{"./requests":7}],2:[function(require,module,exports){

function getFormValues (form) {
  var inputs = form.querySelectorAll('input[name], textarea');
  var values = {};
  Array.prototype.forEach.call(inputs, (i) => {
    if (typeof values[i.name] === 'undefined') {
      values[i.name] = i.value;
    } else {
      if (!Array.isArray(values[i.name])) {
        values[i.name] = [values[i.name]];
      }
      values[i.name].push(i.value);
    }
  });
  return values;
}

function buildFieldsString (form) {
  var inputs = form.querySelectorAll('input[name], textarea');
  var values = Array.prototype.map.call(inputs, (i) => {
    return `${i.name}=${encodeURIComponent(i.value)}`;
  });
  return values.join('&');
}

module.exports = {
  getFormValues: getFormValues,
  buildFieldsString: buildFieldsString
};

},{}],3:[function(require,module,exports){
var fetchSiteMetadata = require('./parseSite').fetchSiteMetadata;
var buildFieldsString = require('./formUtil').buildFieldsString;

module.exports = function () {
  var form = document.querySelector('#login > form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = buildFieldsString(form);
    var domain = document.getElementById('domain').value;
    var submit = document.getElementById('submit');
    fetchSiteMetadata(domain)
    .then(function (data) {
      if (!data.authEndpoint) {
        throw new Error('authentication_endpoint not found');
      }
      if (!data.tokenEndpoint) {
        throw new Error('token_endpoint not found');
      }
      if (!data.micropub) {
        throw new Error('micropub not found');
      }
      localStorage.setItem('authEndpoint', data.authEndpoint);
      localStorage.setItem('tokenEndpoint', data.tokenEndpoint);
      localStorage.setItem('micropubEndpoint', data.micropub);
      chrome.tabs.create({ url: `${data.authEndpoint}?${fields}` }, function (tab) {
        chrome.runtime.sendMessage({
          action: 'begin-auth',
          payload: {
            tabId: tab.id,
            domain: domain
          }
        });
      });
    });
  });
};

},{"./formUtil":2,"./parseSite":5}],4:[function(require,module,exports){
var router = require('./router').router;
var background = require('./background');
var login = require('./login');
var popup = require('./popup');

document.addEventListener('DOMContentLoaded', function () {
  router({
    background: background,
    login: login,
    popup: popup
  }, window.location.pathname);
});

},{"./background":1,"./login":3,"./popup":6,"./router":8}],5:[function(require,module,exports){

function getLinkValue(page, rel) {
  var link = page.querySelector(`link[rel="${rel}"]`);
  if (link) {
    return link.href;
  } else {
    return null;
  }
}

function fetchSiteMetadata(url) {
  return fetch(url)
  .then(function (res) {
    return res.text();
  }).then(function (content) {
    var page = document.createElement('html');
    page.innerHTML = content;
    return {
      authEndpoint: getLinkValue(page, 'authorization_endpoint'),
      tokenEndpoint: getLinkValue(page, 'token_endpoint'),
      micropub: getLinkValue(page, 'micropub')
    };
  });
}

module.exports = {
  getLinkValue, getLinkValue,
  fetchSiteMetadata: fetchSiteMetadata
};

},{}],6:[function(require,module,exports){
var postMicropub = require('./requests').postMicropub;
var getFormValues = require('./formUtil').getFormValues;

function el(id) {
  return document.getElementById(id);
}

function ensureLoggedIn() {
  var token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

function postNote () {
  var form = el('post');
  var token = localStorage.getItem('token');
  var mpEndpoint = localStorage.getItem('micropubEndpoint');
  postMicropub(mpEndpoint, form, token)
  .then(function (response) {
    // TODO
  });
}

module.exports = function () {
  ensureLoggedIn();

  el('authenticated-to').innerHTML = localStorage.getItem('domain');
  el('logout').addEventListener('click', function (e) {
    e.preventDefault();
    logout();
  });
  el('post').addEventListener('submit', function (e) {
    e.preventDefault();
    postNote();
    return false;
  })
  setTimeout(function () {
    el('input-content').focus();
  }, 100);
}

},{"./formUtil":2,"./requests":7}],7:[function(require,module,exports){

function post (url, payload, body) {
  var params;
  if (typeof payload === 'string') {
    params = payload;
  } else {
    params = getParamString(payload);
  }
  return fetch(`${url}?${params}`, {
    method: 'POST',
    headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
   },
    body: body ? JSON.stringify(body) : null
  })
  .then(function (res) {
    return res.text();
  });
}

function postMicropub (url, form, token) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: new FormData(form)
  })
  .then(function (res) {
    return res.text();
  });
}

function getParamString (payload) {
  var params = [];
  for (var prop in payload) {
    params.push(`${prop}=${payload[prop]}`);
  }
  return params.join('&');
}

module.exports = {
  post: post,
  postMicropub: postMicropub,
  getParamString: getParamString
};

},{}],8:[function(require,module,exports){

function router (routes, path) {
  var path = trimPath(path);
  if (path == '_generated_background_page') {
    path = 'background';
  }
  if (routes[path]) {
    routes[path]();
  } else if (routes.default) {
    routes.default();
  }
}

function trimPath (path) {
  if (path.startsWith('/')) {
    path = path.substr(1);
  }
  if (path.endsWith('.html')) {
    path = path.substr(0, path.length - 5);
  }
  return path;
}

module.exports = {
  router: router,
  trimPath: trimPath
};

},{}]},{},[4]);
