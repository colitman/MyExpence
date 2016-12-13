"use strict";

/*
Controller - Observer
*/

function TransactionsController(model, undefined){
	
	var transactionsModel = model;
	
	var transactionsController = {
		update: function(viewEvent) {
			if(viewEvent.name === 'c.transactions.filterChanged') {
				model.setChanged();
				model.notifyObservers(model);
			}
		}
	};
	
	return transactionsController;
	
}
