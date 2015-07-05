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
     * Helper function to streamline redundant code
     * @param url
     * @param callback_function
     */
    sendRequest: function(options, callback_function) {
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("in sendRequest function")
                callback_function(body)
            } else {
                console.log('Status Code Returned:', response.statusCode);
                console.log('Error:', error);
            }
        })
    },

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
        console.log("in the readBatch request call...");
        this.sendRequest(options, callback_function);
        //request(options, function(error, response, body) {
        //    if (!error && response.statusCode == 200) {
        //        console.log("in the readBatch request call...");
        //        callback_function(JSON.parse(body));
        //    } else {
        //        console.log('Status Code Returned:', response.statusCode);
        //        console.log('Error:', error);
        //    }
        //});
    },

    /**
     * Create a new Batch, specifying setup parameters
     */
    createBatch: function(name, sorting_enabled, is_sorting_only, documents, callback_function) {
        name = typeof name !== 'undefined' ? name : "Test Batch";
        sorting_enabled = typeof sorting_enabled !== 'undefined' ? sorting_enabled : true;
        is_sorting_only = typeof is_sorting_only !== 'undefined' ? is_sorting_only : false;
        documents = typeof documents === 'Array' ? documents : [];
        var form = {name: name, sorting_enabled: sorting_enabled, is_sorting_only: is_sorting_only};
        if (documents.length > 0) {
            form.documents = documents;
        }
        var options = {
            url: 'https://shreddr.captricity.com/api/v1/batch/',
            method: 'POST',
            form: form,
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
     * Delete a Batch specified by batchId
     */
    deleteBatch: function(batchId, callback_function) {
        var options = {
            url: 'https://shreddr.captricity.com/api/v1/batch/' + batchId,
            method: 'DELETE',
            headers: this.headers
        };
        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("in the deleteBatch request call...");
                callback_function(JSON.parse(body));
            } else {
                console.log('Status Code Returned:', response.statusCode);
                console.log('Error:', error);
            }
        });
    },

    /**
     * Add file at given filePath to batch specified by batchId
     */
    addFileToBatch: function(batchId, filePath, callback_function) {
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
console.log("finished creating Captricity client...");

var names = [27962, 29417];
names.forEach(function(value) {
    runner.readBatch(value, function(response) {
        console.log("in the main thread, callback function provided to readBatch call");
        console.log(response['name']);
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

//runner.createBatch("Node Test 1", true, false, null, function(response) {
//    console.log("in the main thread, callback function provided to createBatch call");
//});
