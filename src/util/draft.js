const KEYS = ['h', 'content', 'category', 'mp-slug', 'mp-syndicate-to'];

const EMPTY_DRAFT = {
  h: 'entry',
  content: '',
  category: [],
  'mp-slug': '',
  'mp-syndicate-to': [],
};

export function getDraft() {
  const draft = JSON.parse(localStorage.getItem('draft'));
  if (draft) {
    return draft;
  }
  return EMPTY_DRAFT;
}

export function saveDraft(draft) {
  const clean = {};
  KEYS.forEach(key => {
    clean[key] = draft[key];
  });
  localStorage.setItem('draft', JSON.stringify(clean));
}

export function deleteDraft() {
  const draft = getDraft();
  saveDraft({
    h: 'entry',
    content: '',
    category: [],
    'mp-slug': '',
    'mp-syndicate-to': draft['mp-syndicate-to'],
  });
}
