
export function getParamFromUrl(paramName, url) {
  var params = url.split('?')[1];
  return getParamFromUrlString(paramName, params);
}

export function getParamFromUrlString(paramName, params) {
  var matches = params.split('&').filter(param => param.startsWith(`${paramName}=`));
  if (matches && matches.length) {
    var value = matches[0].substr(paramName.length + 1);
    return decodeURIComponent(value);
  } else {
    return null;
  }
}
