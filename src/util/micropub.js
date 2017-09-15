const Micropub = require('micropub-helper');

export default new Micropub({
  clientId: 'https://omnibear.com',
  redirectUri: 'https://omnibear.com/auth/success/',
  state: 'very-secret-omnibear-state',
  me: localStorage.getItem('domain'),
  authEndpoint: localStorage.getItem('authEndpoint'),
  tokenEndpoint: localStorage.getItem('tokenEndpoint'),
  micropubEndpoint: localStorage.getItem('micropubEndpoint'),
  token: localStorage.getItem('token'),
});
