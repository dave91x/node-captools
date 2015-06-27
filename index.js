var request = require('request');
request.debug = false;

var captools = {
	
	headers: {
	  'Captricity-API-Token': '',
	  'User-Agent': 'node-captools [request]'
	},
	
	/**
     * Make a way to set the Captricity-API-Token in the header once for subsequent calls
     * @param   {String} token
     * @return  this
	 */
	connect: function(token) {
		this['headers']['Captricity-API-Token'] = token;
		return this;
	},

    /**
     *
     * @param url
     * @param callback_function
     */
    //apiGetCall: function(url, callback_function) {
    //    request({url: url, headers: this.headers}, function(error, response, body) {
    //        // Check for error
    //        if (!error && response.statusCode == 200) {
    //            callback_function(body)
    //        } else {
    //            console.log('Status Code Returned:', response.statusCode);
    //            console.log('Error:', error);
    //        }
    //    })
    //},

	/**
     * Get information on all Batches owned by calling user
     * @param   {}
     * @return  []
	 */
	listBatches: function(callback_function) {
        var options = {
            url: 'https://shreddr.captricity.com/api/v1/batch/',
            method: 'GET',
            headers: this.headers
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                callback_function(body);
            } else {
                console.log('Status Code Returned:', response.statusCode);
                console.log('Error:', error);
            }
        });
	},

    /**
     *  Get the details on a specific Batch owned by the calling user
     */
    readBatch: function(batchId, callback_function) {
        var options = {
            url: 'https://shreddr.captricity.com/api/v1/batch/' + batchId,
            method: 'GET',
            headers: this.headers
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                callback_function(body);
            } else {
                console.log('Status Code Returned:', response.statusCode);
                console.log('Error:', error);
            }
        });
    }
};

if (typeof module !== 'undefined') {
	module.exports = captools;
}

var runner = captools.connect(process.env.CAPTRICITY_API_TOKEN);
//console.log(runner.headers['Captricity-API-Token']);

runner.readBatch(27962, function(response) {
    console.log(response);
});
//runner.readBatch(29417);

console.log("");

runner.listBatches(function(response) {
    for (var i = 0, l = response.length; i < l; i++) {
        console.log(response[i].name);
        console.log(response[i]['submitted']);
        console.log("===========================");
    }
});
