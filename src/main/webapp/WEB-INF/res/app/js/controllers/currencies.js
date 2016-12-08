"use strict";

/*
Controller - Observer
*/

function CurrenciesController(model, undefined){
	
	var currenciesModel = model;
	
	var currenciesController = {
		update: function(viewEvent) {
			if(viewEvent.name === 'c.currency.added') {
				
				var newCurrencyForm = viewEvent.data;
				
				var currencyData = new Currency();
				currencyData.name = $('#name', newCurrencyForm).val();
				currencyData.symbol = $('#symbol', newCurrencyForm).val();
				currencyData.code = $('#code', newCurrencyForm).val();
				currencyData.defaultCurrency = false;
				
				currenciesModel.addCurrency(currencyData);
			}
			
			if(viewEvent.name === 'c.currency.changed') {
				
				var changeCurrencyForm = viewEvent.data;
				
				var currencyData = new Currency();
				currencyData.id = $('#id', changeCurrencyForm).val();
				currencyData.name = $('#name', changeCurrencyForm).val();
				currencyData.symbol = $('#symbol', changeCurrencyForm).val();
				currencyData.code = $('#code', changeCurrencyForm).val();
				currencyData.defaultCurrency = $('#defaultCurrency', changeCurrencyForm).val();
				
				currenciesModel.updateCurrency(currencyData);
			}
			
			if(viewEvent.name === 'c.currency.change') {
				
				var id = viewEvent.data;
				var editForm = $('#c-js-edit-currency-form');
				
				currenciesModel.getCurrency(id)
					.done(function(data) {
						$('#name', editForm).val(data.name);
						$('#code', editForm).val(data.code);
						$('#symbol', editForm).val(data.symbol);
						$('#id', editForm).val(data.id);
						$('#defaultCurrency', editForm).val(data.defaultCurrency);
						
						$(editForm).removeClass('hidden');
					})
					.fail(function(jqXHR) {
						console.log(jqXHR.responseText);
					});
			}
			
			if(viewEvent.name === 'c.currency.defaultChanged') {
				
				var defaultCurrencyForm = viewEvent.data;
				
				var id = $('#id', defaultCurrencyForm).val();
				
				currenciesModel.setDefaultCurrency(id);
			}
			
			if(viewEvent.name === 'c.currency.delete') {
				
				var id = viewEvent.data;
				var deleteModal = $('#c-delete-confirmation-modal');
				
				currenciesModel.getCurrency(id)
					.done(function(data) {
						$('#c-delete-subject', deleteModal).html('<b>' + data.symbol + ' ' + data.name + ' (' + data.code + ')</b> currency.');
						$('#c-modal-delete-form #id', deleteModal).val(data.id);
						$(deleteModal).modal('show');
					})
					.fail(function(jqXHR) {
						console.log(jqXHR.responseText);
					});
			}
			
			if(viewEvent.name === 'c.currency.deleted') {
				
				var deleteCurrencyForm = viewEvent.data;
				var id = $('#id', deleteCurrencyForm).val();
				currenciesModel.deleteCurrency(id)
					.fail(function(jqXHR, textStatus, errorThrown) {
						var deleteModal = $('#c-delete-confirmation-modal');
						$('#c-delete-failure-message', deleteModal).text(jqXHR.responseText);
						$('#c-delete-failure-alert', deleteModal).removeClass('hidden');
					});
			}
		}
	};
	
	return currenciesController;
	
};
