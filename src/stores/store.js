import {observable, action, computed, runInAction} from 'mobx';
import authStore from './authStore';
import draftStore from './draftStore';
import settingsStore from './settingsStore';
import {
  NOTE,
  REPLY,
  BOOKMARK,
  LOGIN,
  MESSAGE,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from '../constants';
import {
  postNote,
  postReply,
  postBookmark,
  postLike,
  postRepost,
} from '../util/micropub';
import {getParamFromUrl} from '../util/url';
import {info, warning, error} from '../util/log';

class Store {
  @observable viewType;
  @observable currentPageUrl;
  @observable currentItemUrl;
  @observable selectedEntry;
  @observable isSending;
  @observable flashMessage;

  constructor() {
    this.auth = authStore;
    this.draft = draftStore;
    this.settings = settingsStore;
    this.viewType = this._determineInitialView();
    this.isSending = false;
  }

  @computed
  get includeTitle() {
    return this.viewType === BOOKMARK;
  }

  @action
  setViewType(type) {
    this.viewType = type;
    if (type !== MESSAGE) {
      this.flashMessage = null;
    }
    if (type === BOOKMARK) {
      this.draft.title = this.selectedEntry ? this.selectedEntry.title : '';
    } else {
      this.draft.title = '';
    }
  }

  @action
  setSelectedEntry(entry) {
    this.selectedEntry = entry;
    if (this.viewType === BOOKMARK) {
      this.draft.title = entry.title;
    }
  }

  @action
  logout() {
    this.auth.clearCredentials();
    this.viewType = LOGIN;
  }

  send() {
    switch (this.viewType) {
      case NOTE:
        this.sendNote();
        break;
      case REPLY:
        this.sendReply();
        break;
      case BOOKMARK:
        this.sendBookmark();
        break;
    }
  }

  @action
  sendNote = async () => {
    this.isSending = true;
    try {
      info(`Sending note...`);
      const location = await postNote(this.draft, this.settings.aliases);
      runInAction(() => {
        this.draft.clear();
        this._flashSuccessMessage('Note sucessfully sent', location);
        this.isSending = false;
      });
    } catch (err) {
      this._flashErrorMessage('Error sending note', err);
      this.isSending = false;
    }
  };

  @action
  sendReply = async () => {
    if (!this.selectedEntry || !this.selectedEntry.url) {
      warning('Cannot send reply; no current URL found');
      return;
    }
    this.isSending = true;
    try {
      info(`Sending reply...`);
      const location = await postReply(
        this.draft,
        this.selectedEntry.url,
        this.settings.aliases
      );
      runInAction(() => {
        this.draft.clear();
        this._flashSuccessMessage('Reply sucessfully sent', location);
        this.isSending = false;
      });
    } catch (err) {
      this._flashErrorMessage('Error sending reply', err);
      this.isSending = false;
    }
  };

  @action
  sendBookmark = async () => {
    if (!this.selectedEntry || !this.selectedEntry.url) {
      warning('Cannot send bookmark; no current URL found');
      return;
    }
    this.isSending = true;
    try {
      info(`Sending bookmark...`);
      const location = await postBookmark(
        this.draft,
        this.selectedEntry.url,
        this.settings.aliases
      );
      runInAction(() => {
        this.draft.clear();
        this._flashSuccessMessage('Bookmark sucessfully sent', location);
        this.isSending = false;
      });
    } catch (err) {
      this._flashErrorMessage('Error sending bookmark', err);
      this.isSending = false;
    }
  };

  @action
  sendLike = async () => {
    if (!this.selectedEntry || !this.selectedEntry.url) {
      warning('Cannot send like; no current URL found');
      return;
    }
    this.isSending = true;
    try {
      info('Sending like...', this.selectedEntry);
      const location = await postLike(this.selectedEntry.url);
      runInAction(() => {
        this._flashSuccessMessage('Item liked successfully', location);
        this.isSending = false;
      });
    } catch (err) {
      runInAction(() => {
        this._flashErrorMessage('Error sending like', err);
        this.isSending = false;
      });
    }
  };

  @action
  sendRepost = async () => {
    if (!this.selectedEntry || !this.selectedEntry.url) {
      warning('Cannot send repost; no current URL found');
      return;
    }
    this.isSending = true;
    try {
      info('Sending repost...', this.selectedEntry);
      const location = await postRepost(this.selectedEntry.url);
      runInAction(() => {
        this._flashSuccessMessage('Item reposted successfully', location);
        this.isSending = false;
      });
    } catch (err) {
      runInAction(() => {
        this._flashErrorMessage('Error reposting', err);
        this.isSending = false;
      });
    }
  };

  _flashSuccessMessage(message, location) {
    info(message, location);
    this.flashMessage = {
      message,
      type: MESSAGE_SUCCESS,
      location,
    };
    this.viewType = MESSAGE;
    this._closeAfterDelay();
  }

  _flashErrorMessage(message, err) {
    error(message, err);
    this.flashMessage = {
      message,
      type: MESSAGE_ERROR,
      error,
    };
    this._closeAfterDelay();
  }

  _closeAfterDelay() {
    if (this.settings.closeAfterPosting) {
      setTimeout(window.close, 3000);
    }
  }

  _determineInitialView() {
    if (!this.auth.isLoggedIn()) {
      return LOGIN;
    }
    const type = getParamFromUrl('type', window.location.search);
    return type || NOTE;
  }
}

export default new Store();
