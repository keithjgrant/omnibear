import {observable, computed, action} from 'mobx';
import {NOTE, REPLY, SETTINGS, LOGS, LOGIN} from '../constants';
import {getParamFromUrl} from '../util/url';

class Store {
  @observable viewType;
  @observable currentPageUrl;
  @observable currentItemUrl;
  @observable selectedUrl;

  constructor() {
    this.viewType = this._determineInitialView();
  }

  _determineInitialView() {
    if (!isAuthenticated()) {
      return LOGIN;
    }
    const type = getParamFromUrl('type', window.location.search);
    return type || NOTE;
  }

  @action
  setViewType(type) {
    this.viewType = type;
  }

  @action
  setSelectedUrl(url) {
    this.selectedUrl = url;
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
