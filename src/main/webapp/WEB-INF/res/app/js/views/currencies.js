"use strict";

/*
View is an observer object.
It should expose the following public access interfaces:
- update(object)
 
 View is also an observable object.
 It should expose the following public access interfaces:
 - subscribe
 
 It also should have the following private methods:
 - countObservers
 - isChanged
 - setChanged
 - clearChanged
 - notifyObservers
 - deleteObservers
*/

(function(aScope, undefined){
	
	var addCurrencyForm = $('#c-js-add-currency-form');
	var chooseDefaultCurrencyForm = $('#c-js-choose-default-currency-form');
	var editCurrencyForm = $('#c-js-edit-currency-form');
	var currenciesTable = $('#c-js-currencies-table');
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteCurrencyForm = $('#c-modal-delete-form');
	
	var currencyAddedEvent = new ViewEvent('c.currency.added',addCurrencyForm);
	var currencyChangeEvent = new ViewEvent('c.currency.change');
	var currencyChangedEvent = new ViewEvent('c.currency.changed',editCurrencyForm);
	var defaultCurrencyChangedEvent = new ViewEvent('c.currency.defaultChanged',chooseDefaultCurrencyForm);
	var currencyDeleteEvent = new ViewEvent('c.currency.delete');
	var currencyDeletedEvent = new ViewEvent('c.currency.deleted');
	
	var updateDefaultCurrencySelect = function(data) {
		var select = $('#id', chooseDefaultCurrencyForm);
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
		var oldTbody = $('tbody', currenciesTable);
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
		$('thead', currenciesTable).after(body)
	}
	
	var createCurrencyActions = function(currencyData) {
		var tdActions = document.createElement('td');
		
		var editAction = document.createElement('a');
		$(editAction).attr('href', '#');
		$(editAction).html('<i class="fa fa-pencil"></i>');
		$(editAction).data('target', currencyData.id);
		$(tdActions).append(editAction);
		
		$(editAction).click(function(event) {
			event.preventDefault();
			currencyChangeEvent.data = $(editAction).data('target');
			currenciesView.setChanged();
			currenciesView.notifyObservers(currencyChangeEvent);
		});
		
		if(!currencyData.defaultCurrency) {
			var deleteAction = document.createElement('a');
			$(deleteAction).attr('href', '#');
			$(deleteAction).addClass('c-js-delete-action');
			$(deleteAction).html('<i class="fa fa-remove"></i>');
			$(deleteAction).data('target', currencyData.id);
			$(tdActions).append(deleteAction);
			
			$(deleteAction).click(function(event) {
				event.preventDefault();
				currencyDeleteEvent.data = $(deleteAction).data('target');
				currenciesView.setChanged();
				currenciesView.notifyObservers(currencyDeleteEvent);
			});
		}
		
		return tdActions;
	}
	
	var observable = new Observable();
	
	var currenciesView = {
		
		__proto__: observable,
		
		update: function(currenciesModel) {
			currenciesModel.getCurrencies()
				.done(function(currenciesData) {
					$('button[type="reset"]', addCurrencyForm).click();
					$(deleteModal).modal('hide');
					$('[type="reset"]', editCurrencyForm).click();
					$(editCurrencyForm).addClass('hidden');
					updateDefaultCurrencySelect(currenciesData);
					updateCurrenciesList(currenciesData);
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
		}
	
	};
	
	addCurrencyForm.submit(function(event) {
		event.preventDefault();
		currenciesView.setChanged();
		currenciesView.notifyObservers(currencyAddedEvent)
	});
	
	editCurrencyForm.submit(function(event) {
		event.preventDefault();
		currenciesView.setChanged();
		currenciesView.notifyObservers(currencyChangedEvent)
	});
	
	$('[type="reset"]', editCurrencyForm).click(function(event) {
		$('[type="hidden"]', editCurrencyForm).each(function(undex, hiddenInput) {
			$(hiddenInput).val('');
		});
		editCurrencyForm.addClass('hidden');
	});
	
	$('#c-js-cancel-edit-currency-button', editCurrencyForm).click(function(event) {
		event.preventDefault();
		currencyChangeEvent.data = $('#id', editCurrencyForm).val();
		currenciesView.setChanged();
		currenciesView.notifyObservers(currencyChangeEvent);
	});
	
	chooseDefaultCurrencyForm.submit(function(event) {
		event.preventDefault();
		currenciesView.setChanged();
		currenciesView.notifyObservers(defaultCurrencyChangedEvent)
	});
	
	deleteCurrencyForm.submit(function(event) {
		event.preventDefault();
		currencyDeletedEvent.data = $(deleteCurrencyForm);
		currenciesView.setChanged();
		currenciesView.notifyObservers(currencyDeletedEvent);
	});
		
	aScope.currenciesView = currenciesView;
	
})($EX);
