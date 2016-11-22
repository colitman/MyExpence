'use strict';

$(function() {
	onCurrencyCreate();
	onDefaultCurrencyUpdate();
	buildDefaultCurrencySelect();
	buildCurrenciesTable();
});

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
			buildCurrenciesTable();
			buildDefaultCurrencySelect();
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
			buildCurrenciesTable();
			buildDefaultCurrencySelect();
		}).fail(function() {
			alert('fail to post default currency');
		});
	});
}

function buildDefaultCurrencySelect() {
	getCurrencies()
		.done(function(data) {
			updateDefaultCurrencySelect(data);
		})
		.fail(function() {
			alert('fail to get currencies');
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

function buildCurrenciesTable() {
	getCurrencies()
		.done(function(data) {
			updateCurrenciesTable(data);
		})
		.fail(function() {
			alert('fail to get currencies');
		});
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
		$(tdActions).append(deleteAction);
	}
	
	return tdActions;
}