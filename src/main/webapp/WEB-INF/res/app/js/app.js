"use strict";

(function(window, undefined){
	
	var appRoot = $('meta[name="contextPath"]').attr('content');
	
	var myExpense = {
	
		APP_ROOT: appRoot,
		WEB_API_ROOT: appRoot + '/api/web',
		PAGES : {
			login: {url: appRoot + '/login', name: 'Log In'},
			signup: {url: appRoot + '/register', name: 'Sign Up'},
			assetsSettings: {url: appRoot + '/settings/assets', name: 'Assets'},
			currenciesSettings: {url: appRoot + '/settings/currencies', name: 'Currencies'}
		},
		
		markRequiredFields: function(){
			$('form').each(function(index, form) {
				$('[required="required"]', form).each(function(index, control) {
					var controlId = $(control).attr('id');
					var label = $('label[for="' + controlId + '"]', form);
					var labelText = $(label).text();
					$(label).html(labelText + ' <span class="c-asterisk-required">*</span>');
				});
			});
		},
		
		generateBreadcrumbs: function(currentCrumbText) {
			var crumbsContainer = $('#c-js-crumbs');
			var operatedCrumbs = $('li:not(.active,.c-js-home-crumb)', crumbsContainer);
			
			$(operatedCrumbs).each(function(index, crumbItem) {
				var pageCode = $(crumbItem).text();
				$(crumbItem).html('');
				
				var crumbURL = myExpense.PAGES[pageCode].url;
				var crumbName = myExpense.PAGES[pageCode].name;
				
				var crumbLink = $(document.createElement('a'));
				crumbLink.attr('href', crumbURL);
				crumbLink.text(crumbName);
				
				$(crumbItem).html(crumbLink);
			});
			
			var currentCrumb = $('.active', crumbsContainer).filter(':last');
			currentCrumb.text(currentCrumbText);
		}
	
	}
	
	window.myExpense = window.$EX = myExpense;
	$EX.markRequiredFields();
	
	$('#c-delete-failure-alert button.close').click(function(event) {
		event.preventDefault();
		$('#c-delete-failure-alert').addClass('hidden');
	});
	
	$('#c-delete-confirmation-modal').on('hidden.bs.modal', function (event) {
		$('#c-delete-failure-alert').addClass('hidden');
	})
	
})(window);