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
                console.log("in the listBatches request call...")
                callback_function(JSON.parse(body));
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
                console.log("in the readBatch request call...");
                callback_function(JSON.parse(body));
            } else {
                console.log('Status Code Returned:', response.statusCode);
                console.log('Error:', error);
            }
        });
    },

    /**
     * Create a new Batch
     */
    createBatch: function(callback_function) {
        var options = {
            url: 'https://shreddr.captricity.com/api/v1/batch/' + batchId,
            method: 'POST',
            headers: this.headers
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("in the createBatch request call...");
                callback_function(JSON.parse(body));
            } else {
                console.log('Status Code Returned:', response.statusCode);
                console.log('Error:', error);
            }
        });
    },

    /**
     * Add file to Batch
     */
    addFileToBatch: function(callback_function) {
        var options = {
            url: 'https://shreddr.captricity.com/api/v1/batch/' + batchId,
            method: 'POST',
            headers: this.headers
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("in the createBatch request call...");
                callback_function(JSON.parse(body));
            } else {
                console.log('Status Code Returned:', response.statusCode);
                console.log('Error:', error);
            }
        });
    },
};

if (typeof module !== 'undefined') {
	module.exports = captools;
}

var runner = captools.connect(process.env.CAPTRICITY_API_TOKEN);
//console.log(runner.headers['Captricity-API-Token']);
console.log("finished creating Captricity client...");

var names = [27962, 29417];
names.forEach(function(value) {
    runner.readBatch(value, function(response) {
        console.log("in the main thread, callback function provided to readBatch call");
        //console.log(response);
        console.log(response['name']);
        //for (var name in response) {
        //    console.log(response[name] );
        //}
    })
});

runner.listBatches(function(response) {
    console.log("in the main thread, callback function provided to listBatches call");
    //console.log(response);
    for (var i = 0, l = response.length; i < l; i++) {
        console.log(response[i]['name']);
        console.log(response[i]['submitted']);
        console.log("===========================");
    }
});
