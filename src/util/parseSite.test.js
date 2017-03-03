import {assert} from 'chai';
import {jsdom} from 'jsdom';
import parseSite from './parseSite';

describe('parseSite', function () {
  describe('getLinkValue', function () {
    it('should return null if link not found', function () {
      var page = jsdom('<link rel="other" href="http://example.com" />');
      var value = parseSite.getLinkValue(page, 'authorization_endpoint');
      assert.isNull(value);
    });

    it('should return link href value', function () {
      var page = jsdom('<div><link rel="authorization_endpoint" href="http://example.com" /></div>');
      var value = parseSite.getLinkValue(page, 'authorization_endpoint');
      assert.equal(value, 'http://example.com/');
    });
  });
});
