import {h, render} from 'preact';
import {Provider} from 'mobx-preact';
import App from './components/App';
import store from './stores/store';
import authStore from './stores/authStore';
import draftStore from './stores/draftStore';
import settingsStore from './stores/settingsStore';

const stores = {
  store,
  authStore,
  draftStore,
  settingsStore,
};

document.addEventListener('DOMContentLoaded', function() {
  render(
    <Provider {...stores}>
      <App />
    </Provider>,
    document.body
  );
});
