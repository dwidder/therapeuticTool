var SchoolPerformView = Backbone.View.extend({
	model: SchoolPerformModel,
	className: "school-container",
	schoolPerformTableView: null,
	primaryDropView: null,
	accomDropView: null,
	studyDropView: null,
	
	events: {},
	
	initialize: function(){
		this.schoolPerformTableView = new SchoolPerformTableView({collection: new SchoolPerformCollection([{primaryNeeds: JSON.stringify(['need1']), schoolAccoms: JSON.stringify(['need1']), studyTranings: JSON.stringify(['need1']), className: "PE", teacherName: "Wu Laoshi", },{className: "AP Cal", teacherName: "Chao Laoshi", comment: "comment2"}])});
		this.primaryDropView = new TableDragItemView({ type: "primary_need", });
		this.accomDropView = new TableDragItemView({ type: "accomandation", });
		this.studyDropView = new TableDragItemView({ type: "study_skills", });
	},
	
	template: _.template(''),
			
	render: function(){
		this.$el.html(this.template());

		this.$el.append(this.schoolPerformTableView.render().$el);
		this.$el.append(this.primaryDropView.render().$el);
		this.$el.append(this.accomDropView.render().$el);
		this.$el.append(this.studyDropView.render().$el);
		return this;
	}
	
});