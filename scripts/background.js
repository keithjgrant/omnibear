(function () {
  function handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'begin-auth':
        handleBeginAuth(request.payload);
        break;
    }
  }

  function handleBeginAuth(payload) {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (tabId !== payload.tabId) {
        return;
      }
      if (isSuccessfulAuth(changeInfo)) {
        var token = getTokenFromUrl(changeInfo.url);
        localStorage.setItem('token', token);
        chrome.tabs.remove(tab.id);
      }
    });
  }

  function isSuccessfulAuth (changeInfo) {
    var url = 'https://indieauth.com/success';
    return changeInfo.status === 'loading' && changeInfo.url && changeInfo.url.startsWith(url);
  }

  function getTokenFromUrl(url) {
    var params = url.split('?')[1];
    var token = params.split('&').filter(param => param.startsWith('code='));
    return token[0].substr(5);
  }

  chrome.runtime.onMessage.addListener(handleMessage);
}());
