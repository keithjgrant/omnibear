import microformat from 'microformat-shiv';


const CLASS_NAME = '__omnibear-selected-item';
let currentItem;
let currentItemUrl;

export function clearItem() {
  if (currentItem) {
    chrome.runtime.sendMessage({
      action: 'clear-entry',
    });
    removeHighlight();
  }
}

export function removeHighlight() {
  if (currentItem) {
    currentItem.classList.remove(CLASS_NAME);
    currentItem = null;
    currentItemUrl = null;
  }
}

export function focusClickedEntry(e) {
  clearItem();
  let el = e.target;
  while(!el.classList.contains('h-entry') && el.tagName != 'BODY') {
    el = el.parentElement;
  }

  if (!el.classList.contains('h-entry')) {
    return;
  }
  const mf = microformat.get({node: el});
  let url;
  if (mf.items.length && mf.items[0].properties && mf.items[0].properties.url) {
    url = mf.items[0].properties.url[0];
  }
  if (url) {
    chrome.runtime.sendMessage({
      action: 'select-entry',
      payload: {
        url: url,
      },
    });
    el.classList.add(CLASS_NAME);
    currentItem = el;
    currentItemUrl = url;
  }
}

export function getCurrentItemUrl() {
  return currentItemUrl;
}
