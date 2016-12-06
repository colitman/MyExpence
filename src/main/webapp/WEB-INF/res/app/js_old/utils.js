'use strict';

function closeDeleteFailureAlert() {
	$('#c-delete-failure-alert button.close').click(function(event) {
		event.preventDefault();
		$('#c-delete-failure-alert').addClass('hidden');
	});
	
	$('#c-delete-confirmation-modal').on('hidden.bs.modal', function (event) {
		$('#c-delete-failure-alert').addClass('hidden');
	})
}