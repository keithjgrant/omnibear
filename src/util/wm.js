export function findPageLinks(url, origin) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        // TODO: log
        console.error(response);
        throw Error('Problem fetching source page');
      }
      return response.text();
    })
    .then(content => {
      return parseLinksFromMarkup(content, origin);
    });
}

export function parseLinksFromMarkup(content, origin) {
  var container = document.createElement('div');
  container.innerHTML = content;
  var links = container.querySelectorAll('.h-entry a[href]');
  if (!links.length) {
    links = container.querySelectorAll('a[href]');
  }
  var urls = [];
  links.forEach(link => {
    const url = link.attributes.href.value;
    if (!url || url === '/' || url.startsWith('#')) {
      return;
    }
    urls.push(getAbsoluteUrl(url, origin));
  });
  return urls;
}

function getAbsoluteUrl(href, origin) {
  if (!href.startsWith('/')) {
    return href;
  }
  return `${origin}/${href}`;
}
