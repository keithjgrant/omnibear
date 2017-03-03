
// deprecated
export function post (url, payload, body) {
  console.warn('Using deprecated function: requests.post');
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

export function getParamString (payload) {
  var params = [];
  for (var prop in payload) {
    const value = payload[prop];
    if (Array.isArray(value)) {
      for (let val of value) {
        params.push(`${prop}[]=${val}`);
      }
    } else {
      params.push(`${prop}=${value}`);
    }
  }
  return params.join('&');
}

// x-www-form-urlencoded example: https://hacks.mozilla.org/2015/03/this-api-is-so-fetching/

export function postFormData(url, payload, token) {
  return new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formDataFromObject(payload),
    })
    .then(function (res) {
      if (res.status < 200 || res.status >= 400) {
        return reject(res.status);
      }
      console.log(res.headers.get('Location'));
      // TODO: get location/url of post & display somehow
      resolve(res.text());
    });
  });
}

export function formDataFromObject(obj) {
  var data = new FormData();
  for (var fieldName in obj) {
    if (Array.isArray(obj[fieldName])) {
      obj[fieldName].forEach((val, k) => {
        data.append(fieldName, val);
      });
    } else {
      data.append(fieldName, obj[fieldName]);
    }
  }
  return data;
}
