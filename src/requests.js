
function post (url, payload, body) {
  var params;
  if (typeof payload === 'string') {
    params = payload;
  } else {
    params = getParamString(payload);
  }
  return fetch(`${url}?${params}`, {
    method: 'POST',
    headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
   },
    body: body ? JSON.stringify(body) : null
  })
  .then(function (res) {
    return res.text();
  });
}

function postMicropub (url, form, token) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: new FormData(form)
  })
  .then(function (res) {
    return res.text();
  });
}

function getParamString (payload) {
  var params = [];
  for (var prop in payload) {
    params.push(`${prop}=${payload[prop]}`);
  }
  return params.join('&');
}

module.exports = {
  post: post,
  postMicropub: postMicropub,
  getParamString: getParamString
};
