import {h, render} from 'preact';
import App from './components/App';
import Webmentions from './components/webmentions/Webmentions';

if (document.location.search.includes('webmentions')) {
  document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('body--md');
    render(<Webmentions />, document.body);
  });
} else {
  document.addEventListener('DOMContentLoaded', function() {
    render(<App />, document.body);
  });
}
