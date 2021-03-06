const KEYS = ['title', 'content', 'category', 'slug', 'syndicateTo', 'type'];

const EMPTY_DRAFT = {
  title: '',
  content: '',
  category: [],
  slug: '',
  syndicateTo: [],
  type: null,
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

// export function deleteDraft() {
//   const draft = getDraft();
//   saveDraft({
//     content: '',
//     category: [],
//     slug: '',
//     syndicateTo: draft.syndicateTo,
//   });
// }
