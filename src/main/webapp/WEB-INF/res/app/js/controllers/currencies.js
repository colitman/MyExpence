"use strict";

(function(aScope, undefined) {
	var model = aScope.currenciesModel;
	var view = aScope.currenciesView;
	
	var controller = {
		
	};
	
	model.subscribe(view);
	model.updateData();
	
	/* Event listeners */
	$(view)
		.on('currency:added', function(event, form) {
			var currencyData = new Currency();
			
			currencyData.name = $('#name', form).val();
			currencyData.symbol = $('#symbol', form).val();
			currencyData.code = $('#code', form).val();
			currencyData.defaultCurrency = false;
			
			model.addCurrency(currencyData)
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to add currency.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('currency:change', function(event, currencyId, form) {
			model.getCurrency(currencyId)
				.done(function(currencyData) {
					$('#name', form).val(currencyData.name);
					$('#code', form).val(currencyData.code);
					$('#symbol', form).val(currencyData.symbol);
					$('#id', form).val(currencyData.id);
					$('#defaultCurrency', form).val(currencyData.defaultCurrency);
					
					$(form).removeClass('hidden');
				})
				.fail(function(jqXHR) {
					new Alert('danger', 'Oops!', 'Failed to get currency.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('currency:changed', function(event, form) {
			
			var currencyData = new Currency();
			currencyData.id = $('#id', form).val();
			currencyData.name = $('#name', form).val();
			currencyData.symbol = $('#symbol', form).val();
			currencyData.code = $('#code', form).val();
			currencyData.defaultCurrency = $('#defaultCurrency', form).val();
			
			model.updateCurrency(currencyData)
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to update currency.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('currency:changedDefault', function(event, currencyId) {
			model.setDefaultCurrency(currencyId)
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to set new default currency.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('currency:delete', function(event, currencyId, modal) {
			
			model.getCurrency(currencyId)
				.done(function(currencyData) {
					$('#c-delete-subject', modal).html('<b>' + currencyData.symbol + ' ' + currencyData.name + ' (' + currencyData.code + ')</b> currency.');
					$('#c-modal-delete-form #id', modal).val(currencyData.id);
					$(modal).modal('show');
				})
				.fail(function(jqXHR) {
					new Alert('danger', 'Oops!', 'Failed to get currency.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('currency:deleted', function(event, currencyId, modal) {
			model.deleteCurrency(currencyId)
				.fail(function(jqXHR, textStatus, errorThrown) {
					$('#c-delete-failure-message', modal).text(jqXHR.responseText);
					$('#c-delete-failure-alert', modal).removeClass('hidden');
				});
		});
	
})($EX)

/*function CurrenciesController(model, undefined){
	
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
	
};*/
