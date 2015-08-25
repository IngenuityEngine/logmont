
// Vendor Modules
/////////////////////////
var expect = require('expect.js')

// Our Modules
/////////////////////////
var arkUtil = require('arkutil')
var baseLogger = require('../logmont/baseLogger')
var dbLogger = require('../logmont/dbLogger')

// Passed globals
/////////////////////////

// Mocha globals
/////////////////////////
var describe = arkUtil.getGlobal('describe')
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
	logApiRoot: 'http://127.0.0.1/api/log/'
}

both('should init for simple logging', function(done) {
	var log = baseLogger('test')
	log('sup')
	log('warning', {info: ['not','cool'], finished: false})
	log('error', 'zomg!')
	done()
})

both('should init for persitent logging', function(done) {
	var log = dbLogger('db', dbOptions)
	log('sup')
	log('warning', {info: ['not','cool'], finished: false})
	log('error', 'zomg!')
	done()
})

// end of tests
})
