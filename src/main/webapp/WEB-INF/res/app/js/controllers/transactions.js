"use strict";

(function(aScope, undefined) {
	var model = aScope.transactionsModel;
	var view = aScope.transactionsView;
	
	model.subscribe(view);
	aScope.primaryModel = model;
	model.updateData();
	
})($EX);