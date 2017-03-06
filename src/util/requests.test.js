import {assert} from 'chai';
import fetchMock from 'fetch-mock';
import FormData from 'form-data';
import {
  getParamString,
  formDataFromObject,
  postFormData,
  fetching,
  formEncodedToObject,
} from './requests';

// polyfill FormData
global.FormData = FormData;

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

    it('should add brackets for array values', function () {
      var str = getParamString({
        foo: ['bar', 'baz']
      });
      assert.equal(str, 'foo[]=bar&foo[]=baz');
    });
  });

  describe('postFormData', function () {
    it('should include authorization header', function () {
      const url = 'http://example.com';
      fetchMock.post(url, 'ok');

      postFormData(url, {}, 'abc123');

      const parts = fetchMock.lastCall(url);
      const reqUrl = parts[0];
      const request = parts[1];
      assert.equal(reqUrl, url);
      assert.equal(request.headers['Authorization'], 'Bearer abc123');
      fetchMock.restore();
    });

    it('should include the payload as form multipart', function () {
      const url = 'http://example.com';
      fetchMock.post(url, 'ok');

      const payload = {
        content: 'content body text',
        'in-response-to': 'http://foo.com/123',
      };
      postFormData(url, payload, 'abc123');

      const request = fetchMock.lastCall(url)[1];
      const body = request.body;
      // form-data doesn't appear to have getters, so we'll dig into the streams array
      assert.equal(body._streams.length, 6);
      assert.equal(body._streams[1], 'content body text');
      assert.equal(body._streams[4], 'http://foo.com/123');
      fetchMock.restore();
    });

    it.skip('should return location from response header', function () {
      const url = 'http://example.com';
      fetchMock.post(url, {
        body: 'posted successfully',
        headers: {
          Location: 'http://post-location.com/abc',
        },
      });

      const data = postFormData(url, {}, 'abc123');
      // console.log(data.headers);
      // data.then(function (a, b, c) {
      //   console.log('RESPONSE:', a);
      // });

      fetchMock.restore();
    });
  });

  describe('formEncodedToObject', function () {
    it('should convert string to object', function () {
      const actual = formEncodedToObject('one=two&three=four');
      assert.deepEqual(actual, {one: 'two', three: 'four'});
    });

    it('should pluses in string to spaces', function () {
      const actual = formEncodedToObject('one=the+value+here&three=four');
      assert.deepEqual(actual, {one: 'the value here', three: 'four'});
    });

    it('should convert repeated key to array', function () {
      const actual = formEncodedToObject('foo[]=one&foo[]=two');
      assert.deepEqual(actual, {foo: ['one', 'two']});
    });
  });

});
