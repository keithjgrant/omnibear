import {info, error} from './log';

export function findPageLinks(url, origin) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        error('Error fetching page source', {url, response});
        throw Error('Error fetching source page');
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
  removeNestedEntries(container);
  var links = container.querySelectorAll('.h-entry .e-content a[href]');
  if (!links.length) {
    info(`No links found in h-entry; searching entire page`);
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
  info(`${urls.length} links found in page`);
  return urls;
}

function getAbsoluteUrl(href, origin) {
  if (!href.startsWith('/')) {
    return href;
  }
  return `${origin}${href}`;
}

function removeNestedEntries(container) {
  var entries = container.querySelectorAll('.h-entry .h-entry');
  entries.forEach(entry => {
    entry.remove();
  });
}

export function findEndpoint(url) {
  const content = fetch(url).then(response => {
    if (response.ok) {
      return response.text();
    } else {
      error(`Error fetching ${url}`, response);
      throw Error(`Error fetching ${url}`);
    }
  });
  // TODO: parse content (& headers!) for micropub endpoint
}

export function sendWebmention() {
  //
}
