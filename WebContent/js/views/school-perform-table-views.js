/**
 * 
 */
var SchoolPerformRowView = Backbone.View.extend({
	model: SchoolPerformModel,
	className: "school-row",
	tagName: "tr",
	
	events: {},
	
	initialize: function(){
	},
	
	template: _.template(
		'<td><%= model.className %></td>' +
		'<td><%= model.teacherName %></td>' +
		'<td><div class="primary-need-drop">' +
			'<% _.each(JSON.parse(model.primaryNeeds), function(pn) { %>' +
		    	'<div class="primary-need" data-needs-type="<%= pn %>"><%= pn %></div>' +
		    '<% }); %>' +
		    '<% if (model.hasPrimaryNeeds !== true) { %>' +
				'<div class="school-drop-zone-msg">Please drop primary needs here!</div>' +
		    '<% }; %>' +
		'</div></td>' +
		'<td><div class="accomandation-drop">' +
			'<% _.each(JSON.parse(model.schoolAccoms), function(pn) { %>' +
		    	'<div class="accomandation" data-needs-type="<%= pn %>"><%= pn %></div>' +
		    '<% }); %>' +
		    '<% if (model.hasSchoolAccoms !== true) { %>' +
				'<div class="school-drop-zone-msg">Please drop primary needs here!</div>' +
		    '<% }; %>' +
		'</div></td>' +
		'<td><div class="skill-training-drop">' +
			'<% _.each(JSON.parse(model.studyTranings), function(pn) { %>' +
		    	'<div class="skill-training" data-needs-type="<%= pn %>"><%= pn %></div>' +
		    '<% }); %>' +
		    '<% if (model.hasStudyTranings !== true) { %>' +
				'<div class="school-drop-zone-msg">Please drop primary needs here!</div>' +
		    '<% }; %>' +
		'</div></td>'
	),
	
	primaryNeedOver: function(droppedType, droppableDom){
		// check whether the drop message is there; if so, hide it
		if (this.$el.find(droppableDom).find('.school-drop-zone-msg').length !== 0){
			this.$el.find(droppableDom).find('.school-drop-zone-msg').hide();
		}
		
		// check whether the needs-type is already added
		if (this.$el.find('.primary-need[data-needs-type="' + droppedType + '"]').length == 0){
			this.$el.find('.primary-need-drop').append('<div class="primary-need" data-needs-type="temp">'+droppedType+'</div>');			
		}
	},
	
	accommodationOver: function(droppedType, droppableDom){
		// check whether the drop message is there; if so, hide it
		if (this.$el.find(droppableDom).find('.school-drop-zone-msg').length !== 0){
			this.$el.find(droppableDom).find('.school-drop-zone-msg').hide();
		}
		
		// check whether the needs-type is already added
		if (this.$el.find('.accomandation[data-needs-type="' + droppedType + '"]').length == 0){
			this.$el.find('.accomandation-drop').append('<div class="accomandation" data-needs-type="temp">'+droppedType+'</div>');			
		}
	},
	
	skillTrainingOver: function(droppedType, droppableDom){
		// check whether the drop message is there; if so, hide it
		if (this.$el.find(droppableDom).find('.school-drop-zone-msg').length !== 0){
			this.$el.find(droppableDom).find('.school-drop-zone-msg').hide();
		}
		
		// check whether the needs-type is already added
		if (this.$el.find('.skill-training[data-needs-type="' + droppedType + '"]').length == 0){
			this.$el.find('.skill-training-drop').append('<div class="skill-training" data-needs-type="temp">'+droppedType+'</div>');			
		}
	},
	
	primaryNeedDragout: function(droppedType, droppableDom){
		// check whether the drop message is there; if so, show it
		if (this.$el.find(droppableDom).find('.school-drop-zone-msg').length !== 0){
			this.$el.find(droppableDom).find('.school-drop-zone-msg').show();
		}
		
		this.$el.find('.primary-need[data-needs-type="temp"]').remove();
	},
	
	accommodationDragout: function(droppedType, droppableDom){
		// check whether the drop message is there; if so, show it
		if (this.$el.find(droppableDom).find('.school-drop-zone-msg').length !== 0){
			this.$el.find(droppableDom).find('.school-drop-zone-msg').show();
		}
		
		this.$el.find('.accomandation[data-needs-type="temp"]').remove();
	},
	
	skillTrainingDragout: function(droppedType, droppableDom){
		// check whether the drop message is there; if so, show it
		if (this.$el.find(droppableDom).find('.school-drop-zone-msg').length !== 0){
			this.$el.find(droppableDom).find('.school-drop-zone-msg').show();
		}
		
		this.$el.find('.skill-training[data-needs-type="temp"]').remove();
	},
	
	primaryNeedDropped: function(droppedType){
		if (this.model.addNeedType(droppedType)){
			this.render();
		}
	},
	
	accomandationDropped: function(droppedType){
		if (this.model.addAccomType(droppedType)){
			this.render();
		}
	},
	
	skillsTrainingDropped: function(droppedType){
		if (this.model.addSkillsType(droppedType)){
			this.render();
		}
	},

	removePrimaryNeed: function(droppedType){
		this.model.removeNeedType(droppedType);
		this.render();
	},
	
	removeAccommodation: function(droppedType){
		this.model.removeAccommodation(droppedType);
		this.render();
	},
	
	removeSkillsTraining: function(droppedType){
		this.model.removeStudyTranings(droppedType);
		this.render();
	},
			
	render: function(){
		this.$el.html(this.template({model: this.model.toJSON()}));
		
		var that = this;
		
		this.$el.find('.primary-need').draggable({
		    revert: function(valid){
		    	if (valid){
		    		return true;
		    	}else{
		    		that.removePrimaryNeed(this.data('needsType'));
		    		this.remove();
		    		return false;
		    	}
		    },
		});
		
		this.$el.find('.accomandation').draggable({
		    revert: function(valid){
		    	if (valid){
		    		return true;
		    	}else{
		    		that.removeAccommodation(this.data('needsType'));
		    		this.remove();
		    		return false;
		    	}
		    },
		});
		
		this.$el.find('.skill-training').draggable({
		    revert: function(valid){
		    	if (valid){
		    		return true;
		    	}else{
		    		that.removeSkillsTraining(this.data('needsType'));
		    		this.remove();
		    		return false;
		    	}
		    },
		});
		
		this.$el.find('.primary-need-drop').droppable({
			accept: function(el){
				var $temp = $('.primary-need-container .primary-need-draggable.ui-draggable');
				return $temp.add($(this).children()).is(el);
			},
			hoverClass: function(el){
				var $temp = $('.primary-need-container .primary-need-draggable.ui-draggable');
				return $temp.add($(this).children());
			},
			tolerance: "intersect",
			drop: function( event, ui ) {
				that.primaryNeedDropped(ui.draggable.data('needsType'));
			},
			over: function( event, ui ) {
				that.primaryNeedOver(ui.draggable.data('needsType'), this);
			},
			out: function( event, ui ) {
				that.primaryNeedDragout(ui.draggable.data('needsType'), this);
			},
		});
		
		this.$el.find('.accomandation-drop').droppable({
			accept: function(el){
				var $temp = $('.accomandation-container .accomandation-draggable.ui-draggable');
				return $temp.add($(this).children()).is(el);
			},
			hoverClass: function(el){
				var $temp = $('.accomandation-container .accomandation-draggable.ui-draggable');
				return $temp.add($(this).children());
			},
			tolerance: "intersect",
			drop: function( event, ui ) {
				that.accomandationDropped(ui.draggable.data('needsType'));
			},
			over: function( event, ui ) {
				that.accommodationOver(ui.draggable.data('needsType'), this);
			},
			out: function( event, ui ) {
				that.accommodationDragout(ui.draggable.data('needsType'), this);
			},
		});
		
		this.$el.find('.skill-training-drop').droppable({
			accept: function(el){
				var $temp = $('.skill-training-container .skill-training-draggable.ui-draggable');
				return $temp.add($(this).children()).is(el);
			},
			hoverClass: function(el){
				var $temp = $('.skill-training-container .skill-training-draggable.ui-draggable');
				return $temp.add($(this).children());
			},
			tolerance: "intersect",
			drop: function( event, ui ) {
				that.skillsTrainingDropped(ui.draggable.data('needsType'));
			},
			over: function( event, ui ) {
				that.skillTrainingOver(ui.draggable.data('needsType'), this);
			},
			out: function( event, ui ) {
				that.skillTrainingDragout(ui.draggable.data('needsType'), this);
			},
		});
		
		return this;
	}
	
});

