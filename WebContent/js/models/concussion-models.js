var ConcussionModel = Backbone.Model.extend({
	defaults: function() {
		return {
			name: "",
			contentURL: "",
		};
	}
});

var ConcussionModelCollection = Backbone.Collection.extend({
	model: ConcussionModel,
});