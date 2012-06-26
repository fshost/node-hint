var hint = require('../node-hint').hint;

exports.getImplieds = function(source, options) {
	var hintOptions = {
		source: source,
		options: options
	};

	hintOptions.node = hintOptions.node || true;
	var lintdata = hint(hintOptions);
	if (lintdata.implieds)
		return lintdata.implieds;
	else
		return {};
};
