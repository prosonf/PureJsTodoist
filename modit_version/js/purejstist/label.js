// label.js

modit("purejstodoist", function() {

	var label = function(p_data) {
		var data = p_data || {};
		this.name = data.name || '';
	}

	this.exports(label);
});
