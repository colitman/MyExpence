'use strict';

/*$(function() {
	onCurrencyCreate();
	onDefaultCurrencyUpdate();
	onCurrencyUpdate();
	onCurrencyDelete();
	reloadCurrenciesPageData();
});*/

function reloadCurrenciesPageData() {
	getCurrencies()
		.done(function(data) {
			updateDefaultCurrencySelect(data);
			updateCurrenciesTable(data);
		})
		.fail(function() {
			alert('fail to get currencies');
		});
}

function onCurrencyDelete() {
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteForm = $('#c-modal-delete-form');
	
	$(deleteForm).submit(function(event) {
		event.preventDefault();
		deleteCurrency($('#id', deleteForm).val())
			.done(function() {
				$(deleteModal).modal('hide');
				reloadCurrenciesPageData();
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				$('#c-delete-failure-message', deleteModal).text(jqXHR.responseText);
				$('#c-delete-failure-alert', deleteModal).removeClass('hidden');
				//alert(jqXHR.responseText);
			});
	});
}

function onCurrencyUpdate() {
	var editForm = $('#c-edit-currency-form');
	
	$(editForm).submit(function(event) {
		event.preventDefault();
		updateCurrency($('#id', editForm).val())
			.done(function() {
				$(editForm).addClass('hidden');
				reloadCurrenciesPageData();
			})
			.fail(function() {
				alert('failed to update currency with id=' + $('#id', editForm).val());
			});
	});
	
	$('button[type="reset"]', editForm).click(function() {
		$(editForm).addClass('hidden');
	});
}

function onCurrencyCreate() {
	$('#c-add-currency-form form').submit(function(submitEvent) {
		submitEvent.preventDefault();
		var form = $(this);
		createCurrency()
			.done(function() {
				$('button[type="reset"]', form).click();
				reloadCurrenciesPageData();
			})
			.fail(function() {
				alert('fail to post currency');
			});
	});
}

function onDefaultCurrencyUpdate() {
	$('#c-choose-default-currency-form form').submit(function(submitEvent) {
		submitEvent.preventDefault();
		setDefaultCurrency()
			.done(function() {
				reloadCurrenciesPageData();
			}).fail(function() {
				alert('fail to post default currency');
			});
	});
}

function updateDefaultCurrencySelect(data) {
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

function updateCurrenciesTable(data) {
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
		$(row).append(buildCurrencyActions(data[i]));
		
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

function buildCurrencyActions(currencyData) {
	var tdActions = document.createElement('td');
	
	var editAction = document.createElement('a');
	$(editAction).attr('href', '#');
	$(editAction).html('<i class="fa fa-pencil"></i>');
	$(editAction).data('target', currencyData.id);
	$(tdActions).append(editAction);
	
	$(editAction).click(function(event) {
		event.preventDefault();
		onCurrencyEditAttempt(editAction);
	});
	
	if(!currencyData.defaultCurrency) {
		var deleteAction = document.createElement('a');
		$(deleteAction).attr('href', '#');
		$(deleteAction).html('<i class="fa fa-remove"></i>');
		$(deleteAction).data('target', currencyData.id);
		$(tdActions).append(deleteAction);
		
		$(deleteAction).click(function(event) {
			event.preventDefault();
			onCurrencyDeleteAttempt(deleteAction);
		});
	}
	
	return tdActions;
}

function onCurrencyEditAttempt(control) {
	var editForm = $('#c-edit-currency-form');
	
	getCurrencyById($(control).data('target'))
		.done(function(data) {
			$('#name', editForm).val(data.name);
			$('#code', editForm).val(data.code);
			$('#symbol', editForm).val(data.symbol);
			$('#id', editForm).val(data.id);
			
			$(editForm).removeClass('hidden');
		})
		.fail(function() {
			alert('failed to get currency with id=' + $(control).data('target'));
		});
}

function onCurrencyDeleteAttempt(control) {
	var deleteModal = $('#c-delete-confirmation-modal');
	
	getCurrencyById($(control).data('target'))
		.done(function(data) {
			$('#c-delete-subject', deleteModal).html('<b>' + data.symbol + ' ' + data.name + ' (' + data.code + ')</b> currency.');
			
			$('#c-modal-delete-form #id', deleteModal).val(data.id);
			
			$(deleteModal).modal('show');
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			alert('failed to get currency with id=' + $(control).data('target'));
		});
}