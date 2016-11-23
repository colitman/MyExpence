'use strict';

function getCurrencies() {
	return $.ajax({
		url: WEB_API_ROOT + '/currencies',
		method: 'GET',
		dataType: 'json'
	});
}

function getCurrencyById(id) {
	return $.ajax({
		url: WEB_API_ROOT + '/currencies/' + id,
		method: 'GET',
		dataType: 'json'
	});
}

function deleteCurrency(id) {
	
	var csrf = $('#c-modal-delete-form').serialize();
	
	return $.ajax({
		url: WEB_API_ROOT + '/currencies/' + id + '/delete',
		method: 'POST',
		data:csrf
	});
}