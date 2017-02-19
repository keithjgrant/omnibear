var buildFieldsString = require('./formUtil').buildFieldsString;

module.exports = function () {
  console.log('in Login');

  var form = document.querySelector('#login > form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = buildFieldsString(form);
    var url = `${form.action}?${fields}`;
    var domain = document.getElementById('domain').value;
    chrome.tabs.create({url: url}, function (tab) {
      chrome.runtime.sendMessage({
        action: 'begin-auth',
        payload: {
          tabId: tab.id,
          domain: domain
        }
      });
    });
  });
};
