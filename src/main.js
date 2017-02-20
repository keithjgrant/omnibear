var router = require('./router').router;
var background = require('./background');
var login = require('./routes/login');
var popup = require('./routes/popup');
var reply = require('./routes/reply');

document.addEventListener('DOMContentLoaded', function () {
  router({
    background: background,
    login: login,
    popup: popup,
    reply: reply
    // itemReply: itemReply
  }, window.location.pathname);
});
