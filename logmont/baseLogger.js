
// Vendor Modules
/////////////////////////
var _ = require('lodash')
var Class = require('uberclass')

// Our Modules
/////////////////////////

// Main
/////////////////////////
module.exports = Class.extend(

// static
{
	isServer: typeof window == 'undefined',
	colors: [6, 2, 3, 4, 5, 1],
	prevColor: 0,
},

// methods
{
defaultOptions: {
	levels: [
		'debug',
		'info',
		'warn',
		'error',
		'critical',
	],
	saveTimeout: 10000,
	apiRoot: 'http://127.0.0.1/log/',
	colors: {
		info: 6,
		error: 2,
		warn: 3,
		critical: 4,
	},
},

init: function(name, options)
{
	this.c = this.Class.colors[this.Class.prevColor % this.Class.colors.length]
	this.Class.prevColor += 1

	if (this.Class.isServer)
	{
		this.infoString = this.colorize(name, this.c)
	}
	else
		this.infoString = ' ' + name + ' '

	this.options = _.extend(
		_.clone(this.defaultOptions),
		options)
	_.each(this.levels, function(level)
	{
		this.prototype[level] = function()
		{
			this.log(level, arguments)
		}.bind(this)
	}, this)
},

getLogger: function()
{
	var logger = function(level, data)
	{
		this.log(level, data)
	}

	logger = logger.bind(this)
	logger.log = this.log.bind(this)
	logger.save = this.save.bind(this)
	logger.heading = this.heading.bind(this)
	logger.line = this.line.bind(this)

	return logger
},

log: function(level, data)
{
	var start = 1
	if (!data)
	{
		data = level
		level = 'debug'
		start = 0
	}

	var args = [this.infoString]
	_.each(arguments, function(val, i)
		{
			if (i < start)
				return
			if (_.isPlainObject(val))
				args.push(JSON.stringify(val, null, 4))
			else
				args.push(val)
		})

	// no clue, pulled from debug
	if (console && console.log)
		Function.prototype.apply.call(console.log, console, args)

	return data
},

save: function(cb)
{
	cb()
},

heading: function(heading)
{
	console.log('\n\n',
		this.colorize(heading, this.options.colors.info))
	this.line()
},

line: function(length)
{
	if (typeof length == 'undefined')
		length = 48
	var msg = new Array(48).join('=')
	console.log(this.colorize(msg, this.options.colors.info))
},

colorize: function(str, c)
{
	if (!this.Class.isServer)
		return str
	return '\u001b[9' + c + 'm' + str +
		'\u001b[3' + c + 'm\u001b[90m'
},

// end of module
})


if (!module.parent)
{
	console.log('wtf')
	console.log('\u001b[9' + 6 + 'm' + 'wtf' +
		'\u001b[3' + 6 + 'm\u001b[90m' + 'tits')
	// var sigh = module.exports('wtf')
	// sigh.log('grr')
}
