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
        var code = getParamFromUrl('code', changeInfo.url);
        fetchToken(code)
      } else if (isSuccessfulToken(changeInfo)) {
        var token = getParamFromUrl('access_token', changeInfo,url);
        console.log('token fetched', token);
        localStorage.setItem('token', token);
        chrome.tabs.remove(tab.id);
      }
    });
  }

  function isSuccessfulAuth (changeInfo) {
    var url = 'http://omnibear.com/auth/success';
    return changeInfo.status === 'loading' && changeInfo.url && changeInfo.url.startsWith(url);
  }

  function isSuccessfulToken (changeInfo) {
    var url = 'http://omnibear.com/auth/callback';
    return changeInfo.status === 'loading' && changeInfo.url && changeInfo.url.startsWith(url);
  }

  function getParamFromUrl(paramName, url) {
    var params = url.split('?')[1];
    var token = params.split('&').filter(param => param.startsWith(`${paramName}=`));
    return token[0].substr(5);
  }

  function fetchToken(code) {
    var payload = {
      code: code,
      redirect_uri: 'http://omnibear.com/auth/callback/',
      client_id: 'http://omnibear.com',
      me: 'http://keithjgrant.com'
    };
    var data = new FormData();
    for (var prop in payload) {
      data.append(prop, payload[prop]);
    }
    return fetch('https://tokens.indieauth.com/token', {
      method: 'POST',
      body: data
    })
    .then(function (res) {
      return res.body
    });
  }

  chrome.runtime.onMessage.addListener(handleMessage);
}());
