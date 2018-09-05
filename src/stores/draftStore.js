import {observable, computed, action} from 'mobx';
import settingsStore from './settingsStore';
import {getDraft, saveDraft} from '../util/draft';
import {generateSlug} from '../util/utils';

class DraftStore {
  @observable title;
  @observable content;
  @observable tags;
  @observable slug;
  @observable syndicateList = [];

  constructor() {
    const savedDraft = getDraft();
    this.content = savedDraft.content;
    this.tags = savedDraft.category.join(' ');
    // backwards support to <= v1.1.0 'mp-slug'
    this.slug = savedDraft.slug || savedDraft['mp-slug'];
    // backwards support to <= v1.1.0 'mp-syndicate to'
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
  setTitle(title) {
    this.title = title;
    this.updateSlug();
    this.save();
  }

  @action
  setContent(content) {
    this.content = content;
    this.updateSlug();
    this.save();
  }

  @action
  updateSlug() {
    if (!this.shouldAutoSlug() || this._isSlugModified) {
      return;
    }

    if (this.title) {
      this.slug = generateSlug(this.title);
    } else {
      this.slug = generateSlug(this.content);
    }
  }

  @action
  setSlug(slug) {
    this.slug = slug.replace(/ /g, '-');
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
    this.title = '';
    this.content = '';
    this.tags = '';
    this.slug = '';
    this._isSlugModified = false;
    this.save();
  }

  save() {
    saveDraft({
      title: this.title,
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
