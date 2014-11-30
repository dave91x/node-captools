// First, we require 'expect' from Chai.
var chai       = require('chai'),
    should     = chai.should(),
	captools   = require('../index.js');

// describe a suite (or group) of tests
describe('captools test suite 1', function() {
	
	beforeEach(function() {
		captools.connect(process.env.CAPTRICITY_API_TOKEN);
	});
	
	it('uses connect to establish api token', function() {
		//console.log(captools.apiToken);
		captools['headers']['Captricity-API-Token'].should.not.equal('');
	});
	
	it('lists current batches', function() {
		//console.log(captools.headers);
		console.log("in the test before defining batches")
		batches = captools.listBatches();
		console.log("in the test before logging batches");
		console.log(batches);
		batches.should.have.length(1);
	});
});



