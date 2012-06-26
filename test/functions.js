var nodeHint = require(__dirname + '/../node-hint'),
	hint = nodeHint.hint,
	getImplieds = nodeHint.getImplieds,
	errorFn = 'functiona test() { console.log("test"); }',
	goodFn = 'function test() { console.log("test"); }',
	impliedsFn = 'function test() { x=1; return myvar; }',
	assert = require('assert');

function log(source, result) {
	console.log('test completed for ',source);
	console.log('result: ', result);
	console.log('\n');
}

hint({ source: errorFn, report: 'default' }, function(str) {
	var expectedErrorResult = 'reporting one error per line\n\nline 1, col 1, Expected an assignment or function call and instead saw an expression.\n\n1 error\n';
	log(errorFn, str);
});

hint({ source: goodFn, sourceName:'goodFn' }, function(data) {
	log(goodFn, data);
});

var expectedImpliedsResult = [{ name: 'x', line: [ 1 ] }, { name: 'myvar', line: [ 1 ] }];
console.log('getImplieds for ' + impliedsFn);
console.log(getImplieds(impliedsFn));
