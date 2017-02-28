import {assert} from 'chai';
import {getParamString, formDataFromObject} from './requests';

describe('requests', function () {
  describe('getParamString', function () {
    it('should build string', function () {
      var str = getParamString({
        foo: 'bar',
        bam: 'baz'
      });
      assert.equal(str, 'foo=bar&bam=baz');
    });

    it('should build string from single value', function () {
      var str = getParamString({
        foo: 'bar'
      });
      assert.equal(str, 'foo=bar');
    });
  });

  // TODO: how to stub fetch() in Node?
  // TODO: how to test FormData in Node?
});
