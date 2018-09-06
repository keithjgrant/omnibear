import {getParamFromUrl} from './util/url';
import {getAuthTab} from './util/utils';
import {fetchToken, fetchSyndicationTargets} from './background/authentication';
import {info, error} from './util/log';

let authTabId = null;

function handleMessage(request, sender, sendResponse) {
  switch (request.action) {
    case 'begin-auth':
      handleBeginAuth(request.payload);
      break;
    case 'focus-window':
      updateFocusedWindow(
        sender.tab.id,
        request.payload.pageEntry,
        request.payload.selectedEntry
      );
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
  chrome.tabs.create({url: payload.authUrl}, tab => {
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
  var code = getParamFromUrl('code', changeInfo.url);
  setTimeout(() => {
    sendAuthStatusUpdate(`Retrieving access token…`);
    fetchToken(code)
      .then(() => {
        sendAuthStatusUpdate('Fetching syndication targets…');
        return fetchSyndicationTargets();
      })
      .then(() => {
        sendAuthStatusUpdate(`Authentication complete.`);
        authTabId = null;
        setTimeout(() => {
          chrome.tabs.remove(tab.id);
        }, 500);
      })
      .catch(err => {
        error(err.message, err);
      });
  }, 500);
}

function sendAuthStatusUpdate(message) {
  info(message);
  getAuthTab().then(tab => {
    chrome.tabs.sendMessage(tab.id, {
      action: 'auth-status-update',
      payload: {message},
    });
  });
}

function isAuthRedirect(changeInfo) {
  var url = 'https://omnibear.com/auth/success';
  return changeInfo.url && changeInfo.url.startsWith(url);
}

chrome.runtime.onMessage.addListener(handleMessage);
chrome.tabs.onUpdated.addListener(handleTabChange);
chrome.contextMenus.create({
  title: 'Reply to entry',
  contexts: ['page', 'selection'],
  onclick: function() {
    if (typeof browser === 'undefined') {
      // Chrome
      window.open(
        'index.html?type=reply',
        'extension_popup',
        'width=450,height=510,status=no,scrollbars=yes,resizable=no,top=80,left=2000'
      );
    } else {
      // Firefox (and others?)
      browser.windows.create({
        url: 'index.html?type=reply',
        width: 450,
        height: 580,
        type: 'panel',
        left: 2000,
      });
    }
  },
});
