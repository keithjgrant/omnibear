import {post} from './util/requests';

var authTabId = null;

function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'begin-auth':
      handleBeginAuth(request.payload);
      break;
    case 'select-entry':
      selectEntry(request.payload.url);
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
  chrome.tabs.create({url: payload.authUrl}, (tab) => {
    authTabId = tab.id;
  });
}

function selectEntry(url) {
  localStorage.setItem('selectedEntry', url);
}

function clearEntry() {
  localStorage.removeItem('selectedEntry');
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
  return post(tokenEndpoint, params);
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.tabs.onUpdated.addListener(handleTabChange);
chrome.contextMenus.create({
  title: 'Reply to highlighted entry',
  contexts: ['page', 'selection'],
  onclick: function () {
    window.open("index.html", "extension_popup", "width=450,height=500,status=no,scrollbars=yes,resizable=no");
  },
});

chrome.contextMenus.create({
  title: 'Reply to link url',
  contexts: ['link'],
  onclick: function (context) {
    chrome.runtime.sendMessage({ action: 'remove-entry-highlight' });
    selectEntry(context.linkUrl);
    window.open("index.html", "extension_popup", "width=450,height=500,status=no,scrollbars=yes,resizable=no");
  },
});
