
// Vendor Modules
/////////////////////////
var expect = require('expect.js')

// Our Modules
/////////////////////////
var arkUtil = require('arkutil')
var logFactory = require('../logmont/factory')

// Passed globals
/////////////////////////

// Mocha globals
/////////////////////////
var describe = arkUtil.getGlobal('describe')
var request = require('superagent')
// var beforeEach = arkUtil.getGlobal('beforeEach')
// var afterEach = arkUtil.getGlobal('afterEach')

// Tests
/////////////////////////
describe('test/test.js', function()
{

// test functions for client/server
var both = arkUtil.getGlobal('it')
// var client = arkUtil.clientTest(both)
// var server = arkUtil.serverTest(both)

// bail after the first error
this.bail(true)
// 5 second timeout
this.timeout(10000)

// Test Variables
/////////////////////////
var dbOptions = {
	apiRoot: 'http://127.0.0.1:/api/log/',
}

both('should do simple logging', function(done) {
	var lm = logFactory('test')

	lm('sup')
	lm('warning', {info: ['not','cool'], finished: false})
	lm('error', 'zomg!')
	lm.heading('About to go down')
	lm('stuff')
	lm('moreStuff')
	lm.line()
	done()
})

both('should do database logging', function(done) {
	var lm = logFactory('database', 'dbTest', dbOptions)

	lm('sup')
	lm('warning', {info: ['not','cool'], finished: false})
	lm('error', 'zomg!')

	request
		.get(dbOptions.apiRoot)
		.end(function(err, resp)
		{
			// console.log('err:', err)
			// console.log('resp:', resp)
			// expect()
			done()
		})
})

both('should log events', function(done) {
	var lm = logFactory('database', 'eventTest', dbOptions)

	lm('event', {info: ['not','cool'], finished: false})
	lm('error', 'zomg!')
	done()
})

// end of tests
})
