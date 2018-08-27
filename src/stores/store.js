import {observable, computed, action, runInAction} from 'mobx';
import authStore from './authStore';
import draftStore from './draftStore';
import settingsStore from './settingsStore';
import {
  NOTE,
  REPLY,
  SETTINGS,
  LOGS,
  LOGIN,
  MESSAGE,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
} from '../constants';
import {postNote, postLike, postRepost} from '../util/micropub';
import {getParamFromUrl} from '../util/url';
import {info, warning, error} from '../util/log';

class Store {
  @observable viewType;
  @observable currentPageUrl;
  @observable currentItemUrl;
  @observable selectedUrl;
  @observable isSending;
  @observable flashMessage;

  constructor() {
    this.auth = authStore;
    this.draft = draftStore;
    this.settings = settingsStore;
    this.viewType = this._determineInitialView();
    this.isSending = false;
  }

  @action
  setViewType(type) {
    this.viewType = type;
    if (type !== MESSAGE) {
      this.flashMessage = null;
    }
  }

  @action
  setSelectedUrl(url) {
    this.selectedUrl = url;
  }

  @action
  logout() {
    this.auth.clearCredentials();
    this.viewType = LOGIN;
  }

  @action
  sendNote = async () => {
    this.isSending = true;
    try {
      info('Sending note...');
      const location = await postNote(this.draft, this.settings.aliases);
    } catch (err) {}
  };

  @action
  sendLike = async () => {
    if (!this.selectedUrl) {
      warning('Cannot send like; no current URL found');
      return;
    }
    this.isSending = true;
    try {
      info('Sending like...', this.selectedUrl);
      const location = await postLike(this.selectedUrl);
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
    if (!this.selectedUrl) {
      warning('Cannot send repost; no current URL found');
      return;
    }
    this.isSending = true;
    try {
      info('Sending repost...', this.selectedUrl);
      const location = await postRepost(this.selectedUrl);
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
