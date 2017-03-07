import {post, formEncodedToObject} from './util/requests';
import {getParamFromUrl, getParamFromUrlString, cleanUrl} from './util/url';
import {getAuthTab, logout} from './util/utils';

let authTabId = null;
let menuId;

function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'begin-auth':
      handleBeginAuth(request.payload);
      break;
    case 'focus-window':
      updateFocusedWindow(sender.url, request.payload.selectedEntry);
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

function updateFocusedWindow(url, selectedEntry) {
  localStorage.setItem('pageUrl', cleanUrl(url));
  if (selectedEntry) {
    selectEntry(selectedEntry);
  } else {
    clearEntry();
  }
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
    const token = data.access_token;
    if (!token) {
      throw new Error('Token not found in token endpoint response. Missing expected field \'access_token\'');
    }
    localStorage.setItem('token', token);
    chrome.tabs.remove(tab.id);
    authTabId = null;
  })
  .catch(function (err) {
    getAuthTab()
    .then((tab) => {
      chrome.tabs.sendMessage(tab.id, {
        action: 'fetch-token-error',
        payload: {
          error: err.message,
        },
      });
      logout();
    });
  });
}

function isAuthRedirect (changeInfo) {
  var url = 'http://omnibear.com/auth/success';
  return changeInfo.status === 'loading' && changeInfo.url && changeInfo.url.startsWith(url);
}

function fetchToken(code) {
  var params = {
    code: code,
    redirect_uri: 'http://omnibear.com/auth/success/',
    client_id: 'http://omnibear.com',
    me: localStorage.getItem('domain'),
  };
  var tokenEndpoint = localStorage.getItem('tokenEndpoint');
  return post(tokenEndpoint, params)
  .then(function (response) {
    const data = formEncodedToObject(response);
    if (data.error) {
      throw new Error(data.error_description || data.error);
    }
    return data;
  });
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.tabs.onUpdated.addListener(handleTabChange);
menuId = chrome.contextMenus.create({
  title: 'Reply to entry',
  contexts: ['page', 'selection'],
  onclick: function () {
    window.open("index.html?reply=true", "extension_popup", "width=450,height=510,status=no,scrollbars=yes,resizable=no,top=80,left=2000");
  },
});

// chrome.contextMenus.create({
//   title: 'Reply to link url',
//   contexts: ['link'],
//   onclick: function (context) {
//     chrome.runtime.sendMessage({ action: 'remove-entry-highlight' });
//     selectEntry(context.linkUrl);
//     window.open("index.html", "extension_popup", "width=450,height=500,status=no,scrollbars=yes,resizable=no");
//   },
// });
