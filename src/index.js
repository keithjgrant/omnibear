import {h, render} from 'preact';
import {Provider} from 'mobx-preact';
import App from './components/App';
import store from './stores/store';
import draftStore from './stores/draftStore';

const stores = {
  store,
  draftStore,
};

document.addEventListener('DOMContentLoaded', function() {
  render(
    <Provider {...stores}>
      <App />
    </Provider>,
    document.body
  );
});
