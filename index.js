
var captools = {
	
	apiToken: '',
	/**
	  * @param   {String} token
	  * @return  self Object
	 */
	connect: function(token) {
		self.apiToken = token;
		return self;
	}
};

if (typeof module !== 'undefined') {
	module.exports = captools;
}