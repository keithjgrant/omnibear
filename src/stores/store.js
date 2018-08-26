import {observable, computed, action, runInAction} from 'mobx';
import authStore from './authStore';
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
import {postLike} from '../util/micropub';
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
    this.viewType = this._determineInitialView();
    this.isSending = false;
    this.auth = authStore;
    this.settings = settingsStore;
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
        this.viewType = MESSAGE;
        this._flashSuccessMessage('Item liked successfully', location);
        this.isSending = false;
      });
    } catch (err) {
      runInAction(() => {
        this._flashErrorMessage('Error posting like', err);
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
    this._closeAfterDelay();
  }

  _flashErrorMessage(message, error) {
    error(message, error);
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
    if (!isAuthenticated()) {
      return LOGIN;
    }
    const type = getParamFromUrl('type', window.location.search);
    return type || NOTE;
  }
}

export default new Store();

// TODO: move to authStore
function isAuthenticated() {
  return (
    !!localStorage.getItem('token') &&
    !!localStorage.getItem('micropubEndpoint')
  );
}
