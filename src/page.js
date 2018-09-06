import {clearItem, focusClickedEntry, getCurrentItem} from './page/entry';
import {cleanUrl} from './util/url';

(function() {
  document.body.addEventListener('click', clearItem);

  document.body.addEventListener('contextmenu', focusClickedEntry);

  function handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'fetch-token-error':
        handleTokenError(request.payload.error);
        break;
      case 'auth-status-update':
        handleStatusUpdate(request.payload);
        break;
    }
  }
  chrome.runtime.onMessage.addListener(handleMessage);

  function handleTokenError(error) {
    if (!isAuthPage) {
      return;
    }

    const heading = document.getElementById('status-heading');
    const paragraph = document.getElementById('status-paragraph');
    heading.textContent = 'Error fetching token from token endpoint';
    paragraph.textContent = error.message;
  }

  function isAuthPage() {
    const l = document.location;
    return l.hostname === 'omnibear.com' && l.pathname === '/auth/success/';
  }

  function handleStatusUpdate(payload) {
    const {message, isError} = payload;
    const list = document.getElementById('status-list');
    if (!list) {
      return;
    }
    const item = document.createElement('li');
    item.innerText = message;
    if (isError) {
      item.classList.add('is-error');
    }
    list.appendChild(item);
  }

  if (!document.hidden) {
    sendFocusMessage();
  }
  window.addEventListener('focus', sendFocusMessage);

  function sendFocusMessage() {
    const supportsWebmention = pageSupportsWebmention();
    const pageEntry = {
      type: 'page',
      url: cleanUrl(document.location.href),
      title: document.title,
      webmention: supportsWebmention,
    };
    const itemEntry = getCurrentItem();
    let selectedEntry = null;
    if (itemEntry) {
      selectedEntry = {
        type: 'item',
        url: cleanUrl(itemEntry.url),
        title: itemEntry.title,
        webmention: supportsWebmention,
      };
    }
    chrome.runtime.sendMessage({
      action: 'focus-window',
      payload: {
        pageEntry,
        selectedEntry,
      },
    });
  }

  function pageSupportsWebmention() {
    return !!document.querySelector('link[rel="webmention"]');
  }

  if (isAuthPage()) {
    // hide paragraph used by old versions of Omnibear
    const paragraph = document.getElementById('status-paragraph');
    if (paragraph) {
      paragraph.parentElement.removeChild(paragraph);
    }
  }
})();
