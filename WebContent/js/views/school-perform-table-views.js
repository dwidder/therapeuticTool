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
		'</td>' +
		'<td><%= model.comment %></td>'
	),
	
	primaryNeedOver: function(droppedType){
		// check whether the needs-type is already added
		if (this.$el.find('.primary-need[data-needs-type="' + droppedType + '"]').length == 0){
			this.$el.find('.primary-need-drop').append('<div class="primary-need" data-needs-type="temp">'+droppedType+'</div>');			
		}
	},
	
	primaryNeedDragout: function(droppedType){
		this.$el.find('.primary-need[data-needs-type="temp"]').remove();
	},
	
	primaryNeedDropped: function(droppedType){
		if (this.model.addNeedType(droppedType)){
			this.render();
		}
	},
	
	removePrimaryNeed: function(droppedType){
		this.model.removeNeedType(droppedType);
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
				// check whether this is a primary-need added to a row view,
				// if so check whether its within this view
//				if (ui.draggable.hasClass('primary-need')){
//					if ($(this).find(ui.draggable).length != 0)
//						that.primaryNeedDropped(ui.draggable.data('needsType'));
//				}else{
					that.primaryNeedDropped(ui.draggable.data('needsType'));				
//				}
			},
			over: function( event, ui ) {
				// check whether this is a primary-need added to a row view,
				// if so check whether its within this view
//				if (ui.draggable.hasClass('primary-need')){
//					if ($(this).find(ui.draggable).length != 0)
//						that.primaryNeedOver(ui.draggable.data('needsType'));
//				}else{
					that.primaryNeedOver(ui.draggable.data('needsType'));					
//				}
			},
			out: function( event, ui ) {
				that.primaryNeedDragout(ui.draggable.data('needsType'));
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
	},
	
	template: _.template(
			'<table class="school-table"><tbody>' +
				'<tr><th>Classes</th><th>Teacher</th><th>Primary Needs</th><th>Comments</th></tr>' +
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