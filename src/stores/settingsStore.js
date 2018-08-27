import {observable, action, computed} from 'mobx';
import {DEFAULT_REACJI} from '../constants';

const MAX_LENGTH = 15;

class SettingsStore {
  @observable defaultToCurrentPage = false;
  @observable autoSlug = true;
  @observable closeAfterPosting = false;
  @observable debugLog = false;
  @observable reacji = DEFAULT_REACJI;
  @observable slugFieldName = 'mp-slug';
  @observable syndicateToFieldName = 'mp-syndicate-to';

  constructor() {
    this.loadSettings();
  }

  @action
  loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (!settings) {
      return;
    }
    this.defaultToCurrentPage = settings.defaultToCurrentPage;
    this.autoSlug = settings.autoSlug;
    this.closeAfterPosting = settings.closeAfterPosting;
    this.debugLog = settings.debugLog;
    this.reacji = settings.reacji || this.reacji;
    this.slugFieldName = settings.slug || this.slugFieldName;
    this.syndicateToFieldName =
      settings.syndicateTo || this.syndicateToFieldName;
  }

  @action
  setDefaultToCurrentPage = (on = true) => {
    this.defaultToCurrentPage = on;
    this.save();
  };

  @action
  setAutoSlug = (on = true) => {
    this.autoSlug = on;
    this.save();
  };

  @action
  setCloseAfterPosting = (on = true) => {
    this.closeAfterPosting = on;
    this.save();
  };

  @action
  setDebugLog = (on = true) => {
    this.debugLog = on;
    this.save();
  };

  @action
  setReacji = reacji => {
    this.reacji = reacji;
    this.save();
  };

  @action
  addReacji = value => {
    this.reacji.push(value.substr(0, MAX_LENGTH));
  };

  @action
  setSlugFieldName = name => {
    this.slugFieldName = name;
    this.save();
  };

  @action
  setSyndicateToFieldName = name => {
    this.syndicateToFieldName = name;
    this.save();
  };

  @computed
  get aliases() {
    return {
      slug: this.slugFieldName || 'mp-slug',
      syndicateTo: this.syndicateToFieldName || 'mp-syndicate-to',
    };
  }

  save = () => {
    const settings = {
      defaultToCurrentPage: this.defaultToCurrentPage,
      autoSlug: this.autoSlug,
      closeAfterPosting: this.closeAfterPosting,
      debugLog: this.debugLog,
      reacji: this.reacji,
      slug: this.slugFieldName,
      syndicateTo: this.syndicateToFieldName,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  };
}

export default new SettingsStore();
