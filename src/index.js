import {h, render} from 'preact';
import {configure} from 'mobx';
import {Provider} from 'mobx-preact';
import App from './components/App';
import store from './stores/store';
import authStore from './stores/authStore';
import draftStore from './stores/draftStore';
import settingsStore from './stores/settingsStore';

configure({enforceActions: true});

const stores = {
  store,
  auth: authStore,
  draft: draftStore,
  settings: settingsStore,
};

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.search.includes("location=sidebar")) {
    document.body.classList.add('sidebar');
  }

  render(
    <Provider {...stores}>
      <App />
    </Provider>,
    document.body
  );
});
