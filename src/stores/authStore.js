import {observable, action} from 'mobx';
import micropub from '../util/micropub';

class AuthStore {
  @observable domain;
  @observable token;
  @observable micropubEndpoint;

  constructor() {
    this.loadSettings();
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
}

export default new AuthStore();
