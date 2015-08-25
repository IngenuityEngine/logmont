
// Vendor Modules
/////////////////////////
var _ = require('lodash')
var request = require('superagent')

// Our Modules
/////////////////////////
var baseLogger = require('./baseLogger')

// Main
/////////////////////////
var dbLogger = baseLogger.extend({
defaultOptions: {
	levels: {
		'debug': 0,
		'info': 1,
		'warning': 2,
		'error': 3,
		'critical': 4,
	},
	saveTimeout: 10000,
	logApiRoot: 'http://127.0.0.1/_log/',
},

init: function(options)
{
	this.options = _.extend(
		_.clone(this.defaultOptions),
		options)
},

save: function(cb)
{

},

// end of module
})

module.exports = function(name, options)
{
	return new dbLogger(name, options)
}
