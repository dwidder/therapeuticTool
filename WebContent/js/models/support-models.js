var SupportModel = Backbone.Model.extend({
	defaults: function() {
		return {
			name: "",
			author: "",
			date: "",
			videoURL: "",
			thumbNail: "",
		};
	}
});

var SupportModelCollection = Backbone.Collection.extend({
	model: SupportModel,
});