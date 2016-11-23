'use strict';

$(function() {
	onCurrencyCreate();
	onDefaultCurrencyUpdate();
	reloadPageData();
});

function reloadPageData() {
	getCurrencies()
		.done(function(data) {
			updateDefaultCurrencySelect(data);
			updateCurrenciesTable(data);
		})
		.fail(function() {
			alert('fail to get currencies');
		});
}

function onCurrencyCreate() {
	$('#c-add-currency-form form').submit(function(submitEvent) {
		submitEvent.preventDefault();
		
		var url = $(this).attr('action');
		var data = $(this).serialize();
		var form = $(this);
		
		$.ajax({
			url: url,
			method: 'POST',
			data: data,
			dataType: 'json'
		}).done(function(data) {
			$('button[type="reset"]', form).click();
			reloadPageData();
		}).fail(function() {
			alert('fail to post currency');
		});
	});
}

function onDefaultCurrencyUpdate() {
	$('#c-choose-default-currency-form form').submit(function(submitEvent) {
		submitEvent.preventDefault();
		
		var url = $(this).attr('action');
		var data = $(this).serialize();
		var form = $(this);
		
		$.ajax({
			url: url,
			method: 'POST',
			data: data
		}).done(function(data) {
			reloadPageData();
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
		
		$(body).append(row);
	}
	
	
	$(oldTbody).remove();
	$('thead', table).after(body)
}

function buildCurrencyActions(currencyData) {
	var tdActions = document.createElement('td');
	
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

function onCurrencyDeleteAttempt(control) {
	var deleteModal = $('#c-delete-confirmation-modal');
	
	getCurrencyById($(control).data('target'))
		.done(function(data) {
			$('#c-delete-subject', deleteModal).html('<b>' + data.symbol + ' ' + data.name + ' (' + data.code + ')</b> currency.');
			
			$('#c-modal-delete-form').submit(function(event) {
				event.preventDefault();
				deleteCurrency($(control).data('target'))
					.done(function(data) {
						$(deleteModal).modal('hide');
						reloadPageData();
					})
					.fail(function() {
						alert('failed to delete currency with id=' + $(control).data('target'))
					});
			});
			
			$(deleteModal).modal('show');
		})
		.fail(function() {
			alert('failed to get currency with id=' + $(control).data('target'));
		});
}