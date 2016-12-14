"use strict";

(function(aScope, undefined){
	
	
	
	var expenseService = {
		
		createExpense: function(expenseData) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/expenses',
				method  : 'POST',
				data    : expenseData
			});
		}
	}
	
	aScope.expenseService = expenseService;
	
})($EX);
