
var colors = [6, 2, 3, 4, 5, 1]
var colorSelector = 0
function Timer(label)
{
	this.label = label || ''
	this.prefix = '» '
	if (typeof window != 'undefined' && window.document)
	{
		this.color = this.grey = this.resetColor = ''
	}
	else
	{
		colorSelector += 1
		var color = colors[colorSelector % colors.length]
		this.color = '\x1b[9' + color + 'm'
		this.grey = '\x1b[90m'
		this.resetColor = '\x1b[0m'
	}
	this.start = function()
	{
		this.startTime = (new Date()).getTime()
		return this
	}
	this.reset = function()
	{
		this.start()
		return this
	}
	this.log = function(message)
	{
		this.time = (new Date()).getTime() - this.startTime
		console.log(this.color + this.prefix + this.label + this.resetColor + ' ' +
					this.grey + message + ': ' + this.color + this.time + 'ms' +
					this.resetColor)
		return this
	}
}

module.exports = function(label)
{
	return new Timer(label)
}
