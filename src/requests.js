
function post (url, payload, body) {
  var params;
  if (typeof payload === 'string') {
    console.log('a');
    params = payload;
  } else {
    console.log('b');
    params = getParamString(payload);
  }
  console.log('posting', params);
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

function postMicropub (url, payload) {
  return fetch(`${url}?micropubDocument=${JSON.stringify(payload)}`, {
    method: 'POST',
    headers: {
     'Authorization': `Bearer ${payload.access_token}`
    }
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
