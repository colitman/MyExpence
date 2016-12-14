"use strict";

/*
Controller - Observer
*/

function TransactionsController(model, undefined){
	
	var transactionsModel = model;
	
	var transactionsController = {
		update: function(viewEvent) {
			if(viewEvent.name === 'c.transactions.export') {
				/*var anchor = viewEvent.data.trigger;
				var table = viewEvent.data.target;
				ExcellentExport.excel(anchor, table, 'Transactions');*/
			}
		}
	};
	
	return transactionsController;
	
}
