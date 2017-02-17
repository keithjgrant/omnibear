(function () {
  function handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'begin-auth':
        handleBeginAuth(request.payload);
        break;
    }
  }

  function handleBeginAuth(payload) {
    console.log('beginning');
  }

  chrome.runtime.onMessage.addListener(handleMessage);
}());
