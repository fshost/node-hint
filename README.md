# node-hint
	
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
		nodeHint = require('node-hint').hint;
		hint(options, function(result) {
			console.log(result);
		});
		
where options may contain the following properties

	source: a string of javascript source code
	sourceName: a name to associate with the code (not required)
	callback: a function to call with the jsHint or reporter results as an argument
	jsHintOptions: jsHint options (there are many - see ./lib/jshint.js)
	report: reporting options (see below)
	
report options

	reporter: a function to parse jsHint results data
	options: additional argument to pass to the reporter function
	(the report option may also be set to the string 'default' to use the default string reporter)
	

callback
	

## Default Options 

	- report: 
		- reporter: default (simple string reporter)
		- oneErrorPerLine: true
	- jsHint:
		node: true
		standard options (and too many to list here) - see /lib/jshint.js for more info

## Reporter
	
	There is a default reporter that returns a simple report in the form of a string
	If the report option is set to "raw", the results will be the raw lint data 
	if a function is specified for the reporter report option, it will be passed the following arguments
		- data: the lint data returned by jsHint
		- options: report options (allows passing of additional data through to your callback if desired)
		- sourceName: the name supplied in options (if any)
		- callback: the callback supplied in options (if any)
		
## Results
	
	data is supplied to a callback or a returned value if no callback is provided
	if a reporter is defined, the callback will be passed to the reporter
	if the default report is used and a callback is supplied, the callback will be called with arguments error and results
	if a callback is not defined, either the value returned by the reporter or raw lint data will be returned

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

