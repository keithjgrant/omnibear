
// TODO: refactor
export function post (url, payload) {
  var params;
  if (typeof payload === 'string') {
    params = payload;
  } else {
    params = getParamString(payload);
  }
  return fetch(`${url}?${params}`, {
    method: 'POST',
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

export function formEncodedToObject(formString) {
  const data = {};
  const parts = formString.split('&');
  parts.forEach((param, i) => {
    const [key, val] = param.split('=');
    const value = decodeURIParam(val);
    if (key.endsWith('[]')) {
      const k = key.substr(0, key.length-2);
      data[k] = data[k] || [];
      data[k].push(value);
    } else {
      data[key] = value;
    }
  });
  return data;
}

function decodeURIParam(param) {
  const str = param.replace(/\+/g, ' ');
  return decodeURIComponent(str);
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
      // TODO: get location/url of post & display somehow
      // res.headers.get('Location') -> null -- CORS blocking?
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
