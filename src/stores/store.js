import {observable, computed, action, runInAction} from 'mobx';
import authStore from './authStore';
import {NOTE, REPLY, SETTINGS, LOGS, LOGIN} from '../constants';
import {getParamFromUrl} from '../util/url';
import {info, warning, error} from '../util/log';

class Store {
  @observable viewType;
  @observable currentPageUrl;
  @observable currentItemUrl;
  @observable selectedUrl;
  @observable isSubmitting;

  constructor() {
    this.viewType = this._determineInitialView();
    this.isSubmitting = false;
    this.auth = authStore;
  }

  @action
  setViewType(type) {
    this.viewType = type;
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
  async sendLike() {
    if (!this.selectedUrl) {
      warning('Cannot send like; no current URL found');
      return;
    }
    this.isSubmitting = true;
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
