"use strict";

(function(aScope, undefined){
	
	
	
	var categoryService = {
		
		getIncomeCategories: function() {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/categories/income',
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		getOutgoingCategories: function() {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/categories/outgoing',
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		getCategory: function(id) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/categories/' + id,
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		deleteCategory: function(id) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/categories/' + id,
				method: 'DELETE'
			});
		},
		
		createCategory: function(categoryData) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/categories',
				method  : 'POST',
				data    : categoryData,
				dataType: 'json'
			});
		},
		
		updateCategory: function(categoryData) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/categories/' + categoryData.id,
				method: 'PUT',
				data  : categoryData
			});
		}
	}
	
	aScope.categoryService = categoryService;
	
})($EX);
