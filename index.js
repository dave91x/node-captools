var request = require('request');
request.debug = true;

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
		var batches = request({url: 'https://shreddr.captricity.com/api/v1/batch/', headers: this.headers}, function(e,r,b) {console.log(b);});
		// , function(e,r,b) {return r});
		// , function(e,r,b) {console.log(r);});
	 	// function(error, response, body) {
	 	//   console.log(response.statusCode);
	 	//   console.log(body);
	 	//   batches = body;
	 	// }
		// );
		return batches;
	}
};

if (typeof module !== 'undefined') {
	module.exports = captools;
}

var runner = captools.connect(process.env.CAPTRICITY_API_TOKEN);
console.log(runner.headers['Captricity-API-Token']);
runner.listBatches();
