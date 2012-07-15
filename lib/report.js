// simple string output report for node-hint as might be output to console
exports.report = function(data, options, sourceName, callback) {
	try {
		var str = '',
			results = [],
			lines=[],
			len,
			error,
			errors = data.errors;
		if (options.oneErrorPerLine === undefined)
			options.oneErrorPerLine = true;
		if (errors && errors.length && errors.length > 0) {
			if (options.oneErrorPerLine)
				str += 'reporting one error per line\n';
			str += '\n';
			errors.forEach(function (error) {
				if (error && (!(options.oneErrorPerLine) || (options.oneErrorPerLine && lines.indexOf(error.line) === -1))) {
					lines.push(error.line);
					results.push({file: sourceName, error: error});
				}
			});
		}
		if (options.extendedReport)
			str = extReport(results, data);
		else {
			
			len = results.length;
			results.forEach(function (result) {
				error = result.error;
				if (sourceName)
					str += sourceName + ': ';
				str += 'line ' + error.line + ', col ' +	error.character + ', ' + error.reason + '\n';
			});
			
				str += "\n" + len + ' error' + ((len === 1) ? '' : 's total, ' + lines.length + ' errors shown') + "\n";
		}
		if (typeof callback === 'function')
			callback(null, str);
		else
			return str;
	}
	catch (e) {
		if (typeof callback === 'function')
			callback(e);
		else
			throw e;
	}
}

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