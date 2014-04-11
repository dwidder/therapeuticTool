var SchoolPerformView = Backbone.View.extend({
	model: SchoolPerformModel,
	className: "school-container",
	schoolPerformTableView: null,
	primaryNeedsView: null,
	
	events: {},
	
	initialize: function(){
		this.schoolPerformTableView = new SchoolPerformTableView({collection: new SchoolPerformCollection([{primaryNeeds: JSON.stringify(['need1']), className: "PE", teacherName: "Wu Laoshi", comment: "comment1"},{className: "AP Cal", teacherName: "Chao Laoshi", comment: "comment2"}])});
		this.primaryNeedsView = new PrimaryNeedsView();
	},
	
	template: _.template(''),
			
	render: function(){
		this.$el.html(this.template());

		this.$el.append(this.schoolPerformTableView.render().$el);
		this.$el.append(this.primaryNeedsView.render().$el);
		return this;
	}
	
});