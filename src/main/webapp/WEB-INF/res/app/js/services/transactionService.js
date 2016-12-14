"use strict";

(function(aScope, undefined){
	
	
	
	var transactionService = {
		
		getTransactions: function(
			sender,
			recipient,
			category,
			startDate,
			endDate
		) {
			
			var paramsString = '';
			
			if(sender != null) {
				paramsString += 'sender=' + sender + '&'
			}
			if(recipient != null) {
				paramsString += 'recipient=' + recipient + '&'
			}
			
			if(category != null) {
				paramsString += 'category=' + category + '&'
			}
			
			if(startDate != null) {
				paramsString += 'startDate=' + startDate + '&'
			}
			
			if(endDate != null) {
				paramsString += 'endDate=' + endDate + '&'
			}
			
			paramsString += 'user=' + $('meta[name="principal"]').attr('content');
			
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/transactions' + '?' + paramsString,
				method  : 'GET',
				dataType: 'json'
			});
		}
	}
	
	aScope.transactionService = transactionService;
	
})($EX);
