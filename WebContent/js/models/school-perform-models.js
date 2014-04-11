var SchoolPerformModel = Backbone.Model.extend({
	defaults: function() {
		return {
			className: "",
			teacherName: "",
			primaryNeeds: "[]",
			comment: "",
			hasPrimaryNeeds: false,
		};
	},
	
	initialize: function(){
		if (JSON.parse(this.get('primaryNeeds')).length != 0){
			this.set('hasPrimaryNeeds', true);
		}
	},
	
	addNeedType: function(type){
		var needsArray = JSON.parse(this.get('primaryNeeds'));
		// check whether the type already exists
		if (needsArray.indexOf(type) == -1){
			this.set('hasPrimaryNeeds', true);
			needsArray.push(type);
			this.set('primaryNeeds', JSON.stringify(needsArray));
			
			return true;
		}else{
			return false;
		}		
	},
	
	removeNeedType: function(type){
		var needsArray = JSON.parse(this.get('primaryNeeds'));
		var typeIndex = needsArray.indexOf(type);
		
		// check whether the type already exists
		if (typeIndex !== -1){
			needsArray.splice(typeIndex, 1);
			this.set('primaryNeeds', JSON.stringify(needsArray));
			
			if (needsArray.length == 0){
				this.set('hasPrimaryNeeds', false);				
			}
			return true;
		}else{
			return false;
		}
	}
});

var SchoolPerformCollection = Backbone.Collection.extend({
	model: SchoolPerformModel,
});