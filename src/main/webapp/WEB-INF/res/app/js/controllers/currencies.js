"use strict";

(function(aScope, undefined) {
	var model = aScope.currenciesModel;
	var view = aScope.currenciesView;
	
	model.subscribe(view);
	aScope.primaryModel = model;
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
	
})($EX);
