var app = require('./server');
var assert = require('assert');
var superagent = require('superagent');

describe('server', function() {
  var server;

  beforeEach(function() {
    server = app().listen(3000);
  });

  afterEach(function() {
    server.close();
  });

  it('prints out "Hello, world" when user goes to /', function(done) {
    superagent.get('http://localhost:3000/', function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.text, "Hello, world!");
      done();
    });
  });

  it('prints out user with option test when go to /user?options=1', function(done) {
    superagent.get('http://localhost:3000/user/john?option=1', function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);      
      assert.equal(res.text, "Page for user john with option 1");
      done();
    });
  });
});
