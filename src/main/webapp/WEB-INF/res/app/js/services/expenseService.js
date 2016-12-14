"use strict";

(function(aScope, undefined){
	
	
	
	var expenseService = {
		
		createExpense: function(expenseData) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/expenses',
				method  : 'POST',
				data    : expenseData,
				dataType: 'json'
			});
		}
	}
	
	aScope.expenseService = expenseService;
	
})($EX);
