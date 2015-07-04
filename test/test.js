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
        captools['headers']['Captricity-API-Token'].should.not.equal('');
	});
	
	it('lists current batches', function() {
        captools.listBatches(function(response) {
            response.should.have.length(5);
        });
	});

	it('create and delete a new batch', function() {
        captools.createBatch("Node Test 1", true, false, null, function(response) {
            response.should.equal("Node Test 1");
        });
	});
});



