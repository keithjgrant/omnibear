import {post} from './util/requests';
import {getParamFromUrl, getParamFromUrlString, cleanUrl} from './util/url';

var authTabId = null;

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
  // console.log('ON PAGE: ', cleanUrl(url));
}

function selectEntry(url) {
  localStorage.setItem('selectedEntry', url);
  // console.log('selected: ', url);
}

function clearEntry() {
  localStorage.removeItem('selectedEntry');
  // console.log('selected: ', null);
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
