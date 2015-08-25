
// Vendor Modules
/////////////////////////
var _ = require('lodash')
var request = require('superagent')
var baseLogger = require('./baseLogger')

// Main
/////////////////////////
module.exports = baseLogger.extend(
{

defaultOptions: {
},

init: function(name, options)
{
	this.data = []
	this._super(name, options)
},

save: function(data, cb)
{
	request
		.post(this.options.apiRoot)
		.send(data)
		.end(function(err, resp)
		{
			if (cb)
				cb(err, resp.body)
		})
},

// end of module
})
