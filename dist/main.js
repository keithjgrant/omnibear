(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'begin-auth':
      handleBeginAuth(request.payload);
      break;
  }
}

function handleBeginAuth(payload) {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tabId !== payload.tabId || !isSuccessfulAuth(changeInfo)) {
      return;
    }
    var code = getParamFromUrl('code', changeInfo.url);
    fetchToken(code)
    .then(function (data) {
      var token = getParamFromUrlString('access_token', data);
      localStorage.setItem('token', token)
      chrome.tabs.remove(tab.id);
    });
  });
}

function isSuccessfulAuth (changeInfo) {
  var url = 'http://omnibear.com/auth/success';
  return changeInfo.status === 'loading' && changeInfo.url && changeInfo.url.startsWith(url);
}

function getParamFromUrl(paramName, url) {
  var params = url.split('?')[1];
  return getParamFromUrlString(paramName, params);
}

function getParamFromUrlString(paramName, params) {
  var matches = params.split('&').filter(param => param.startsWith(`${paramName}=`));
  if (matches && matches.length) {
    return matches[0].substr(paramName.length + 1);
  } else {
    return null;
  }
}

function fetchToken(code) {
  var params = getParamString({
    code: code,
    redirect_uri: 'http://omnibear.com/auth/success/',
    client_id: 'http://omnibear.com',
    me: 'http://keithjgrant.com'
  });
  return fetch('https://tokens.indieauth.com/token?' + params, {
    method: 'POST'
  })
  .then(function (res) {
    return res.text();
  });
}

function getParamString(payload) {
  var params = [];
  for (var prop in payload) {
    params.push(`${prop}=${payload[prop]}`);
  }
  return params.join('&');
}

module.exports = function () {
  chrome.runtime.onMessage.addListener(handleMessage);
}

},{}],2:[function(require,module,exports){

module.exports = function () {
  console.log('in Login');

  var form = document.querySelector('#login > form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var inputs = form.querySelectorAll('input[name]');
    var values = Array.prototype.map.call(inputs, i => `${i.name}=${encodeURIComponent(i.value)}`);
    var url = `${form.action}?${values.join('&')}`;
    chrome.tabs.create({url: url}, function (tab) {
      chrome.runtime.sendMessage({
        action: 'begin-auth',
        payload: { tabId: tab.id }
      });
    });
  });
};

},{}],3:[function(require,module,exports){
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

},{"./background":1,"./login":2,"./popup":4,"./router":5}],4:[function(require,module,exports){

module.exports = function () {
  console.log('in Popup');
  var token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }

  document.getElementById('logout').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = 'login.html';
  });
}

},{}],5:[function(require,module,exports){

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

},{}]},{},[3]);
