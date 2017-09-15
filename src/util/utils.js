export function openLink(e) {
  e.preventDefault();
  if (e.target.href) {
    chrome.tabs.create({url: e.target.href});
  }
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getAuthTab() {
  return new Promise(function(resolve, reject) {
    chrome.tabs.query({url: 'https://omnibear.com/auth/success*'}, function(tabs) {
      if (tabs.length) {
        resolve(tabs[0]);
      } else {
        reject('Auth tab not found');
      }
    });
  });
}

export function logout() {
  const items = ['token', 'domain', 'authEndpoint', 'tokenEndpoint', 'micropubEndpoint'];
  items.map(item => localStorage.removeItem(item));
}
