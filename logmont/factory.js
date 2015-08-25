var loggers = {
	simple: require('./baseLogger'),
	database: require('./databaseLogger'),
}

var baseLogger = require('./baseLogger')

module.exports = function(logger, name, options)
{
	if (arguments.length == 1)
	{
		name = logger
		logger = 'simple'
	}
	var logger = new loggers[logger](name, options)
	return logger.getLogger()
}
