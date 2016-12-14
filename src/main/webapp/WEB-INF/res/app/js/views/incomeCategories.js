"use strict";

/*
View is an observer object.
It should expose the following public access interfaces:
- update(object)
 
 View is also an observable object.
 It should expose the following public access interfaces:
 - subscribe
 
 It also should have the following private methods:
 - countObservers
 - isChanged
 - setChanged
 - clearChanged
 - notifyObservers
 - deleteObservers
*/

(function(aScope, undefined){
	
	var addCategoryForm = $('#c-js-add-income-category-form');
	var editCategoryForm = $('#c-js-edit-income-category-form');
	var categoriesTable = $('#c-js-income-categories-table');
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteIncomeCategoryForm = $('#c-modal-delete-form');
	
	var categoryAddedEvent = new ViewEvent('c.category.added',{form: addCategoryForm, type: $EX.CATEGORY_TYPES.INCOME});
	var categoryChangeEvent = new ViewEvent('c.category.change');
	var categoryChangedEvent = new ViewEvent('c.category.changed',editCategoryForm);
	var categoryDeleteEvent = new ViewEvent('c.category.delete');
	var categoryDeletedEvent = new ViewEvent('c.category.deleted');
	
	var updateIncomeCategoriesList = function(data) {
		var oldTbody = $('tbody', categoriesTable);
		var body = document.createElement('tbody');
		
		for(var i = 0; i < data.length; i++) {
			var row = document.createElement('tr');
			
			var tdName = document.createElement('td');
			
			$(tdName).text(data[i].name);
			
			$(row).append(tdName);
			$(row).append(createIncomeCategoryActions(data[i]));
			
			$(body).append(row);
		}
		
		
		$(oldTbody).remove();
		$('thead', categoriesTable).after(body)
	}
	
	var createIncomeCategoryActions = function(categoryData) {
		var tdActions = document.createElement('td');
		
		var seeTxAction = document.createElement('a');
		$(seeTxAction).attr('href', $EX.APP_ROOT + '/settings/categories/' + categoryData.id + '/transactions');
		$(seeTxAction).html('<i class="fa fa-database"></i>');
		$(tdActions).append(seeTxAction);
		
		var editAction = document.createElement('a');
		$(editAction).attr('href', '#');
		$(editAction).html('<i class="fa fa-pencil"></i>');
		$(editAction).data('target', categoryData.id);
		$(tdActions).append(editAction);
		
		$(editAction).click(function(event) {
			event.preventDefault();
			categoryChangeEvent.data = {id: $(editAction).data('target'), form:editCategoryForm};
			incomeCategoriesView.setChanged();
			incomeCategoriesView.notifyObservers(categoryChangeEvent);
		});
		
		var deleteAction = document.createElement('a');
		$(deleteAction).attr('href', '#');
		$(deleteAction).addClass('c-js-delete-action');
		$(deleteAction).html('<i class="fa fa-remove"></i>');
		$(deleteAction).data('target', categoryData.id);
		$(tdActions).append(deleteAction);
		
		$(deleteAction).click(function(event) {
			event.preventDefault();
			categoryDeleteEvent.data = $(deleteAction).data('target');
			incomeCategoriesView.setChanged();
			incomeCategoriesView.notifyObservers(categoryDeleteEvent);
		});
		
		return tdActions;
	}
	
	var observable = new Observable();
	
	var incomeCategoriesView = {
		
		__proto__: observable,
		
		update: function(categoriesModel) {
			categoriesModel.getIncomeCategories()
				.done(function(categoriesData) {
					$('button[type="reset"]', addCategoryForm).click();
					$(deleteModal).modal('hide');
					$('[type="reset"]', editCategoryForm).click();
					$(editCategoryForm).addClass('hidden');
					updateIncomeCategoriesList(categoriesData);
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
		}
	
	};
	
	addCategoryForm.submit(function(event) {
		event.preventDefault();
		incomeCategoriesView.setChanged();
		incomeCategoriesView.notifyObservers(categoryAddedEvent)
	});
	
	editCategoryForm.submit(function(event) {
		event.preventDefault();
		incomeCategoriesView.setChanged();
		incomeCategoriesView.notifyObservers(categoryChangedEvent)
	});
	
	$('[type="reset"]', editCategoryForm).click(function(event) {
		$('[type="hidden"]', editCategoryForm).each(function(undex, hiddenInput) {
			$(hiddenInput).val('');
		});
		editCategoryForm.addClass('hidden');
	});
	
	$('#c-js-cancel-edit-incoming-category-button', editCategoryForm).click(function(event) {
		event.preventDefault();
		categoryChangeEvent.data = {id: $('#id', editCategoryForm).val(), form:editCategoryForm};
		incomeCategoriesView.setChanged();
		incomeCategoriesView.notifyObservers(categoryChangeEvent);
	});
	
	deleteIncomeCategoryForm.submit(function(event) {
		event.preventDefault();
		categoryDeletedEvent.data = $(deleteIncomeCategoryForm);
		incomeCategoriesView.setChanged();
		incomeCategoriesView.notifyObservers(categoryDeletedEvent);
	});
		
	aScope.incomeCategoriesView = incomeCategoriesView;
	
})($EX);
