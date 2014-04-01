var SymptomRecoveryView = Backbone.View.extend({
	className: "recovery-container",
	
	chartViews: [],
	charTableViews: [],
	
	events: {
		
	},
	
	initialize: function(){
		this.chartViews = [];
		this.charTableViews = [];
		
		// For study
		var chartCollection = new RevSeriesCollection([{date: new Date('Novermber 2013'), activity: "none", score: 0,},{date: new Date('January 2014'), activity: "Physical Ed", score: 1,},{date: new Date('January 2014'), activity: "3 Core Classes", score: 3,},{date: new Date('February 2014'), activity: "3 Core Classes", score: 3,},{date: new Date('February 2014'), activity: "2 Independent Studies", score: 2,},{date: new Date('March 2014'), activity: "3 Core Classes", score: 3,}
			,{date: new Date('March 2014'), activity: "2 Independent Studies", score: 2,},{date: new Date('April 2014'), activity: "Calculus", score: 1,},{date: new Date('April 2014'), activity: "Psych/AP Econ/Lit/Global study", score: 4,}]);
		this.chartViews.push(new ChartView({collection:chartCollection, activity: 'Study'}));
//		this.charTableViews.push(new ChartTableView({collection: chartCollection}));

		// For excercise
		chartCollection = new RevSeriesCollection([{date: new Date('Novermber 2013'), activity: "none", score: 0,},{date: new Date('January 2014'), activity: "Aerobics", score: 1,},{date: new Date('January 2014'), activity: "Batting Practice", score: 1,},{date: new Date('February 2014'), activity: "Aerobics", score: 2,},{date: new Date('February 2014'), activity: "Batting Practice", score: 2,},{date: new Date('March 2014'), activity: "Aerobics", score: 3,},{date: new Date('March 2014'), activity: "Batting Practice", score: 3,}
			,{date: new Date('April 2014'), activity: "Aerobics", score: 4,},{date: new Date('April 2014'), activity: "Softball practice", score: 5,}]);
		this.chartViews.push(new ChartView({collection:chartCollection, activity: 'Exercise'}));
//		this.charTableViews.push(new ChartTableView({collection: chartCollection}));
	},
	
	template: _.template(
			''
			),
	
	showChart: function(){
		for (var i = 0; i < this.chartViews.length; i++){
			this.chartViews[i].showChart();	
		}
	},
			
	render: function(){
		this.$el.html(this.template());
		
		for (var i = 0; i < this.chartViews.length; i++){
			this.$el.append(this.chartViews[i].render().$el);
			
//			this.$el.append(this.charTableViews[i].render().$el);
		}
		
		return this;
	}
	
});