var router = require('./router').router;
var background = require('./background');
var login = require('./login');
var popup = require('./popup');

document.addEventListener('DOMContentLoaded', function () {
  router({
    background: background,
    login: login,
    popup: popup
  }, window.location.pathname);
});
