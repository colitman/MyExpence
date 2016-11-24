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

function createCurrency() {
	var createForm = $('#c-add-currency-form form');
	var data = $(createForm).serialize();
	
	return $.ajax({
		url: WEB_API_ROOT + '/currencies',
		method: 'POST',
		data: data,
		dataType: 'json'
	});
}

function updateCurrency(id) {
	
	var data = $('#c-edit-currency-form form').serialize();
	
	return $.ajax({
		url: WEB_API_ROOT + '/currencies/' + id + '/update',
		method: 'POST',
		data:data
	});
}

function setDefaultCurrency() {
	var form = $('#c-choose-default-currency-form form');
	var data = $(form).serialize();
	
	return $.ajax({
		url: WEB_API_ROOT + '/currencies/default',
		method: 'POST',
		data: data
	});
}