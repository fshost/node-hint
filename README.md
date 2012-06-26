# Node Hint
	
	a node.js module that provides:
		- a wrapper for jsHint to simplify checking internal source code string variables
		- related source code parsing utility functions
		- a simple jsHint reporter suitable for console output


## Installation

	npm install node-hint

## Usage
	
	require('node-hint').hint(options, callback);
	
## Example
		
		var options = {
			source: 'function test() { console.log('my test function'); }',
			sourceName: 'testFunction'
		},
		nodeHint = require('node-hint');
		.hint(options, function(result) {
			console.log(result);
		});
		
where options may contain the following properties

	source: a string of javascript source code
	sourceName: a name to associate with the code (not required)
	callback: a function to call with the jsHint results as an argument
	jsHintOptions: jsHint options (there are many - see ./lib/jshint.js)
	report: reporting options (see below)
	
report options

	reporter: a function to parse jsHint results data
	options: additional argument to pass to the reporter function
	(the report option may also be set to the string 'default' to use the default string reporter)
	

## Default Options 

- report: 
	- oneErrorPerLine: true
- jsHint:
	node: true
	standard options (and too many to list here) - see /lib/jshint.js for more info

## Additional Methods

	In addition to the hint method, node-hint exposes the following additional methods:
		jsHint - the original jsHint function (that node-hint wraps)
		report - the default reporter that parses jsHint data into string output
		getImplieds - a utility function that returns any implied globals in source 

## Requirements

* node.js


## Acknowledgements

JSHint developed by JSHint Community.

## License

MIT-License, see `LICENSE.txt`.

## Roadmap

- add formal tests
- expand reporting and parsing methods

