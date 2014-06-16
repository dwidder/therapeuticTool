var EducationSupportView = Backbone.View.extend({
	className: "education-container",
	
	supportListView: null,
	supportVideoView: null,
	supportCommentSectionView: null,
	
	events: {
		
	},
	
	initialize: function(){
		this.supportListView = new SupportListView().render();
		this.supportListView.addGroup({collection: new SupportModelCollection(
				[{name: "Aaron Video", author: "Aaron", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/aaron_1920x1080.mov", thumbNail: "img/aaron_1920x1080.png"}, {name: "Sylvia Video", author: "Sylvia", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/sylvia_1920x1080.mov", thumbNail: "img/sylvia_1920x1080.png"},{name: "Aaron Video", author: "Aaron", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/aaron_1920x1080.mov", thumbNail: "img/aaron_1920x1080.png"}, {name: "Sylvia Video", author: "Sylvia", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/sylvia_1920x1080.mov", thumbNail: "img/sylvia_1920x1080.png"},])}, 'Support');
		this.supportListView.addGroup({collection: new SupportModelCollection(
				[{name: "Aaron Video", author: "Aaron", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/aaron_1920x1080.mov", thumbNail: "img/aaron_1920x1080.png"}, {name: "Sylvia Video", author: "Sylvia", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/sylvia_1920x1080.mov", thumbNail: "img/sylvia_1920x1080.png"},{name: "Aaron Video", author: "Aaron", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/aaron_1920x1080.mov", thumbNail: "img/aaron_1920x1080.png"}, {name: "Sylvia Video", author: "Sylvia", desc: "Check out the epitome of awesome, the pinnacle of RD Gundams, the supreme Extreme Gundam! Thanks to my buddy, Dale, for finding me a good deal on it!", date: "Some Date", videoURL: "videos/sylvia_1920x1080.mov", thumbNail: "img/sylvia_1920x1080.png"},])}, 'Recovery');
		
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
		this.$el.find('.supportVideoAndCommentContainer').append(this.supportVideoView.render().$el);
		
		// get the comment data for this video, then create comment view with the data
		this.supportCommentSectionView = new SupportCommentSectionView().render();
		this.supportCommentSectionView.addCommentCollection(new SupportCommentModelCollection(
			[{author:"Jim", date: "some date", comment:"This is a really good video"},
			 {author:"Jason", date: "some date", comment: "Play, pause, and seek in the entire video, change the volume, mute, change the playback rate (including going into negative values). See the effect on the video and on the underlying events and properties."},
			 {author:"Liam", date: "some date", comment: "This page demonstrates the new HTML5 video element, its media API, and the media events."},
			 {author:"Timmy", date: "some date", comment: "I feel the c funnel are like the things in the gundam strike freedoms wings!"},
			 {author:"Johnny", date: "some date", comment: "robbert, can the action base of this be used on the RG strike freedom? thanks more power!!"},
			 {author:"Jake", date: "some date", comment: "I wonder how much tickets are.... No useful link in description ftw.  You should know most of your fan base is too lazy to go actively search for information regarding your shows"},]
		));
		this.$el.find('.supportVideoAndCommentContainer').append(this.supportCommentSectionView.$el);
		
		this.supportListView.$el.css({"margin-left": "60%", width: "40%"});
		
	},
	
	hideCommentAndVideo: function(){
		if (this.supportVideoView != null){
			this.supportVideoView.remove();			
		}
		this.supportListView.$el.animate({"margin-left": "0%", width: "100%"});
	},
	
	template: _.template(
			'<div class="supportVideoAndCommentContainer"></div>'
			),
	
	render: function(){
		this.$el.html(this.template());
		
		this.$el.append(this.supportListView.$el);
		
		return this;
	}
	
});