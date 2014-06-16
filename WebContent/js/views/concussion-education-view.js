var ConcussionEducationView = Backbone.View.extend({
	
	className: "concussion-container",

	concussionListView: null,
	
	events: {},
	
	initialize: function(){
		this.concussionListView = new ConcussionItemCollectionView({collection: new SupportModelCollection(
				[{name: "WHAT IS A CONCUSSION?", contentURL: "handouts/handout1.htm",}, {name: "What is the ImPACT test?", contentURL: "handouts/handout2.htm",}, {name: "WHAT IS A CONCUSSION?", contentURL: "handouts/handout1.htm",}, {name: "What is the ImPACT test?", contentURL: "handouts/handout2.htm",}, ])});
		TT.events.bind("showDocument", this.switchDocument, this);
	},
	
	template: _.template('<div id="concusion-menu-container"></div><div id="concussion-content-container"></div>'),
	
	switchDocument: function(concussModel){
		console.log('switch doc');
		this.$el.find('#concussion-content-container').load(concussModel.get('contentURL'));
	},
	
	render: function(){
		this.$el.html(this.template());
		this.$el.find('#concusion-menu-container').append(this.concussionListView.render().$el);
		return this;
	}
	
});

var ConcussionItemView = Backbone.View.extend({
	model: ConcussionModel,
	className: "concuss-menu-item",
	
	events: {
		"click": "showDocument",
	},
	
	initialize: function(){
		
	},
	
	template: _.template(
			'<div class="concussItemInfo">' +
				'<div class="concussItemTitle"><%= name %></div>' +
			'</div>'
			),
	
	showDocument: function(){
		TT.events.trigger("showDocument", this.model);
	},
			
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	}
	
});

var ConcussionItemCollectionView = Backbone.View.extend({
	
	collection: ConcussionModelCollection,
	className: "concuss-menu",
	
	initialize: function() {
	},
	
	template: _.template(''),
			
	render: function(){
		this.$el.html(this.template(this.options));
		
		//add all the support item
		this.collection.forEach(this.addOne, this);		
		
		return this;
	},
	
	addOne: function(m){
		var siv = new ConcussionItemView({model: m});
		this.$el.append(siv.render().$el);
	},
	
});