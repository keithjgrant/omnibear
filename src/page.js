import microformat from 'microformat-shiv';

(function () {
  let currentItem;
  const className = '__omnibear-selected-item';

  function clearItem() {
    if (currentItem) {
      chrome.runtime.sendMessage({
        action: 'clear-entry',
      });
      removeHighlight();
    }
  }

  function removeHighlight() {
    if (currentItem) {
      console.log('removing class');
      currentItem.classList.remove(className);
      currentItem = null;
    } else {
      console.log('no currentItem');
    }
  }

  document.body.addEventListener('click', function () {
    clearItem();
  });

  document.body.addEventListener('contextmenu', function (e) {
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
      el.classList.add(className);
      currentItem = el;
    }
  });

  function handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'remove-entry-highlight':
        removeHighlight();
        break;
    }
  }
  chrome.runtime.onMessage.addListener(handleMessage);
}());
