var SupportCommentView = Backbone.View.extend({
	model: SupportCommentModel,
	className: "support-comment",
	
	events: {
		
	},
	
	initialize: function(){
		
	},
	
	template: _.template(
			'<div class="support-comment-usericon">' +
				'<img src="img/user_default_icon.png">' +
			'</div>' +			
			'<div class="support-comment-info">' +
				'<div class="supComAuthor"><%= author %></div>' +
				'<div class="supComDate"><%= date %></div>' +
				'<div class="supComComment"><%= comment %></div>' +
			'</div>'				
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

var SupportCommentSectionView = Backbone.View.extend({
	className: "support-comment-section",
	
	supportCommentCollectionView: null,
	
	events: {
	},
	
	initialize: function(){
		
	},
	
	addCommentCollection: function(collection){
		this.supportCommentCollectionView = new SupportCommentCollectionView({collection: collection});
		this.$el.find('.support-comments-container').append(this.supportCommentCollectionView.render().$el);
	},
	
	template: _.template(
			'<div class="support-comment-txt-container">' +
				'<div class="support-comment-title">All Comments</div>' +
				'<div class="support-comment-usericon">' +
					'<img src="img/user_default_icon.png">' +
				'</div>' +
				'<div class="support-comment-txt" contenteditable="true"></div>' +
				'<button id="support-comment-submit" type="button" class="btn btn-primary btn-lg">Post</button>' +
			'</div>' +
			'<div class="support-comments-container"></div>'
			),
	
	render: function(){
		this.$el.html(this.template());
		
		return this;
	},
});