var SchoolPerformTableView = Backbone.View.extend({
	collection: SchoolPerformCollection,
	
	className: "school-table-container",
	tagName: "div",
	
	events: {
	},
	
	initialize: function(options){
		TT.events.bind("improvement-drag-start", this.itemDragStart, this);
		TT.events.bind("improvement-drag-end", this.itemDragEnd, this);
	},
	
	// make the other columns less visible
	itemDragStart: function(dom){
		var category = $(dom).data('needs-category');
		if (category === "primary-need"){
			this.$el.find('th:not(:nth-child(3)), td:not(:nth-child(3))').fadeTo("fast", .5);
		}else if (category === "accomandations"){
			this.$el.find('th:not(:nth-child(4)), th:nth-child(4) div:not(.accom-split-header), td:not(:nth-child(4))').fadeTo("fast", .5);
		}else{
			this.$el.find('th:not(:nth-child(4)), th:nth-child(4) div:not(.study-split-header), td:not(:nth-child(5))').fadeTo("fast", .5);
		}
	},

	// make all columns with full visibility
	itemDragEnd: function(){
		this.$el.find('*').fadeTo("slow", 1);
	},
	
	template: _.template(
			'<table class="school-table"><tbody>' +
				'<tr>' +
					'<th>Classes</th><th>Teacher</th><th>Primary Needs</th>' +
					'<th colspan="2">' +
						'<div style="width:100%; text-align: center;">Plan</div>' +
						'<div class="accom-split-header split-header-div">School Accommodation</div>' +
						'<div class="study-split-header split-header-div">Study Skills and Training</div>' +
					'</th>' +
				'</tr>' +
			'</tbody></table>'),

	addOne: function(m){
		var sprv = new SchoolPerformRowView({model: m});
		this.$el.find('tbody').append(sprv.render().$el);
	},
			
	render: function(){
		this.$el.html(this.template());
		
		//add all the support item
		this.collection.forEach(this.addOne, this);
		
		return this;
	}
	
});