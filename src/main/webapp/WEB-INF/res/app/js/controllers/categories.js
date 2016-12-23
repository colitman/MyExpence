"use strict";

(function(aScope, undefined) {
	var model = aScope.categoriesModel;
	var incomeView = aScope.incomeCategoriesView;
	var outgoingView = aScope.outgoingCategoriesView;
	
	$('a[href="#c-js-income-categories"]').on('show.bs.tab', function(event) {
		model.deleteObservers();
		model.subscribe(incomeView);
		model.updateData();
	});
	
	$('a[href="#c-js-outgoing-categories"]').on('show.bs.tab', function(event) {
		model.deleteObservers();
		model.subscribe(outgoingView);
		model.updateData();
	});
	
	model.subscribe(incomeView);
	aScope.primaryModel = model;
	model.updateData();
	
	/* Event Listeners */
	var views = [incomeView, outgoingView];
	
	for(var i = 0; i < views.length; i++) {
		var view = views[i];
		
		$(view)
			.on('category:added', function(event, categoryType,form) {
				var categoryData = new Category();
				categoryData.name = $('#name', form).val();
				
				if(categoryType === $EX.CATEGORY_TYPES.INCOME) {
					model.addIncomeCategory(categoryData)
						.fail(function(jqXHR, textStatus, errorThrown) {
							new Alert('danger', 'Oops!', 'Failed to add category.').show();
							console.log(jqXHR.responseText);
						});
				} else if(categoryType === $EX.CATEGORY_TYPES.OUTGOING) {
					model.addOutgoingCategory(categoryData)
						.fail(function(jqXHR, textStatus, errorThrown) {
							new Alert('danger', 'Oops!', 'Failed to add category.').show();
							console.log(jqXHR.responseText);
						});
				}
			})
			.on('category:change', function(event, categoryId, form) {
				model.getCategory(categoryId)
					.done(function(categoryData) {
						$('#name', form).val(categoryData.name);
						$('#type', form).val(categoryData.type);
						$('#id', form).val(categoryData.id);
						
						$(form).removeClass('hidden');
					})
					.fail(function(jqXHR) {
						new Alert('danger', 'Oops!', 'Failed to get category.').show();
						console.log(jqXHR.responseText);
					});
			})
			.on('category:changed', function(event, form) {
				var categoryData = new Category();
				categoryData.id = $('#id', form).val();
				categoryData.name = $('#name', form).val();
				categoryData.type = $('#type', form).val();
				
				model.updateCategory(categoryData)
					.fail(function(jqXHR, textStatus, errorThrown) {
						new Alert('danger', 'Oops!', 'Failed to update category.').show();
						console.log(jqXHR.responseText);
					});
			})
			.on('category:delete', function(event, categoryId, modal) {
				
				model.getCategory(categoryId)
					.done(function(categoryData) {
						$('#c-delete-subject', modal).html('<b>' + categoryData.name + ' (' + categoryData.type + ')</b> category.');
						$('#c-modal-delete-form #id', modal).val(categoryData.id);
						$(modal).modal('show');
					})
					.fail(function(jqXHR) {
						new Alert('danger', 'Oops!', 'Failed to get category.').show();
						console.log(jqXHR.responseText);
					});
			})
			.on('category:deleted', function(event, categoryId, modal) {
				model.deleteCategory(categoryId)
					.fail(function(jqXHR, textStatus, errorThrown) {
						$('#c-delete-failure-message', modal).text(jqXHR.responseText);
						$('#c-delete-failure-alert', modal).removeClass('hidden');
					});
			});
	}
})($EX);