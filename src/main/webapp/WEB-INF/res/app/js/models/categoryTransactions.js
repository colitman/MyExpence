"use strict";

/*
Model is an observable object.
It should expose the following public access interfaces:
- subscribe

It also should have the following private methods:
- countObservers
- isChanged
- setChanged
- clearChanged
- notifyObservers
- deleteObservers
 */

(function(aScope, undefined){
	
	var observable = new Observable();
	var categoryId = $('meta[name="target_id"]').attr('content');
	
	var categoryTransactionsModel = {
		__proto__: observable,
		
		getTransactions: function(/*filterData*/) {
			return aScope.transactionService.getTransactions(
				/*filterData.sender*/null,
				/*filterData.recipient*/null,
				categoryId,
				/*filterData.startDate*/null,
				/*filterData.endDate*/null);
		}
	
	};
	
	
	aScope.categoryTransactionsModel = categoryTransactionsModel;
	
})($EX);
