var jshint = require(__dirname + '/lib/jshint');
exports.hint = function (source, buildName, options) {
	options = options || {};
	var results = [],
		data = [],
		lines=[],
		len,
		str = '',
		error,
		config = options.config || {},
		globals = options.globals || {},
		reportConfig = options.report || {};
	if (reportConfig.oneErrorPerLine === undefined)
		reportConfig.oneErrorPerLine = true;
    // Remove potential Unicode Byte Order Mark.
    source = source.replace(/^\uFEFF/, '');
    if (!jshint.JSHINT(source, config, globals)) {
    	if (reportConfig.oneErrorPerLine)
			str += 'reporting one error per line\n';
		str += '\n';
        jshint.JSHINT.errors.forEach(function (error) {
            if (error && (!(reportConfig.oneErrorPerLine) || (reportConfig.oneErrorPerLine && lines.indexOf(error.line) === -1))) {
				lines.push(error.line);
				results.push({file: buildName, error: error});
            }
        });
    }
    lintdata = jshint.JSHINT.data();
    if (lintdata) {
        lintdata.file = buildName;
        data.push(lintdata);
    }
    if (reportConfig.extendedReport)
    	str = extReport(results, data);
    else {
		len = results.length;
		results.forEach(function (result) {
			error = result.error;
			if (buildName)
				str += buildName + ': ';
			str += 'line ' + error.line + ', col ' +	error.character + ', ' + error.reason + '\n';
		});
		if (str)
			str += "\n" + len + ' error' + ((len === 1) ? '' : 's total, ' + lines.length + ' errors shown') + "\n";
	}
	return str;	
};

// report on extended data, not just errors
function extReport (results, data) {
	var len = results.length,
		str = '',
		file, error, globals, unuseds;
	results.forEach(function (result) {
		file = result.file;
		error = result.error;
		str += file  + ': line ' + error.line + ', col ' +
			error.character + ', ' + error.reason + '\n';
	});
	str += len > 0 ? ("\n" + len + ' error' + ((len === 1) ? '' : 's')) : "";
	data.forEach(function (data) {
		file = data.file;
		globals = data.implieds;
		unuseds = data.unused;
		if (globals || unuseds)
			str += '\n\n' + file  + ' :\n';
		if (globals) {
			str += '\tImplied globals:\n';
			globals.forEach(function (global) {
				str += '\t\t' + global.name  + ': ' + global.line + '\n';
			});
		}
		if (unuseds) {
			str += '\tUnused Variables:\n\t\t';
			unuseds.forEach(function (unused) {
				str += unused.name + '(' + unused.line + '), ';
			});
		}
	});
	if (str)
		str += "\n";
	return str;
}