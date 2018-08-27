import Micropub from 'micropub-helper';

const micropub = new Micropub({
  clientId: 'https://omnibear.com',
  redirectUri: 'https://omnibear.com/auth/success/',
  state: 'very-secret-omnibear-state',
  me: localStorage.getItem('domain'),
  authEndpoint: localStorage.getItem('authEndpoint'),
  tokenEndpoint: localStorage.getItem('tokenEndpoint'),
  micropubEndpoint: localStorage.getItem('micropubEndpoint'),
  token: localStorage.getItem('token'),
  scope: 'create delete update',
});
export default micropub;

export function postNote(entry, aliases) {
  return micropub.create(
    {
      h: 'entry',
      content: entry.content,
      category: entry.tagsArray,
      [aliases.slug]: entry.slug,
      [aliases.syndicateTo]: entry.syndicateList,
    },
    'form'
  );
}

export function postReply(entry, url, aliases) {
  return micropub.create(
    {
      h: 'entry',
      'in-reply-to': url,
      content: entry.content,
      category: entry.tagsArray,
      [aliases.slug]: entry.slug,
      [aliases.syndicateTo]: entry.syndicateList,
    },
    'form'
  );
}

export function postBookmark(entry, url, aliases) {
  return micropub.create(
    {
      h: 'entry',
      'bookmark-of': url,
      content: entry.content,
      category: entry.tagsArray,
      [aliases.slug]: entry.slug,
      [aliases.syndicateTo]: entry.syndicateList,
    },
    'form'
  );
}

export function postLike(url) {
  const entry = {
    h: 'entry',
    'like-of': url,
  };
  return micropub.create(entry, 'form');
}

export function postRepost(url) {
  const entry = {
    h: 'entry',
    'repost-of': url,
  };
  return micropub.create(entry, 'form');
}
