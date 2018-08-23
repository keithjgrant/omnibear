import {observable, computed, action} from 'mobx';
import {getDraft, saveDraft} from '../util/draft';
import {generateSlug} from '../util/utils';

class DraftStore {
  @observable content;
  @observable tags;
  @observable slug;
  @observable syndicateList = [];

  constructor() {
    const savedDraft = getDraft();
    this.content = savedDraft.content;
    this.tags = savedDraft.category.join(' ');
    this.slug = savedDraft['mp-slug'];
    this.syndicateList = savedDraft['mp-syndicate-to'];
  }

  @computed
  get tagsArray() {
    return this.tags
      .trim()
      .replace(/[\s+]/g, ' ')
      .split(' ');
  }

  @action
  setContent(content, autoSlug = false) {
    this.content = content;
    if (autoSlug) {
      this.slug = generateSlug(content);
    }
  }

  @action
  setTags(tagString) {
    this.tags = tagString;
  }

  @action
  setSyndicateList(syndicateTo) {
    this.syndicateList = syndicateTo;
  }

  // TODO: clearDraft? or call util/draft.deleteDraft directly from component?

  save() {
    saveDraft({
      h: 'entry',
      content: this.content,
      category: this.tagsArray,
      'mp-slug': this.slug,
      'mp-syndicate-to': this.syndicateList,
    });
  }
}

export default new DraftStore();
