"use strict";

/**
 * <b>Currency List view</b>
 *
 * <p>Represents view for a page with a list of currencies, together with
 * actions that may be applied to either a list or separate currency</p>
 *
 * <p>This view acts as observer object, registered to listen to model change notifications.
 * Obsrvable object calls the <b>.update(subject, message)</b> method of observer to notify about changes.
 * </p>
 *
 * @param aScope global application scope object
 */

(function(aScope, undefined){
	
	var observer = new Observer();
	
	var currencyView = {
		__proto__: observer,
		
		/**
		 * This method is called by observed model when it is changed.
		 *
		 * @param {*} subject - reference to VM object in global application scope with model data
		 * @param {string} [message=undefined] - additional message that model may send
		 */
		update: function(subject, message) {
			resetForms();
			hideModals();
			setDefaultCurrencySelectOptions(subject);
			buildCurrenciesList(subject);
			initDataTable();
		}
	};
	
	aScope.currenciesView = currencyView;
	
	/* Private fields */
	var addCurrencyForm = $('#c-js-add-currency-form');
	var editCurrencyForm = $('#c-js-edit-currency-form');
	var chooseDefaultCurrencyForm = $('#c-js-choose-default-currency-form');
	
	var currenciesTable = $('#c-js-currencies-table');
	
	var deleteModal = $('#c-delete-confirmation-modal');
	
	/* Private methods */
	var resetForms = function() {
		$('button[type="reset"]', addCurrencyForm).click();
		
		$('button[type="reset"]', editCurrencyForm).click();
		$(editCurrencyForm).addClass('hidden');
	};
	
	var hideModals = function() {
		$(deleteModal).modal('hide');
	};
	
	var setDefaultCurrencySelectOptions = function(vm) {
		var select = $('#id', chooseDefaultCurrencyForm);
		$(select).html('');
		
		var currencies = vm.listData;
		
		for(var i = 0; i < currencies.length; i++) {
			var currency = currencies[i];
			var option = jQueryDomBuilder.getOption(currency.id, currency.toString(), currency.defaultCurrency);
			$(select).append(option);
		}
	};
	
	var buildCurrenciesList = function(vm) {
		var currencies = vm.listData;
		var body = $('tbody', currenciesTable);
		body.html('');
		
		for(var i = 0; i < currencies.length; i++) {
			var currency = currencies[i];
			var row = jQueryDomBuilder.getTableRow([currency.name, currency.symbol, currency.code,''], body);
			
			var actionsColumn = row.find('td:last');
			var editAction = jQueryDomBuilder.getAnchor('#','',[['target',currency.id]], actionsColumn);
			
			if(!currency.defaultCurrency) {
				var deleteAction = jQueryDomBuilder.getAnchor('#','',[['target',currency.id]], actionsColumn);
				deleteAction.addClass('c-js-delete-action');
			} else {
				$(row).addClass('success');
			}
			
			/*
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
			 */
		}
	};
	
	var initDataTable = function() {
		var txDataTable = $('.c-js-datatable').DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']],
			destroy: true
		});
	};
	
	/*var addCurrencyForm = $('#c-js-add-currency-form');
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
	
	var initDataTable = function() {
		
		var txDataTable = $('.c-js-datatable').DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']],
			destroy: true
		});
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
					initDataTable();
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
		
	aScope.currenciesView = currenciesView;*/
	
})($EX);
