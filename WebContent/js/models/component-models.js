var ComponentModel = Backbone.Model.extend({
	defaults: function() {
		return {
			name: "",
			videoList: {},
		};
	}
});

var ComponentModelCollection = Backbone.Collection.extend({
	model: ComponentModel,
});