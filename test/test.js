// First, we require 'expect' from Chai.
var chai       = require('chai'),
    should     = chai.should(),
	captools   = require('../index.js'),
	connect    = captools.connect;
	

// describe a suite (or group) of tests
describe('captools test suite 1', function() {
	
	// The tests have an English description...
	// it('has 2 equal to or greater than 0', function() {
	// 	// and a code assertion.
	// 	expect(2).to.be.above(0);
	// });
	
	it('connects with api token', function() {
		captools.apiToken.should.equal('');
		connect('myApiToken');
		captools.apiToken.should.equal('myApiToken');
	});
});



