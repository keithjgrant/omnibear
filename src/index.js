import { h, render } from 'preact';
import App from './components/app';

document.addEventListener('DOMContentLoaded', function () {
  render(<App/>, document.body);
});
