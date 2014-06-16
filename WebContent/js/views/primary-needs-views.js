var TableDragItemView = Backbone.View.extend({
	className: "drag-item-container",
	
	events: {},
	
	initialize: function(options){
		// set the template for this view
		this.template = this[options.type + "_template"];
	},
	
	primary_need_template: _.template(
		'<div class="primary-need-container">' +
			'<h4>Primary Needs</h4>' +
			'<div class="primary-need-draggable improve-draggables" data-needs-category="primary-need" data-needs-type="homework completion">homework completion</div>' +
			'<div class="primary-need-draggable improve-draggables" data-needs-category="primary-need" data-needs-type="can\'t remember what I read">can\'t remember what I read</div>' +
			'<div class="primary-need-draggable improve-draggables" data-needs-category="primary-need" data-needs-type="can\'t remember lecture">can\'t remember lecture</div>' +
			'<div class="primary-need-draggable improve-draggables" data-needs-category="primary-need" data-needs-type="don\'t make it to class">don\'t make it to class</div>' +
			'<div class="primary-need-draggable improve-draggables" data-needs-category="primary-need" data-needs-type="don\'t understand content">don\'t understand content</div>' +
			'<div class="primary-need-draggable improve-draggables" data-needs-category="primary-need" data-needs-type="other">other</div>' +
		'</div>'
	),
	
	accomandation_template: _.template(
		'<div class="accomandation-container">' +
			'<h4>School Accomandations</h4>' +
			'<div class="accomandation-draggable improve-draggables" data-needs-category="accomandations" data-needs-type="extend test time">extend test time</div>' +
			'<div class="accomandation-draggable improve-draggables" data-needs-category="accomandations" data-needs-type="course modification">course modification</div>' +
			'<div class="accomandation-draggable improve-draggables" data-needs-category="accomandations" data-needs-type="homework completion">teacher notes</div>' +
			'<div class="accomandation-draggable improve-draggables" data-needs-category="accomandations" data-needs-type="peer tutors">peer tutors</div>' +
			'<div class="accomandation-draggable improve-draggables" data-needs-category="accomandations" data-needs-type="headphones">headphones</div>' +
			'<div class="accomandation-draggable improve-draggables" data-needs-category="accomandations" data-needs-type="assignment modification">assignment modification</div>' +
		'</div>'			
	),
	
	study_skills_template: _.template(
		'<div class="skill-training-container">' +
			'<h4>Study Skills and Traning</h4>' +
			'<div class="skill-training-draggable improve-draggables" data-needs-category="study-skills" data-needs-type="reading strategies">reading strategies</div>' +
			'<div class="skill-training-draggable improve-draggables" data-needs-category="study-skills" data-needs-type="homework plan">homework plan</div>' +
			'<div class="skill-training-draggable improve-draggables" data-needs-category="study-skills" data-needs-type="smartpen">smartpen</div>' +
			'<div class="skill-training-draggable improve-draggables" data-needs-category="study-skills" data-needs-type="notetaking">notetaking</div>' +
			'<div class="skill-training-draggable improve-draggables" data-needs-category="study-skills" data-needs-type="auditing comprehension">auditing comprehension</div>' +
		'</div>'
	),
			
	render: function(){
		this.$el.html(this.template());
		
		// Makes the options draggable
		this.$el.find('.improve-draggables').draggable({
			// notify the table when drag start
			start: function(event, ui){
				TT.events.trigger("improvement-drag-start", this);
			},
			helper: "clone",
			opacity: 0.90,
		    revert: function(valid){
				TT.events.trigger("improvement-drag-end");
		    	if (valid){
		    		return false;
		    	}else{
		    		return true;
		    	}
		    },
		});
		
		return this;
	}
	
});