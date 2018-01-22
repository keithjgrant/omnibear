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
    chrome.tabs.query({url: 'https://omnibear.com/auth/success*'}, function(
      tabs
    ) {
      if (tabs.length) {
        resolve(tabs[0]);
      } else {
        reject('Auth tab not found');
      }
    });
  });
}

export function logout() {
  const items = [
    'token',
    'domain',
    'authEndpoint',
    'tokenEndpoint',
    'micropubEndpoint',
  ];
  items.map(item => localStorage.removeItem(item));
}

const NON_ALPHANUM = /[^A-Za-z0-9\-]/g;
const FROM = 'áäâàãåčçćďéěëèêẽĕȇęėíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
const TO = 'aaaaaacccdeeeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';

export function generateSlug(content) {
  let formatted = content.toLocaleLowerCase().trim();
  formatted = formatted.replace(/\s/g, '-');
  for (let i = 0, l = FROM.length; i < l; i++) {
    formatted = formatted.replace(
      new RegExp(FROM.charAt(i), 'g'),
      TO.charAt(i)
    );
  }
  formatted = formatted.replace(NON_ALPHANUM, '');
  formatted = formatted.replace(/\-\-+/g, '-');
  const parts = formatted.split('-');
  return parts.splice(0, 6).join('-');
}
