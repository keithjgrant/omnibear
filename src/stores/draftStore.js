import {observable, computed, action} from 'mobx';
import settingsStore from './settingsStore';
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
    this.slug = savedDraft.slug || savedDraft['mp-slug'];
    this.syndicateList =
      savedDraft.syndicateTo || savedDraft['mp-syndicate-to'];
    this._settings = settingsStore;
    this._isSlugModified = false;
  }

  @computed
  get tagsArray() {
    return this.tags
      .trim()
      .replace(/[\s+]/g, ' ')
      .split(' ');
  }

  @action
  setContent(content) {
    this.content = content;
    if (this.shouldAutoSlug()) {
      this.slug = generateSlug(content);
    }
    this.save();
  }

  @action
  setSlug(slug) {
    this.slug = slug;
    this._isSlugModified = slug !== '';
    this.save();
  }

  @action
  setTags = tagString => {
    this.tags = tagString;
    this.save();
  };

  @action
  setSyndicateList = syndicateTo => {
    this.syndicateList = syndicateTo;
    this.save();
  };

  @action
  clear() {
    this.content = '';
    this.tags = '';
    this.slug = '';
    this._isSlugModified = false;
    this.save();
  }

  save() {
    saveDraft({
      content: this.content,
      category: this.tagsArray,
      slug: this.slug,
      syndicateTo: this.syndicateList,
    });
  }

  shouldAutoSlug() {
    if (this._isSlugModified) {
      return false;
    }
    if (this._settings.autoSlug) {
      return true;
    }
    return false;
  }
}

export default new DraftStore();
