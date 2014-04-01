var RevSeriesModel = Backbone.Model.extend({
	defaults: function() {
		return {
			date: null,
			activity: "",
			score: 0,
		};
	}
});

var RevSeriesCollection = Backbone.Collection.extend({
	model: RevSeriesModel,
	
	comparator: function(series){ 
		return series.get('date').getTime(); 
	},
	
	// get all the series names without duplicate
	getSeries: function(){
		var seriesArray = {};
		
		this.each(function(model){
			seriesArray[model.get('activity')] = model.get('activity');
		});
		
		var data = [];
		for (var i in seriesArray){
			data.push({name: i, valueField: i});
		}
		
		return data;
	},
	
	toChartJSFormat: function(){
		console.log('a');
		
		var dataSource = [];
		
		if (this.length != 0){
			var prevDate = this.at(0).get('date').getTime();
			var curSeries = {date: (this.at(0).get('date').getMonth()+1) + " - " +(this.at(0).get('date').getYear()+1900)};
			curSeries[this.at(0).get('activity')] = this.at(0).get('score');
			dataSource.push(curSeries);
			
			for (var i = 1; i < this.length; i++){
				// if the current series has the same date as the previous one, add onto the previous one
				if (this.at(i).get('date').getTime() == prevDate){
					curSeries[this.at(i).get('activity')] = this.at(i).get('score');
				
				// otherwise, create a new one
				}else{
					prevDate = this.at(i).get('date').getTime();
					curSeries = {date: (this.at(i).get('date').getMonth()+1) + " - " +(this.at(i).get('date').getYear()+1900)};
					curSeries[this.at(i).get('activity')] = this.at(i).get('score');
					dataSource.push(curSeries);
				}
			}
		}
		
		return dataSource;
	},
	
	// serperate the series by date
	seperateByDate: function(){
		var data = {};
		this.each(function(model){
			if (data[(model.get('date').getMonth()+1) + " - " +(model.get('date').getYear()+1900)] == undefined){
				data[(model.get('date').getMonth()+1) + " - " +(model.get('date').getYear()+1900)] = {};
				data[(model.get('date').getMonth()+1) + " - " +(model.get('date').getYear()+1900)]['date'] = model.get('date');
				data[(model.get('date').getMonth()+1) + " - " +(model.get('date').getYear()+1900)]['activity'] = [];
				data[(model.get('date').getMonth()+1) + " - " +(model.get('date').getYear()+1900)]['activity'].push(model);
			}else{
				data[(model.get('date').getMonth()+1) + " - " +(model.get('date').getYear()+1900)]['activity'].push(model);
			}
		});
		
		// put the attributes into an array and sort by date
		var sortedData = [];
		for (var i in data){
			sortedData.push(data[i]);
		}
		sortedData.sort(function(a, b){ return a.date - b.date });
		
		return sortedData;
	},
});

