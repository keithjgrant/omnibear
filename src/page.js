(function () {
  let currentItem;
  const className = '__omnibear-selected-item';

  function clearItem() {
    if (currentItem) {
      currentItem.classList.remove(className);
      currentItem = null;
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

    if (el.classList.contains('h-entry') || true)
      el.classList.add(className);
      currentItem = el;
    }
  );
}());
