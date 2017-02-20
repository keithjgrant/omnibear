var post = require('./requests').post;
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
  var fields = getFormValues(form);
  fields.access_token = localStorage.getItem('token');
  console.log('fields', fields);
  post('https://keithjgrant-mp.herokuapp.com/micropub/main', null, {
    body: fields
  })
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
  el('post').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('posting');
    postNote();
    return false;
  })
  setTimeout(function () {
    el('input-content').focus();
  }, 100);
}
