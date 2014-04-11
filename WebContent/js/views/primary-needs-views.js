var PrimaryNeedsView = Backbone.View.extend({
	className: "primary-need-container",
	
	events: {},
	
	initialize: function(){
		
	},
	
	template: _.template(
		'<div class="primary-need-draggable" data-needs-type="homework completion">homework completion</div>' +
		'<div class="primary-need-draggable" data-needs-type="can\'t remember what I read">can\'t remember what I read</div>' +
		'<div class="primary-need-draggable" data-needs-type="can\'t remember lecture">can\'t remember lecture</div>' +
		'<div class="primary-need-draggable" data-needs-type="don\'t make it to class">don\'t make it to class</div>' +
		'<div class="primary-need-draggable" data-needs-type="don\'t understand content">don\'t understand content</div>' +
		'<div class="primary-need-draggable" data-needs-type="other">other</div>'
	),
			
	render: function(){
		this.$el.html(this.template());
		this.$el.find('.primary-need-draggable').draggable({ helper: "clone" });
		
		return this;
	}
	
});