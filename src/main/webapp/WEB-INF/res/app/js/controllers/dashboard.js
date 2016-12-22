"use strict";

(function(aScope, undefined) {
	var model = aScope.dashboardModel;
	var view = aScope.dashboardView;
	
	model.subscribe(view);
	aScope.primaryModel = model;
	model.updateData();
	
	/* Event listeners */
	
	
})($EX);
