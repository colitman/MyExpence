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
	
	var addCategoryForm = $('#c-js-add-outgoing-category-form');
	var editCategoryForm = $('#c-js-edit-outgoing-category-form');
	var categoriesTable = $('#c-js-outgoing-categories-table');
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteOutgoingCategoryForm = $('#c-modal-delete-form');
	
	var categoryAddedEvent = new ViewEvent('c.category.added',{form: addCategoryForm, type: $EX.CATEGORY_TYPES.OUTGOING});
	var categoryChangeEvent = new ViewEvent('c.category.change');
	var categoryChangedEvent = new ViewEvent('c.category.changed',editCategoryForm);
	var categoryDeleteEvent = new ViewEvent('c.category.delete');
	var categoryDeletedEvent = new ViewEvent('c.category.deleted');
	
	var updateOutgoingCategoriesList = function(data) {
		var oldTbody = $('tbody', categoriesTable);
		var body = document.createElement('tbody');
		
		for(var i = 0; i < data.length; i++) {
			var row = document.createElement('tr');
			
			var tdName = document.createElement('td');
			
			$(tdName).text(data[i].name);
			
			$(row).append(tdName);
			$(row).append(createOutgoingCategoryActions(data[i]));
			
			$(body).append(row);
		}
		
		
		$(oldTbody).remove();
		$('thead', categoriesTable).after(body)
	}
	
	var createOutgoingCategoryActions = function(categoryData) {
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
			outgoingCategoriesView.setChanged();
			outgoingCategoriesView.notifyObservers(categoryChangeEvent);
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
			outgoingCategoriesView.setChanged();
			outgoingCategoriesView.notifyObservers(categoryDeleteEvent);
		});
		
		return tdActions;
	}
	
	var initDataTable = function() {
		
		var txDataTable = $('.c-js-datatable').DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			order: [[0,'asc']],
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']],
			destroy: true
		});
	}
	
	var observable = new Observable();
	
	var outgoingCategoriesView = {
		
		__proto__: observable,
		
		update: function(categoriesModel) {
			categoriesModel.getOutgoingCategories()
				.done(function(categoriesData) {
					$('button[type="reset"]', addCategoryForm).click();
					$(deleteModal).modal('hide');
					$('[type="reset"]', editCategoryForm).click();
					$(editCategoryForm).addClass('hidden');
					updateOutgoingCategoriesList(categoriesData);
					initDataTable();
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
		}
	
	};
	
	addCategoryForm.submit(function(event) {
		event.preventDefault();
		outgoingCategoriesView.setChanged();
		outgoingCategoriesView.notifyObservers(categoryAddedEvent)
	});
	
	editCategoryForm.submit(function(event) {
		event.preventDefault();
		outgoingCategoriesView.setChanged();
		outgoingCategoriesView.notifyObservers(categoryChangedEvent)
	});
	
	$('[type="reset"]', editCategoryForm).click(function(event) {
		$('[type="hidden"]', editCategoryForm).each(function(undex, hiddenInput) {
			$(hiddenInput).val('');
		});
		editCategoryForm.addClass('hidden');
	});
	
	$('#c-js-cancel-edit-outgoing-category-button', editCategoryForm).click(function(event) {
		event.preventDefault();
		categoryChangeEvent.data = {id: $('#id', editCategoryForm).val(), form:editCategoryForm};
		outgoingCategoriesView.setChanged();
		outgoingCategoriesView.notifyObservers(categoryChangeEvent);
	});
	
	deleteOutgoingCategoryForm.submit(function(event) {
		event.preventDefault();
		categoryDeletedEvent.data = $(deleteOutgoingCategoryForm);
		outgoingCategoriesView.setChanged();
		outgoingCategoriesView.notifyObservers(categoryDeletedEvent);
	});
		
	aScope.outgoingCategoriesView = outgoingCategoriesView;
	
})($EX);
