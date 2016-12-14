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
	
	var userTransactionsModel = {
		__proto__: observable,
		
		getTransactions: function() {
			return aScope.transactionService.getTransactions();
		}
	
	};
	
	
	aScope.userTransactionsModel = userTransactionsModel;
	
})($EX);
