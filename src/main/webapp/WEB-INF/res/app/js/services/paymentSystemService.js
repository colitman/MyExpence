"use strict";

(function(aScope, undefined){
	
	
	
	var paymentSystemService = {
		
		getPaymentSystems: function() {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/paymentSystems',
				method  : 'GET',
				dataType: 'json'
			});
		}
	}
	
	aScope.paymentSystemService = paymentSystemService;
	
})($EX);
