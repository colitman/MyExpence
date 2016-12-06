"use strict";

(function(window, undefined){
	
	var myExpense = {
	
		APP_ROOT: $('meta[name="contextPath"]').attr('content'),
		WEB_API_ROOT: APP_ROOT + '/api/web',
		PAGES : {
			login: {url: APP_ROOT + '/login', name: 'Log In'},
			signup: {url: APP_ROOT + '/register', name: 'Sign Up'},
			assetsSettings: {url: APP_ROOT + '/settings/assets', name: 'Assets'},
			currenciesSettings: {url: APP_ROOT + '/settings/currencies', name: 'Currencies'}
		},
		
		markRequiredFieds: function(){
			$('form').each(function(index, form) {
				$('[required="required"]', form).each(function(index, control) {
					var controlId = $(control).attr('id');
					var label = $('label[for="' + controlId + '"', form);
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
				
				var crumbURL = this.PAGES[pageCode].url;
				var crumbName = this.PAGES[pageCode].name;
				
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
	
})(window);