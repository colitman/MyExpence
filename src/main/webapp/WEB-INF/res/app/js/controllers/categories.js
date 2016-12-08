"use strict";

/*
Controller - Observer
*/

function CategoriesController(model, undefined){
	
	var categoriesModel = model;
	
	var categoriesController = {
		update: function(viewEvent) {
			if(viewEvent.name === 'c.category.added') {
				
				var newCategoryForm = viewEvent.data.form;
				
				var categoryData = new Category();
				categoryData.name = $('#name', newCategoryForm).val();
				
				if(viewEvent.data.type === $EX.CATEGORY_TYPES.INCOME) {
					categoriesModel.addIncomeCategory(categoryData);
				} else if(viewEvent.data.type === $EX.CATEGORY_TYPES.OUTGOING) {
					categoriesModel.addOutgoingCategory(categoryData);
				}
			}
			
			
			if(viewEvent.name === 'c.category.changed') {
				
				var changeCategoryForm = viewEvent.data;
				
				var categoryData = new Category();
				categoryData.id = $('#id', changeCategoryForm).val();
				categoryData.name = $('#name', changeCategoryForm).val();
				categoryData.type = $('#type', changeCategoryForm).val();
				
				categoriesModel.updateCategory(categoryData);
			}
			
			if(viewEvent.name === 'c.category.change') {
				
				var id = viewEvent.data.id;
				var editForm = viewEvent.data.form;
				
				categoriesModel.getCategory(id)
					.done(function(data) {
						$('#name', editForm).val(data.name);
						$('#type', editForm).val(data.type);
						$('#id', editForm).val(data.id);
						
						$(editForm).removeClass('hidden');
					})
					.fail(function(jqXHR) {
						console.log(jqXHR.responseText);
					});
			}
			
			if(viewEvent.name === 'c.category.delete') {
				
				var id = viewEvent.data;
				var deleteModal = $('#c-delete-confirmation-modal');
				
				categoriesModel.getCategory(id)
					.done(function(data) {
						$('#c-delete-subject', deleteModal).html('<b>' + data.name + ' (' + data.type + ')</b> category.');
						$('#c-modal-delete-form #id', deleteModal).val(data.id);
						$(deleteModal).modal('show');
					})
					.fail(function(jqXHR) {
						console.log(jqXHR.responseText);
					});
			}
			
			if(viewEvent.name === 'c.category.deleted') {
				
				var deleteCategoryForm = viewEvent.data;
				var id = $('#id', deleteCategoryForm).val();
				categoriesModel.deleteCategory(id)
					.fail(function(jqXHR, textStatus, errorThrown) {
						var deleteModal = $('#c-delete-confirmation-modal');
						$('#c-delete-failure-message', deleteModal).text(jqXHR.responseText);
						$('#c-delete-failure-alert', deleteModal).removeClass('hidden');
					});
			}
		}
	};
	
	return categoriesController;
	
}
