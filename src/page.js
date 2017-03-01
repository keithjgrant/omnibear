import {clearItem, removeHighlight, focusClickedEntry, getCurrentItemUrl} from './page/entry';

(function () {

  document.body.addEventListener('click', clearItem);

  document.body.addEventListener('contextmenu', focusClickedEntry);

  // function handleMessage(request, sender, sendResponse) {
  //   switch (request.action) {
  //     case 'remove-entry-highlight':
  //       removeHighlight();
  //       break;
  //   }
  // }
  // chrome.runtime.onMessage.addListener(handleMessage);

  if (!document.hidden) {
    sendFocusMessage();
  }
  window.addEventListener('focus', sendFocusMessage);

  function sendFocusMessage() {
    chrome.runtime.sendMessage({
      action: 'focus-window',
      payload: {
        selectedEntry: getCurrentItemUrl(),
      },
    });
  }
}());
