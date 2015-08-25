
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
var logOptions = {
	apiRoot: 'http://127.0.0.1:2020/api/log/',
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
	var lm = logFactory('database', 'dbTest', logOptions)

	lm('sup')
	lm('warning', {info: ['not','cool'], finished: false})
	lm('error', 'zomg!')
	var data = {
		type: 'error',
		data: {
			zomg: ['world','is','ending'],
		},
		source: 'somewhere',
	}

	lm.save(data, function(err, resp)
	{
		resp = resp[0]
		console.log('resp:', resp)
		expect(resp._id).to.be.ok()
		expect(resp.type).to.be('error')
		expect(resp.data).to.be.an('object')
		expect(resp.data.zomg).to.be.an('array')
		expect(resp.source).to.be('somewhere')
		done()
	})
})

both('should log events', function(done) {
	var lm = logFactory('database', 'eventTest', logOptions)

	lm('event', {info: ['not','cool'], finished: false})
	lm('error', 'zomg!')
	done()
})

// end of tests
})
