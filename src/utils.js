
export function openLink(e) {
  e.preventDefault();
  if (e.target.href) {
    chrome.tabs.create({ url: e.target.href });
  }
}

export function getCurrentTabUrl() {
  return new Promise(function (resolve, reject) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      if (!tabs.length) {
        return reject();
      }
      const url = tabs[0].url;
      resolve(url.split('?')[0]);
    });
  });
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
