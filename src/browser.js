if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  // Chrome
  var browser = chrome;
}

export default browser;
