var postMicropub = require('./requests').postMicropub;
var getFormValues = require('./formUtil').getFormValues;

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
  var token = localStorage.getItem('token');
  var mpEndpoint = localStorage.getItem('micropubEndpoint');
  postMicropub(mpEndpoint, form, token)
  .then(function (response) {
    // TODO
  });
}

module.exports = function () {
  ensureLoggedIn();

  el('authenticated-to').innerHTML = localStorage.getItem('domain');
  el('logout').addEventListener('click', function (e) {
    e.preventDefault();
    logout();
  });
  el('post').addEventListener('submit', function (e) {
    e.preventDefault();
    postNote();
    return false;
  })
  setTimeout(function () {
    el('input-content').focus();
  }, 100);
}
