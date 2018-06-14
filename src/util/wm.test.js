import {assert} from 'chai';
import {parseLinksFromMarkup} from './wm';

describe('parseLinksFromMarkup', function() {
  it.skip('should find links', function() {
    const content = `<div>
    <a href="https://example.com/foo">One</a>
    <a href="https://google.com?q=example">Two</a>
  </div>`;
    assert.equal(parseLinksFromMarkup(content), [
      'https://example.com/foo',
      'https://google.com?q=example',
    ]);
  });
});
