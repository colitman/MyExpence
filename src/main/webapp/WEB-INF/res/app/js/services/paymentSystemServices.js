'use strict';

function getPaymentSystems() {
	return $.ajax({
		url: WEB_API_ROOT + '/paymentSystems',
		method: 'GET',
		dataType: 'json'
	});
}