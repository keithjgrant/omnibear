import {observable, action, runInAction} from 'mobx';
import micropub from '../util/micropub';
import {info as log, error} from '../util/log';

class AuthStore {
  @observable domain;
  @observable token;
  @observable micropubEndpoint;
  @observable isLoading = false;
  @observable hasErrors = false;
  @observable errorMessage = '';

  constructor() {
    this.loadSettings();
  }

  isLoggedIn() {
    return this.token && this.micropubEndpoint;
  }

  @action
  loadSettings = () => {
    this.domain = localStorage.getItem('domain');
    this.token = localStorage.getItem('token');
    this.micropubEndpoint = localStorage.getItem('micropubEndpoint');
  };

  @action
  setDomain = domain => {
    this.domain = domain.trim();
    micropub.options.me = this.domain;
    localStorage.setItem('domain', this.domain);
  };

  @action
  setToken = token => {
    this.token = token.trim();
    micropub.options.token = this.token;
    localStorage.setItem('token', this.token);
  };

  @action
  setMicropubEndpoint = url => {
    this.micropubEndpoint = url.trim();
    micropub.options.micropubEndpoint = this.micropubEndpoint;
    localStorage.setItem('micropubEndpoint', this.micropubEndpoint);
  };

  @action
  async login(domain) {
    log(`Begin authentication to ${domain}`);
    this.isLoading = true;
    this.hasErrors = false;
    this.errorMessage = '';
    this.domain = domain;
    micropub.options.me = domain;
    try {
      const url = await micropub.getAuthUrl();
      log(`authorization_endpoint found: ${url}`);
      chrome.runtime.sendMessage({
        action: 'begin-auth',
        payload: {
          authUrl: url,
          domain: domain,
          metadata: {
            authEndpoint: micropub.options.authEndpoint,
            tokenEndpoint: micropub.options.tokenEndpoint,
            micropub: micropub.options.micropubEndpoint,
          },
        },
      });
    } catch (err) {
      error(err.message, err);
      runInAction(() => {
        this.hasErrors = true;
        this.errorMessage = `Missing micropub data on ${domain}. Please ensure the following links are present: authorization_endpoint, token_endpoint, micropub`;
        this.isLoading = false;
      });
    }
  }

  @action
  clearCredentials() {
    this.domain = '';
    this.token = '';
    this.micropubEndpoint = '';
  }
}

export default new AuthStore();
