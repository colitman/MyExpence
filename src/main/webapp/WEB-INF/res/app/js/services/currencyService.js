"use strict";

(function(aScope, undefined){
	
	
	
	var currencyService = {
		
		getCurrencies: function() {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/currencies',
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		getCurrencyById: function(id) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/currencies/' + id,
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		deleteCurrency: function(id) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/currencies/' + id,
				method: 'DELETE'
			});
		},
		
		createCurrency: function(currencyData) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/currencies',
				method  : 'POST',
				data    : currencyData,
				dataType: 'json'
			});
		},
		
		updateCurrency: function(currencyData) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/currencies/' + currencyData.id,
				method: 'PUT',
				data  : currencyData
			});
		},
		
		setDefaultCurrency: function(id) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/currencies/' + id + '/default',
				method: 'PUT'
			});
		}
	}
	
	aScope.curencyService = currencyService;
	
})($EX);
