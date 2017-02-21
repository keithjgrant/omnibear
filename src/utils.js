
export function openLink(e) {
  e.preventDefault();
  if (e.target.href) {
    chrome.tabs.create({ url: e.target.href });
  }
}
