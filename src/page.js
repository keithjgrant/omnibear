import {
  clearItem,
  removeHighlight,
  focusClickedEntry,
  getCurrentItemUrl,
} from './page/entry';

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
    chrome.runtime.sendMessage({
      action: 'focus-window',
      payload: {
        selectedEntry: getCurrentItemUrl(),
      },
    });
  }
})();
