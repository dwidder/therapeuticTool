var SupportVideoView = Backbone.View.extend({
	model: SupportModel,
	className: "support-video",
	
	events: {
		
	},
	
	initialize: function(){
		
	},
	
	template: _.template(
			'<video x-webkit-airplay="allow" preload="" src="<%= videoURL %>" poster="" style="width: 100%;" controls></video>'
			),
	
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	},
});