# Node Hint - a node.js wrapper for jsHint to simplify checking internal source code string variables


## Installation

	npm install node-hint

## Usage

to check source code string with jsHint:

		var result = require(__dirname + '/../node-hint').hint(source, name, options, logger);
		
where

	source is a string of javascript source code
	name is a name to associate with the code (not required)
	options is a set of options (not required)
	logger is a logger (defaults to console.log)
		

## Default Options 

- report: 
	- oneErrorPerLine: true
	- extendedReport: false
- jsHint:
	standard options (and too many to list here) - see /lib/jshint.js for more info


## Requirements

* node.js


## Acknowledgements

JSHint developed by JSHint Community.

## License

MIT-License, see `LICENSE.txt`.

## Roadmap

- expand reporting / return options

