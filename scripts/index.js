var token = localStorage.getItem('token');
if (!token) {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function () {

localStorage.clear();
});
