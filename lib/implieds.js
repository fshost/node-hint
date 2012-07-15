var hint = require('../node-hint').hint;

exports.getImplieds = function(source, options) {
	var hintOptions = {
		source: source,
		options: options
	},
	lintdata;	
	hintOptions.node = hintOptions.node || true;
	hintOptions.report = 'raw';
	lintdata = hint(hintOptions);
	if (lintdata.implieds)
		return lintdata.implieds;
	else
		return {};
};
