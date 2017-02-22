
function getLinkValue(page, rel) {
  var link = page.querySelector(`link[rel="${rel}"]`);
  if (link) {
    return link.href;
  } else {
    return null;
  }
}

function fetchSiteMetadata(url) {
  return fetch(url)
  .then(function (res) {
    return res.text();
  }).then(function (content) {
    var page = document.createElement('html');
    page.innerHTML = content;
    return {
      authEndpoint: getLinkValue(page, 'authorization_endpoint'),
      tokenEndpoint: getLinkValue(page, 'token_endpoint'),
      micropub: getLinkValue(page, 'micropub')
    };
  });
}

module.exports = {
  getLinkValue, getLinkValue,
  fetchSiteMetadata: fetchSiteMetadata
};
