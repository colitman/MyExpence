'use strict';

$(function() {
	onCurrencyCreate();
	updateCurrenciesTable();
});

function updateCurrenciesTable() {
	$.ajax({
		url: APP_ROOT + '/currencies',
		method: 'GET',
		dataType: 'json'
	}).done(function(data) {
		var table = $('#c-added-currencies-table');
		var oldTbody = $('tbody', table);
		var body = document.createElement('tbody');
		
		for(var i = 0; i < data.length; i++) {
			var row = document.createElement('tr');
			
			var tdName = document.createElement('td');
			var tdSymbol = document.createElement('td');
			var tdCode = document.createElement('td');
			var tdActions = document.createElement('td');
			
			$(tdName).text(data[i].name);
			$(tdSymbol).text(data[i].symbol);
			$(tdCode).text(data[i].code);
			
			$(row).append(tdName);
			$(row).append(tdSymbol);
			$(row).append(tdCode);
			$(row).append(tdActions);
			
			$(body).append(row);
		}
		
		
		$(oldTbody).remove();
		$('thead', table).after(body)
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
		}).done(function(newId) {
			$('button[type="reset"]', form).click()
			updateCurrenciesTable();
		}).fail(function() {
			alert('fail');
		});
	});
}