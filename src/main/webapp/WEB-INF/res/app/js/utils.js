'use strict';

function markRequired () {
	$('form [required="required"]').each(function(index, item) {
		var label = $(item).siblings('label');
		var labelText = $(label).text();
		$(label).html(labelText + ' <span class="asterisk-required">*</span>');
	});
}

