var fetchSiteMetadata = require('./parseSite').fetchSiteMetadata;
var buildFieldsString = require('./formUtil').buildFieldsString;

module.exports = function () {
  var form = document.querySelector('#login > form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = buildFieldsString(form);
    var domain = document.getElementById('domain').value;
    var submit = document.getElementById('submit');
    fetchSiteMetadata(domain)
    .then(function (data) {
      if (!data.authEndpoint) {
        throw new Error('authentication_endpoint not found');
      }
      if (!data.tokenEndpoint) {
        throw new Error('token_endpoint not found');
      }
      if (!data.micropub) {
        throw new Error('micropub not found');
      }
      localStorage.setItem('authEndpoint', data.authEndpoint);
      localStorage.setItem('tokenEndpoint', data.tokenEndpoint);
      localStorage.setItem('micropubEndpoint', data.micropub);
      chrome.tabs.create({ url: `${data.authEndpoint}?${fields}` }, function (tab) {
        chrome.runtime.sendMessage({
          action: 'begin-auth',
          payload: {
            tabId: tab.id,
            domain: domain
          }
        });
      });
    });
  });
};
