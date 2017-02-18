var assert = require('chai').assert;
var router = require('../src/router');

describe('router', function () {
  describe('trimPath', function () {
    var trimPath = router.trimPath;

    it('should trim slash and html', function () {
      assert.equal(trimPath('/foo.html'), 'foo');
    });

    it('should not trim beginning when no leading slash', function () {
      assert.equal(trimPath('foo.html'), 'foo');
    });

    it('should not trim end when no html', function () {
      assert.equal(trimPath('/foo'), 'foo');
    });
  });

  describe('router', function () {
    it('should route to current page', function (done) {
      router.router({
        foo: function () { assert.isTrue(true); done(); },
        bar: function() { assert.isTrue(false); done(); }
      }, '/foo.html');
    });

    it('should route to default if matches found', function (done) {
      router.router({
        default: function () { assert.isTrue(true); done(); },
        bar: function() { assert.isTrue(false); done(); }
      }, '/foo.html');
    });

    it('should map _generated_background_page to background', function (done) {
      router.router({
        background: function () { assert.isTrue(true); done(); },
        bar: function() { assert.isTrue(false); done(); }
      }, '/_generated_background_page.html');
    });
  });
});
