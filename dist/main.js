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
  if (tabId !== authTabId || !isSuccessfulAuth(changeInfo)) {
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

function isSuccessfulAuth (changeInfo) {
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
    return matches[0].substr(paramName.length + 1);
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
  return requests.post('https://tokens.indieauth.com/token', params);
}

module.exports = function () {
  chrome.runtime.onMessage.addListener(handleMessage);
  chrome.tabs.onUpdated.addListener(handleTabChange);
}

},{"./requests":6}],2:[function(require,module,exports){

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
var buildFieldsString = require('./formUtil').buildFieldsString;

module.exports = function () {
  console.log('in Login');

  var form = document.querySelector('#login > form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = buildFieldsString(form);
    var url = `${form.action}?${fields}`;
    var domain = document.getElementById('domain').value;
    chrome.tabs.create({url: url}, function (tab) {
      chrome.runtime.sendMessage({
        action: 'begin-auth',
        payload: {
          tabId: tab.id,
          domain: domain
        }
      });
    });
  });
};

},{"./formUtil":2}],4:[function(require,module,exports){
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

},{"./background":1,"./login":3,"./popup":5,"./router":7}],5:[function(require,module,exports){
var post = require('./requests').post;
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
  var fields = getFormValues(form);
  fields.access_token = localStorage.getItem('token');
  console.log('fields', fields);
  post('https://keithjgrant-mp.herokuapp.com/micropub/main', null, {
    body: fields
  })
  .then(function (response) {
    console.log(response);
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
    console.log('posting');
    postNote();
    return false;
  })
  setTimeout(function () {
    el('input-content').focus();
  }, 100);
}

},{"./formUtil":2,"./requests":6}],6:[function(require,module,exports){

function post (url, payload, body) {
  var params;
  if (typeof payload === 'string') {
    console.log('a');
    params = payload;
  } else {
    console.log('b');
    params = getParamString(payload);
  }
  console.log('posting', params);
  return fetch(`${url}?${params}`, {
    method: 'POST',
    body: body ? JSON.stringify(body) : null
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
  getParamString: getParamString
};

},{}],7:[function(require,module,exports){

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
