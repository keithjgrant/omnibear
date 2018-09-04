import {
  clearItem,
  removeHighlight,
  focusClickedEntry,
  getCurrentItem,
} from './page/entry';
import {cleanUrl} from './util/url';

(function() {
  document.body.addEventListener('click', clearItem);

  document.body.addEventListener('contextmenu', focusClickedEntry);

  function handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'fetch-token-error':
        handleTokenError(request.payload.error);
        break;
    }
  }
  chrome.runtime.onMessage.addListener(handleMessage);

  if (!document.hidden) {
    sendFocusMessage();
  }
  window.addEventListener('focus', sendFocusMessage);

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
})();
