var EducationSupportView = Backbone.View.extend({
	className: "education-container",
	
	supportItemCollectionView: null,
	supportVideoView: null,
	supportCommentSectionView: null,
	
	events: {
		
	},
	
	initialize: function(){
		this.supportItemCollectionView = new SupportItemCollectionView({collection: new SupportModelCollection([{name: "v1", author: "Jim", date: "Some Date", videoURL: "http://www.w3schools.com/html/movie.mp4"},{name: "v2", author: "Liam", date: "Some Date", videoURL: "www.idk.com"},{name: "v3", author: "Jason", date: "Some Date", videoURL: "www.idk.com"}])});
		
		TT.events.bind("showVideo", this.switchVideo, this);
	},
	
	switchVideo: function(video){
		if (this.supportVideoView != null){
			this.supportVideoView.remove();			
		}
		
		if (this.supportCommentSectionView != null){
			this.supportCommentSectionView.remove();
		}
		
		this.supportVideoView = new SupportVideoView({model: video});
		this.$el.prepend(this.supportVideoView.render().$el);
		
		// get the comment data for this video, then create comment view with the data
		this.supportCommentSectionView = new SupportCommentCollectionView({collection: new SupportCommentModelCollection([{author:"Jim", date: "some date", comment:"lallalalaal"}, {author:"Jason", date: "some date", comment: "babababababba"}, {author:"Liam", date: "some date", comment: "ccaacacacacac"}])});
		this.$el.find('.supportCommentAndMenu').prepend(this.supportCommentSectionView.render().$el);
		
		this.supportItemCollectionView.$el.css({"margin-left": "50%", width: "50%"});
		
	},
	
	hideCommentAndVideo: function(){
		if (this.supportVideoView != null){
			this.supportVideoView.remove();			
		}
		this.supportItemCollectionView.$el.animate({"margin-left": "0%", width: "100%"});
	},
	
	template: _.template(
			'<div class="supportCommentAndMenu"></div>'
			),
	
	render: function(){
		this.$el.html(this.template());
		
		this.$el.find('.supportCommentAndMenu').append(this.supportItemCollectionView.render().$el);
		
		return this;
	}
	
});