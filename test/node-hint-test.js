
var jsHint = require(__dirname + '/../node-hint').hint,
	errorFn = 'functiona test() { console.log("test"); }',
	goodFn = 'function test() { console.log("test"); }',
	expectedErrorOutput = 'reporting one error per line\n\nline 1, col 1, Expected an assignment or function call and instead saw an expression.\n\n1 error\n',
	assert = require('assert'),
	errorOutput = jsHint(errorFn),
	goodOutput = jsHint(goodFn);
	
assert.equal(errorOutput, expectedErrorOutput);
assert.equal(goodOutput,'');

console.log('\njsHint test completed successfully\n');