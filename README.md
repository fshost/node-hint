# Node Hint - a node.js wrapper for jsHint to simplify checking internal source code string variables


## Installation

	npm install node-hint

## Usage

to check source code string with jsHint:

		var result = require(__dirname + '/../node-hint').hint(options);
		
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
	
	Node Hint also exposes the jsHint function directly, as well as a simple reporter

## Requirements

* node.js


## Acknowledgements

JSHint developed by JSHint Community.

## License

MIT-License, see `LICENSE.txt`.

## Roadmap

- expand reporting / return options

