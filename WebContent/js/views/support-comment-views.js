var SupportCommentView = Backbone.View.extend({
	model: SupportCommentModel,
	className: "support-comment",
	
	events: {
		
	},
	
	initialize: function(){
		
	},
	
	template: _.template(
			'<div class="supComAuthor"><%= author %></div>' +
			'<div class="supComDate"><%= date %></div>' +
			'<div class="supComComment"><%= comment %></div>'
			),
	
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	},
});

var SupportCommentCollectionView = Backbone.View.extend({
	
	collection: SupportCommentModelCollection,
	className: "support-comment-list",
	
	initialize: function() {
	},
	
	template: _.template(
			''
			),
			
	render: function(){
		this.$el.html(this.template());
		
		//add all the support item
		this.collection.forEach(this.addOne, this);		
		
		return this;
	},
	
	addOne: function(m){
		var scv = new SupportCommentView({model: m});
		this.$el.append(scv.render().$el);
	},
	
});