var SchoolPerformModel = Backbone.Model.extend({
	defaults: function() {
		return {
			className: "",
			teacherName: "",
			primaryNeeds: "[]",
			schoolAccoms: "[]",
			studyTranings: "[]",
			comment: "",
			hasPrimaryNeeds: false,
			hasSchoolAccoms: false,
			hasStudyTranings: false,
		};
	},
	
	initialize: function(){
		if (JSON.parse(this.get('primaryNeeds')).length != 0){
			this.set('hasPrimaryNeeds', true);
		}
		if (JSON.parse(this.get('schoolAccoms')).length != 0){
			this.set('hasSchoolAccoms', true);
		}
		if (JSON.parse(this.get('studyTranings')).length != 0){
			this.set('hasStudyTranings', true);
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
	
	addAccomType: function(type){
		var needsArray = JSON.parse(this.get('schoolAccoms'));
		// check whether the type already exists
		if (needsArray.indexOf(type) == -1){
			this.set('hasSchoolAccoms', true);
			needsArray.push(type);
			this.set('schoolAccoms', JSON.stringify(needsArray));
			
			return true;
		}else{
			return false;
		}		
	},
	
	addSkillsType: function(type){
		var needsArray = JSON.parse(this.get('studyTranings'));
		// check whether the type already exists
		if (needsArray.indexOf(type) == -1){
			this.set('hasStudyTranings', true);
			needsArray.push(type);
			this.set('studyTranings', JSON.stringify(needsArray));
			
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
	},
	
	removeAccommodation: function(type){
		var needsArray = JSON.parse(this.get('schoolAccoms'));
		var typeIndex = needsArray.indexOf(type);
		
		// check whether the type already exists
		if (typeIndex !== -1){
			needsArray.splice(typeIndex, 1);
			this.set('schoolAccoms', JSON.stringify(needsArray));
			
			if (needsArray.length == 0){
				this.set('hasSchoolAccoms', false);				
			}
			return true;
		}else{
			return false;
		}
	},
	
	removeStudyTranings: function(type){
		var needsArray = JSON.parse(this.get('studyTranings'));
		var typeIndex = needsArray.indexOf(type);
		
		// check whether the type already exists
		if (typeIndex !== -1){
			needsArray.splice(typeIndex, 1);
			this.set('studyTranings', JSON.stringify(needsArray));
			
			if (needsArray.length == 0){
				this.set('hasStudyTranings', false);				
			}
			return true;
		}else{
			return false;
		}
	},
});

var SchoolPerformCollection = Backbone.Collection.extend({
	model: SchoolPerformModel,
});