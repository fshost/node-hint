var nodeHint = require(__dirname + '/../node-hint'),
	hint = nodeHint.hint,
	defaultReporter = require('../lib/report').report,
	getImplieds = nodeHint.getImplieds,
	errorFn = 'functiona test() { console.log("test"); }',
	goodFn = 'function test() { console.log("test"); }',
	impliedsFn = 'function test() { x=1; return myvar; }',
	assert = require('assert');
	expected = {
		errorFn: 'reporting one error per line\n\nline 1, col 1, Expected an assignment or function call and instead saw an expression.\n\n1 error\n',
		

		errorTwoFn: '\nline 1, col 1, Expected an assignment or function call and instead saw an expression.\n' + 
					'line 1, col 10, Missing semicolon.\n' +
					'line 1, col 17, Missing semicolon.\n' +
					'line 1, col 18, Expected to see a statement and instead saw a block.\n' +
					'line 1, col 18, Expected an assignment or function call and instead saw an expression.\n' +
					'line 1, col 19, Missing semicolon.\n' +
					'line 1, col 41, Expected \'(end)\' and instead saw \'}\'.\n\n' +
					'7 errors total, 7 errors shown\n',

		goodFn: '\n0 errors total, 0 errors shown\n',
		impliedsFn: [{ name: 'x', line: [ 1 ] }, { name: 'myvar', line: [ 1 ] }]
	};

//test source code with error using default reporter
hint({ source: errorFn, report: 'default' }, function(error, data) {
	assert.equal(data, expected.errorFn);
});

//test source code with error using default reporter
hint({ source: errorFn, report: { reporter: defaultReporter, options: { oneErrorPerLine: false } } }, function(error, data) {
	assert.equal(data, expected.errorTwoFn);
});

//test source code with no errors using default reporter
hint({ source: goodFn, sourceName:'goodFn' }, function(error, data) {
	assert.equal(data, expected.goodFn);
});

//test getImplieds
assert.deepEqual(getImplieds(impliedsFn), expected.impliedsFn);
