var assert = require('chai').assert;
var jsdom = require('node-jsdom').jsdom;
var formUtil = require('../src/formUtil');

describe('formUtil', function () {
  describe('buildFieldsString', function () {
    it('should build empty string from empty form', function () {
      var form = jsdom('<form></form>');
      assert.equal(formUtil.buildFieldsString(form), '');
    });

    it('should build string from form input', function () {
      var form = jsdom('<form><input name="foo" value="bar"/></form>');
      assert.equal(formUtil.buildFieldsString(form), 'foo=bar');
    });
  });
});
