var SupportItemView = Backbone.View.extend({
	model: SupportModel,
	className: "support-menu-item",
	
	events: {
		"click": "showVideo",
	},
	
	initialize: function(){
		
	},
	
	template: _.template(
			'<div class="supItemDate"><%= date %></div>' +
			'<div class="supItemTitle"><%= name %></div>' +
			'<div class="supItemDesc"><%= desc %></div>' +
			'<div class="supItemAuthor"><%= author %></div>'
			),
	
	showVideo: function(){
		TT.events.trigger("showVideo", this.model);
	},
			
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	}
	
});

var SupportItemCollectionView = Backbone.View.extend({
	
	collection: SupportModelCollection,
	className: "support-menu",
	
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
		var siv = new SupportItemView({model: m});
		this.$el.append(siv.render().$el);
	},
	
});