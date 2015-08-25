
// Vendor Modules
/////////////////////////
var _ = require('lodash')

// Globals
//////////////////////////////////////
var isServer = typeof window == 'undefined'

// Colors
//////////////////////////////////////
var colors = [6, 2, 3, 4, 5, 1]
var prevColor = 0

// log
//////////////////////////////////////
function log(name)
{
	if (!_.isString(name))
		name = '<bad name>'
	var c = colors[prevColor % colors.length]

	if (!isServer)
		this.infoString = ' ' + name + ' '
	else
		this.infoString = ' \u001b[9' + c + 'm' + name + ' ' +
					'\u001b[3' + c + 'm\u001b[90m' + ' '

	// fix: remove soon
	this.i = this.infoString

	// Functions for simple logging
	//////////////////////////////////////
	this.heading = function(str)
	{
		if (_.isString(str))
		{
			console.log('\n\n' + str.info.bold)
		}
		else
			console.log('\n\n', str)
		this.line()
	}
	this.line = function(length)
	{
		if (typeof length == 'undefined')
			length = 48
		var msg = new Array(48).join('=')
		console.log(msg.info.bold)
	}
	this.msg = this.m = this.info = function()
	{
		// arguments.unshift(this.infoString)
		console.log.apply(this.infoString, arguments)
		// var str = ''
		// _.each(arguments, function(arg)
		// {
		// 	str += arg.toString()
		// })
		// return str
	}
	this.warning = function()
	{
		// if (_.isString(arguments[0]))
		// {
		// 	arguments[0] = arguments[0].warning
		// }
		this.msg.apply(arguments)
	}
	this.error = function()
	{
		// if (_.isString(arguments[0]))
		// {
		// 	arguments[0] = arguments[0].error
		// }
		this.msg.apply(arguments)
	}
}

// var log = require('log')('startup')
// console.log(log.m('some info'))
function getLog(name)
{
	var logInstance = new log(name)
	logInstance.toString = function()
	{
		return this.infoString
	}
	prevColor += 1
	return logInstance
}

module.exports = getLog
