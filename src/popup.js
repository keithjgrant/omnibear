var post = require('.requests').post;
var buildFieldsString = require('./formUtil').buildFieldsString;

function el(id) {
  return document.getElementById(id);
}

function ensureLoggedIn() {
  var token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

function postNote () {
  var form = el('post');
  var fields = buildFieldsString(form);
  post('https://keithjgrant-mp.herokuapp.com/micropub/main', fields)
  .then(function (response) {
    console.log(response);
  });
}

module.exports = function () {
  ensureLoggedIn();

  el('authenticated-to').innerHTML = localStorage.getItem('domain');
  el('logout').addEventListener('click', function (e) {
    e.preventDefault();
    logout();
  });
  setTimeout(function () {
    el('input-content').focus();
  }, 100);
}
