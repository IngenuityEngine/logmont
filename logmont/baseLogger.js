
// Vendor Modules
/////////////////////////
var _ = require('lodash')
var Class = require('uberclass')

// Our Modules
/////////////////////////

// Main
/////////////////////////
var baseLogger = Class.extend({
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

save: _.noop,

// end of module
})

module.exports = function(name, options)
{
	return new baseLogger(name, options)
}
