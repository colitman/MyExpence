'use strict';

function markRequired () {
	$('form [required="required"]').each(function(index, item) {
		var label = $(item).siblings('label');
		var labelText = $(label).text();
		$(label).html(labelText + ' <span class="asterisk-required">*</span>');
	});
}

function closeDeleteFailureAlert() {
	$('#c-delete-failure-alert button.close').click(function(event) {
		event.preventDefault();
		$('#c-delete-failure-alert').addClass('hidden');
	});
	
	$('#c-delete-confirmation-modal').on('hidden.bs.modal', function (event) {
		$('#c-delete-failure-alert').addClass('hidden');
	})
}

function generateBreadcrumbs() {
	var crumbsContainer = $('main header .breadcrumb');
	
	$('li:not(.active,.c-home-crumb)', crumbsContainer).each(function(index, item) {
		var pageCode = $(item).text();
		$(item).html('');
		
		var crumbURL = PAGES[pageCode].url;
		var crumbName = PAGES[pageCode].name;
		
		var crumbLink = document.createElement('a');
		$(crumbLink).attr('href', crumbURL);
		$(crumbLink).text(crumbName);
		
		$(item).html(crumbLink);
	});
}

