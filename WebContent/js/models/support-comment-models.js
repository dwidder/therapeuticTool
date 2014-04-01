var SupportCommentModel = Backbone.Model.extend({
	defaults: function() {
		return {
			author: "",
			date: "",
			comment: "",
		};
	}
});

var SupportCommentModelCollection = Backbone.Collection.extend({
	model: SupportCommentModel,
});