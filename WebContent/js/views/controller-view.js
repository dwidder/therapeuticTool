var ControllerView = Backbone.View.extend({
	className: "mainContainer",
	
	currentContentView: null,
	$currentMainHeader: null,
	
	educationSupportView: null,
	symptomRecoveryView: null,
	schoolPerformView: null,
	concussionEducationView: null,
	
	
	events: {
		/* main header buttons */
		/*"click #headerSupportBtn": "setSupportSubGroup",
		"click #headerRecoveryBtn": "setRecoverySubGroup",*/
		"click #headerSkillsBtn" : function(event){ this.setSkillsSubGroup(); this.setSchoolContent(); },
		/* sub header buttons */
		"click #headerVideoStoryBtn": "setVidSupContent",
		"click #headerConcussBtn" : "setConcussionContent",
		"click #headerSymptomBtn": "setSymMangeContent",
		"click #headerVideoBlogBtn" : "",
	},
	
	initialize: function(){
		
	},
	
	template: _.template(
			'<div id="headerContainer">' +
				'<div class="headerIconContainer"></div>' +
				'<div id="headersContainer">' +
					'<div class="headerButtonContainer headerButtonMain">' +
						'<div class="headerBtn mainheaderBtn" id="headerSupportBtn" data-header-group="#headerSupportSubGroup">Education and Support</div>' +
						'<div class="headerBtn mainheaderBtn" id="headerRecoveryBtn" data-header-group="#headerRecoverySubGroup">Recovering Monitoring</div>' +
						'<div class="headerBtn mainheaderBtn" id="headerSkillsBtn" data-header-group="#headerSkillsSubGroup">Improvements</div>' +
					'</div>' +
	
					// There are 3 sets of sub header buttons to swap between
					'<div class="headerButtonContainer headerButtonSub">' +
						// the set for support
						'<div id="headerSupportSubGroup" class="ButtonSubGroup">' +
							'<div class="headerBtn subheaderBtn" id="headerVideoStoryBtn">Video Stories</div>' +
							'<div class="headerBtn subheaderBtn" id="headerConcussBtn">Concussion Education</div>' +
						'</div>' +
						
						// the set for recovery
						'<div id="headerRecoverySubGroup" class="ButtonSubGroup">' +
							'<div class="headerBtn subheaderBtn" id="headerSymptomBtn">Symptom Management</div>' +
							'<div class="headerBtn subheaderBtn" id="headerVideoBlogBtn">Video Journaling</div>' +
						'</div>' +
						
						// the set for skills
						'<div id="headerSkillsSubGroup" class="ButtonSubGroup">' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="contentContainer">' +
			'</div>'
			),
	
	setHeaderBtnActive: function(id){
		this.$el.find('.mainheaderBtn.active').removeClass('active');
		
		// show the header button only if there is one active
		if (id != null){
			this.$el.find(id).addClass('active');			
		}
	},

	/* functions to switch the sub header groups */
	setSubHeaderGroup: function(group){
		this.$el.find('.ButtonSubGroup').hide();
		
		// show the sub header only if there is one active
		if (group != null){
			this.$el.find(group).css('display', 'inline-block');			
		}
	},
	
	setSupportSubGroup: function(){
		this.setHeaderBtnActive('#headerSupportBtn');
		this.setSubHeaderGroup('#headerSupportSubGroup');
	},
	
	setRecoverySubGroup: function(){
		this.setHeaderBtnActive('#headerRecoveryBtn');
		this.setSubHeaderGroup('#headerRecoverySubGroup');
	},
	
	setSkillsSubGroup: function(){
		this.setHeaderBtnActive('#headerSkillsBtn');
		this.setSubHeaderGroup('#headerSkillsSubGroup');
	},

	/* functions to set sub group buttons active */
	setSubBtnActive: function(id){
		this.$el.find('.subheaderBtn.active').removeClass('active');
		// show the header button only if there is one active
		if (id != null){
			this.$el.find(id).addClass('active');		
		}
	},
	
	setContent: function(content){
		if (this.currentContentView != null){
			this.currentContentView.remove();
		}
		
		if (content === 'video-support'){
			
			this.educationSupportView = new EducationSupportView({model: new ComponentModel({name: "Education and Support"})});
			var $content = $(this.$el.find("#contentContainer"));
			$content.append(this.educationSupportView.render().$el);
			
			this.currentContentView = this.educationSupportView;
		}else if (content === 'concuss-support'){
			
			this.concussionEducationView = new ConcussionEducationView({model: new ComponentModel({name: "Education and Support"})});
			var $content = $(this.$el.find("#contentContainer"));
			$content.append(this.concussionEducationView.render().$el);
			
			this.currentContentView = this.concussionEducationView;
		}else if (content === 'symptom-manage'){
			
			this.symptomRecoveryView = new SymptomRecoveryView({model: new ComponentModel({name: "Symptom and Recovery"})});
			var $content = $(this.$el.find("#contentContainer"));
			$content.append(this.symptomRecoveryView.render().$el);
			this.symptomRecoveryView.showChart();
			
			this.currentContentView = this.symptomRecoveryView;
		}else if (content === 'school'){
			
			this.schoolPerformView = new SchoolPerformView({model: new ComponentModel({name: "School Performance"})});
			var $content = $(this.$el.find("#contentContainer"));
			$content.append(this.schoolPerformView.render().$el);
			
			this.currentContentView = this.schoolPerformView;
		}
	},
	
	setVidSupContent: function(){
		this.setSubBtnActive('#headerVideoStoryBtn');
		this.setContent('video-support');
		this.$currentMainHeader = this.$el.find('#headerSupportBtn');
	},
	
	setConcussionContent: function(){
		this.setSubBtnActive('#headerConcussBtn');
		this.setContent('concuss-support');
		this.$currentMainHeader = this.$el.find('#headerSupportBtn');
	},
	
	setSymMangeContent: function(){
		this.setSubBtnActive('#headerSymptomBtn');
		this.setContent('symptom-manage');
		this.$currentMainHeader = this.$el.find('#headerRecoveryBtn');
	},
	
	setSchoolContent: function(){
		this.setSubBtnActive(null);
		this.setContent('school');
		this.$currentMainHeader = this.$el.find('#headerSkillsBtn');
	},
	
	render: function(){
		this.$el.html(this.template());		
		
		// set the hover event for the main header
		var that = this;
		this.$el.find('.mainheaderBtn').hover(function(event){
			// mouse in
			if (event.type=="mouseenter"){
				that.setSubHeaderGroup($(this).data('header-group'));
				that.setHeaderBtnActive('#'+this.id);
			}
		});
		
		// set the sub header to reset when mouse out of the headers
		this.$el.find('#headersContainer').hover(function(event){
			// mouse out
			if (event.type=="mouseleave"){
				if (that.$currentMainHeader == null){
					that.setSubHeaderGroup(null);
					that.setHeaderBtnActive(null);
					return;
				}
				that.setSubHeaderGroup(that.$currentMainHeader.data('header-group'));
				that.setHeaderBtnActive('#'+that.$currentMainHeader.attr('id'));
			}
		});
		
		return this;
	},	
});