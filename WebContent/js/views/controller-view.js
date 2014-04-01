var ControllerView = Backbone.View.extend({
	className: "mainContainer",
	
	currentContentView: null,
	
	educationSupportView: null,
	symptomRecoveryView: null,
	
	
	events: {
		"click #headerSupportBtn": "setSupportContent",
		"click #headerRecoveryBtn": "setRecoveryContent",
		
	},
	
	initialize: function(){
		
	},
	
	template: _.template(
			'<div id="headerContainer">' +
				'<div class="headerIconContainer"></div>' +
				'<div class="headerButtonContainer">' +
					'<div class="headerBtn" id="headerSupportBtn">Education and Support</div>' +
					'<div class="headerBtn" id="headerRecoveryBtn">Symptom and Recovery</div>' +
					'<div class="headerBtn" id="headerSkillsBtn">Study Skills</div>' +
				'</div>' +
			'</div>' +
			'<div id="contentContainer">' +
			'</div>'
			),
	
	setHeaderBtnActive: function(id){
		$(id).addClass('active');
	},
			
	removeHeaderBtnActive: function(){
		$('.headerBtn.active').removeClass('active');
	},
			
	setContent: function(content){
		this.removeHeaderBtnActive();
		if (this.currentContentView != null){
			this.currentContentView.remove();
		}
		
		if (content === 'support'){
			this.setHeaderBtnActive('#headerSupportBtn');
			
			this.educationSupportView = new EducationSupportView(new ComponentModel({name: "Education and Support"}));
			var $content = $(this.$el.find("#contentContainer"));
			$content.append(this.educationSupportView.render().$el);
			
			this.currentContentView = this.educationSupportView;
		}else if (content === 'recovery'){
			this.setHeaderBtnActive('#headerRecoveryBtn');
			
			this.symptomRecoveryView = new SymptomRecoveryView(new ComponentModel({name: "Symptom and Recovery"}));
			var $content = $(this.$el.find("#contentContainer"));
			$content.append(this.symptomRecoveryView.render().$el);
			this.symptomRecoveryView.showChart();
			
			this.currentContentView = this.symptomRecoveryView;
		}
	},
	
	setSupportContent: function(){
		this.setContent('support');
	},
	
	setRecoveryContent: function(){
		this.setContent('recovery');
	},
	
	render: function(){
		this.$el.html(this.template());		
		
		return this;
	}
	
});