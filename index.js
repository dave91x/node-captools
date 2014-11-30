var request = require('request');

var captools = {
	
	//apiToken: '',
	
	headers: { 
	  'Captricity-API-Token': '',
	  'User-Agent': 'node-captools [request]'
	},
	
	/**
	  * @param   {String} token
	  * @return  this
	 */
	connect: function(token) {
		this['headers']['Captricity-API-Token'] = token;
		return this;
	},
	
	/**
	  * @param   {}
	  * @return  []
	 */
	listBatches: function() {
		//console.log(this.headers);
		var batches;
		request({url: 'https://shreddr.captricity.com/api/v1/batch/',
		         headers: this.headers},
		         function(error, response, body) {
		             console.log(response.statusCode);
		             console.log(body);
			     	 batches = body;
		         }
		);
		return batches;
	}
};

if (typeof module !== 'undefined') {
	module.exports = captools;
}