"use strict";

(function(aScope, undefined){
	
	
	
	var transactionService = {
		
		getTransactions: function(
			sender,
			recipient,
			type,
			category,
			startDate,
			endDate,
			useOrForSenderAndRecipient
		) {
			
			var paramsString = '';
			
			if(sender != null) {
				paramsString += 'sender=' + sender + '&';
			}
			
			if(recipient != null) {
				paramsString += 'recipient=' + recipient + '&';
			}
			
			if(type != null) {
				paramsString += 'type=' + type + '&';
			}
			
			if(category != null) {
				paramsString += 'category=' + category + '&';
			}
			
			if(startDate != null) {
				paramsString += 'startDate=' + startDate + '&';
			}
			
			if(endDate != null) {
				paramsString += 'endDate=' + endDate + '&';
			}
			
			if(useOrForSenderAndRecipient == null) {
				useOrForSenderAndRecipient = false;
			}
			
			paramsString += 'useOr=' + useOrForSenderAndRecipient + '&user=' + $('meta[name="principal"]').attr('content');
			
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/transactions' + '?' + paramsString,
				method  : 'GET',
				dataType: 'json'
			});
		}
	}
	
	aScope.transactionService = transactionService;
	
})($EX);
