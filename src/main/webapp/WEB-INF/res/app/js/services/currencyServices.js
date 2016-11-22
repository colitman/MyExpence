'use strict';

function getCurrencies() {
	return $.ajax({
		url: APP_ROOT + '/currencies',
		method: 'GET',
		dataType: 'json'
	});
}