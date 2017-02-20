
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
    body: body ? JSON.stringify(body) : null
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
  getParamString: getParamString
};
