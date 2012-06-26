var jsHint = exports.jsHint = require(__dirname + '/lib/jshint').JSHINT,
	defaultReporter = require('./lib/report').report;

exports.hint = function (options, callback) {
	var option,
		defaults = {						// possible options and their defaults
			source: null,					// source code to parse
			sourceName:	null,				// name to associate with this source code
			callback:	null,				// callback function to execute with results
			jsHintOptions: {				// jsHint options (there are many - see ./lib/jshint.js)
				node: true					// defaults to assume source is for Node.js
			},
			report: {						// options for reporting/formatting jsHint results
				reporter: 'default',		// there is a simple default string reporter
				options: {
					oneErrorPerLine: true	// only show one error per line by default
				}
			}
		},
		lintdata,
		result;
	for (option in defaults) {
		if (options[option] === undefined)
			options[option] = defaults[option];
	}
	if (typeof options.source !== 'string')
		throw new Error('source code unrecognized in options.source');
	else {
		try {
			//Remove potential Unicode Byte Order Mark.
			options.source = options.source.replace(/^\uFEFF/, '');
		}
		catch (e) {
			//ignore if this generates an error
		}
		//console.log('options.source',options.source);
		result = jsHint(options.source, options.jsHintOptions);
		lintdata = jsHint.data();
		lintdata = lintdata || {};
		if (options.sourceName)
			lintdata.sourceName = options.sourceName;
		if (options.report === undefined || options.report === 'raw' || options.report === false && callback)
			callback(lintdata);
		else if (options.report === 'default' || options.report.reporter === 'default')
			options.report = {
				jsHintOptions: { oneErrorPerLine: true, extended: false },
				reporter: defaultReporter
			};
		if (options.report && options.report.reporter)
			options.report.reporter(lintdata, options.report, options.sourceName, callback);
		return lintdata;
    }
};

exports.report = require('./lib/report').report;
exports.getImplieds = require('./lib/implieds').getImplieds;