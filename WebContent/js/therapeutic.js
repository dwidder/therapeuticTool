TT = {};
TT.events = _.extend({},Backbone.Events);

TT.init = $("document").ready(function init(){
	// get data here, then pass it to the controller view or save it in the TT object
	TT.controllerView = new ControllerView();
	
	$('body').append(TT.controllerView.render().$el);
});