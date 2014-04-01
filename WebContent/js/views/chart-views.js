var ChartView = Backbone.View.extend({
	collection: RevSeriesCollection,
	className: "recovery-chart",
	
	events: {
	},
	
	initialize: function(options){
		this.title = options.activity;
	},
	
	template: _.template(''),
	
	showChart: function(){
		this.$el.dxChart({
		    title: {
		        text: this.title
		    },
		    dataSource: this.collection.toChartJSFormat(),
		    series: this.collection.getSeries(),

		    tooltip: {
		        enabled: true,
		        customizeText: function(){
		            return this.seriesName + ": " + this.value;
		        }
		    },
		    commonSeriesSettings: {
		        argumentField: 'date',
		        type: 'stackedbar',
		    },
		    valueAxis: {
		        title: 'Score',
		    },
            argumentAxis: {
                title: 'Date',
            },
		});
	},
			
	render: function(){
		this.$el.html(this.template());
		
		return this;
	}
	
});

var ChartEntryView = Backbone.View.extend({
	model: RevSeriesModel,
	className: "chart-entry",
	
	events: {},
	
	initialize: function(){
		
	},
	
	template: _.template(
		'<div class="chartEntryActivity"><%= activity %></div>' +
		'<div class="chartEntryScore"><%= score %></div>'
	),
			
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	}
	
});

var ChartColumnView = Backbone.View.extend({
	collection: RevSeriesCollection,
	
	tagName: 'td',
	className: "recovery-column",
	
	events: {
	},
	
	initialize: function(options){
		this.date = options.dateStr;
	},
	
	template: _.template(''),

	addOne: function(m){
		var cev = new ChartEntryView({model: m});
		this.$el.append(cev.render().$el);
	},
			
	render: function(){
		this.$el.html(this.template());
		
		//add all the support item
		this.collection.forEach(this.addOne, this);
		
		return this;
	}
	
});

var ChartTableView = Backbone.View.extend({
	collection: RevSeriesCollection,
	
	className: "recovery-table-container",
	
	events: {
	},
	
	initialize: function(){
		var entryByDate = this.collection.seperateByDate();
		
		this.columnViews = [];
		
		var that = this;
		
		entryByDate.forEach(function(entry){
			var ccv = new ChartColumnView({collection: new RevSeriesCollection(entry.activity), dateStr: (entry.date.getMonth()+1) + " - " + (entry.date.getYear()+1900)});
			that.columnViews.push(ccv);
		});
	},
	
	template: _.template('<table><tbody></tbody></table>'),
			
	render: function(){
		this.$el.html(this.template());
		
		var $tbody = this.$el.find('tbody');
		
		$tbody.append('<tr class="chartTableDateRow"></tr>');
		var $tr = this.$el.find('tbody').find('.chartTableDateRow');
		
		this.columnViews.forEach(function(cv){
			$tr.append('<th><div class="charColDate">' + cv.date + '</div></th>');
		});
		
		$tbody.append('<tr class="chartTableData"></tr>');
		$tr = this.$el.find('tbody').find('.chartTableData');
		this.columnViews.forEach(function(cv){
			$tr.append(cv.render().$el);
		});
		
		return this;
	}
	
});
