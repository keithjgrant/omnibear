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
      // case 'remove-entry-highlight':
      //   removeHighlight();
      //   break;
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

    // I am working on restructuring this page on omnibear.com, so I am
    // making this compatible with both page layouts for now. The IDs
    // below are the new layout; the querySelectors match the old layout.
    let heading = document.getElementById('status-heading');
    let paragraph = document.getElementById('status-paragraph');
    if (!heading) {
      heading = document.querySelector('.main > h1');
    }
    if (!paragraph) {
      paragraph = document.querySelector('.main > p');
    }

    heading.textContent = 'Error fetching token from token endpoint';
    paragraph.textContent = error;
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
