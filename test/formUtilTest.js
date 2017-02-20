var assert = require('chai').assert;
var jsdom = require('node-jsdom').jsdom;
var formUtil = require('../src/formUtil');

describe('formUtil', function () {
  describe('getFormValues', function () {
    it('shoud build empty object from empty form', function () {
      var form = jsdom('<form></form>');
      assert.deepEqual(formUtil.getFormValues(form), {});
    });

    it('should build object from form inputs', function () {
      var form = jsdom('<form><input name="foo" value="bar"/><input name="baz" value="bam"/></form>');
      assert.deepEqual(formUtil.getFormValues(form), {
        foo: 'bar',
        baz: 'bam'
      });
    });

    it('should add inputs with same name into array', function () {
      var form = jsdom('<form><input name="foo" value="bar"/><input name="foo" value="baz"/></form>');
      assert.deepEqual(formUtil.getFormValues(form), {
        foo: ['bar', 'baz']
      });
    });

    it('should get textarea values', function () {
      var form = jsdom('<form><textarea name="foo">bar</textarea></form>');
      assert.deepEqual(formUtil.getFormValues(form), {
        foo: 'bar'
      });
    });
  });

  describe('buildFieldsString', function () {
    it('should build empty string from empty form', function () {
      var form = jsdom('<form></form>');
      assert.equal(formUtil.buildFieldsString(form), '');
    });

    it('should build string from form inputs', function () {
      var form = jsdom('<form><input name="foo" value="bar"/></form>');
      assert.equal(formUtil.buildFieldsString(form), 'foo=bar');
    });

    it('should get textarea values', function () {
      var form = jsdom('<form><textarea name="foo">bar</textarea></form>');
      assert.deepEqual(formUtil.buildFieldsString(form), 'foo=bar');
    });
  });
});
