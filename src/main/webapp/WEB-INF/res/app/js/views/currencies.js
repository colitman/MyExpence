"use strict";

/*
View is an observer object.
It should expose the following public access interfaces:
- update(observableModel)
*/

(function(aScope, undefined){
	
	var updateDefaultCurrencySelect = function(data) {
		var select = $('#c-choose-default-currency-form #id');
		$(select).html('');
		
		for(var i = 0; i < data.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', data[i].id);
			$(option).text(data[i].symbol + ' ' + data[i].name + ' (' + data[i].code + ')');
			if(data[i].defaultCurrency) {
				$(option).prop('selected', 'selected');
			}
			
			$(select).append(option);
		}
	}
	
	var updateCurrenciesList = function(data) {
		var table = $('#c-added-currencies-table');
		var oldTbody = $('tbody', table);
		var body = document.createElement('tbody');
		
		for(var i = 0; i < data.length; i++) {
			var row = document.createElement('tr');
			
			var tdName = document.createElement('td');
			var tdSymbol = document.createElement('td');
			var tdCode = document.createElement('td');
			
			$(tdName).text(data[i].name);
			$(tdSymbol).text(data[i].symbol);
			$(tdCode).text(data[i].code);
			
			$(row).append(tdName);
			$(row).append(tdSymbol);
			$(row).append(tdCode);
			$(row).append(createCurrencyActions(data[i]));
			
			if(data[i].defaultCurrency) {
				$(row).addClass('success');
				$(body).prepend(row);
			} else {
				$(body).append(row);
			}
		}
		
		
		$(oldTbody).remove();
		$('thead', table).after(body)
	}
	
	var createCurrencyActions = function(currencyData) {
		var tdActions = document.createElement('td');
		
		var editAction = document.createElement('a');
		$(editAction).attr('href', '#');
		$(editAction).html('<i class="fa fa-pencil"></i>');
		$(editAction).data('target', currencyData.id);
		$(tdActions).append(editAction);
		
		if(!currencyData.defaultCurrency) {
			var deleteAction = document.createElement('a');
			$(deleteAction).attr('href', '#');
			$(deleteAction).html('<i class="fa fa-remove"></i>');
			$(deleteAction).data('target', currencyData.id);
			$(tdActions).append(deleteAction);
		}
		
		return tdActions;
	}
	
	var currenciesView = {
		
		update: function(currenciesModel) {
			var currencies = currenciesModel.getCurrencies()
				.done(function(currenciesData) {
					updateDefaultCurrencySelect(currenciesData);
					updateCurrenciesList(currenciesData);
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
		}
	
	};
	
	
	aScope.currenciesView = currenciesView;
	
})($EX);
