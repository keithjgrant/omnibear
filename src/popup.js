
module.exports = function () {
  console.log('in Popup');
  var token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }

  document.getElementById('logout').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = 'login.html';
  });
}
