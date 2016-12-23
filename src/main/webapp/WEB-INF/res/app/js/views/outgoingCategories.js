"use strict";

(function(aScope, undefined){
	
	var observer = new Observer();
	
	var outgoingCategoriesView = {
		
		__proto__: observer,
		
		/**
		 * This method is called by observed model when it is changed.
		 *
		 * @param {*} subject - reference to VM object in global application scope with model data
		 * @param {string} [message=undefined] - additional message that model may send
		 */
		update: function(subject, message) {
			resetForms();
			hideModals();
			buildOutgoingCategoriesList(subject);
			initDataTable();
		}
		
	};
	
	aScope.outgoingCategoriesView = outgoingCategoriesView;
	
	/* Private fields */
	var addCategoryForm = $('#c-js-add-outgoing-category-form');
	var editCategoryForm = $('#c-js-edit-outgoing-category-form');
	var categoriesTable = $('#c-js-outgoing-categories-table');
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteOutgoingCategoryForm = $('#c-modal-delete-form');
	
	/* View events triggers */
	addCategoryForm.submit(function(event) {
		event.preventDefault();
		$(outgoingCategoriesView).trigger('category:added', [$EX.CATEGORY_TYPES.OUTGOING, addCategoryForm]);
	});
	
	editCategoryForm.submit(function(event) {
		event.preventDefault();
		$(outgoingCategoriesView).trigger('category:changed', [editCategoryForm]);
	});
	
	// TODO think on better solution for mitigating the double delete request
	/*deleteOutgoingCategoryForm.submit(function(event) {
		event.preventDefault();
		$(outgoingCategoriesView).trigger('category:deleted', [$('#id', deleteOutgoingCategoryForm).val(), deleteModal])
	});*/
	
	$('[type="reset"]', editCategoryForm).click(function(event) {
		$('[type="hidden"]', editCategoryForm).each(function(index, hiddenInput) {
			$(hiddenInput).val('');
		});
		editCategoryForm.addClass('hidden');
	});
	
	$('#c-js-cancel-edit-outgoing-category-button', editCategoryForm).click(function(event) {
		event.preventDefault();
		$(outgoingCategoriesView).trigger('category:change', [$('#id', editCategoryForm).val(), editCategoryForm]);
	});
	
	/* Private methods */
	var resetForms = function() {
		$('button[type="reset"]', addCategoryForm).click();
		$('[type="reset"]', editCategoryForm).click();
		$(editCategoryForm).addClass('hidden');
	};
	
	var hideModals = function() {
		$(deleteModal).modal('hide');
	};
	
	var initDataTable = function() {
		
		var txDataTable = $('#c-js-outgoing-categories .c-js-datatable').DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			order: [[0,'asc']],
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']]
		});
	};
	
	var buildOutgoingCategoriesList = function(vm) {
		var categories = vm.outgoing.listData;
		
		$('#c-js-outgoing-categories .c-js-datatable').each(function(index, table) {
			if ( $.fn.dataTable.isDataTable( table ) ) {
				$(table).DataTable().destroy();
			}
		});
		
		var body = $('tbody', categoriesTable);
		body.html('');
		
		for(var i = 0; i < categories.length; i++) {
			var category = categories[i];
			
			var row = jQueryDomBuilder.getTableRow(
				[
					category.name,
					''
				],
				body
			);
			
			var actionsColumn = row.find('td:last');
			var seeTxAction = jQueryDomBuilder.getAnchor(
				$EX.APP_ROOT + '/settings/categories/' + category.id + '/transactions',
				'',
				[
					['target',category.id]
				],
				actionsColumn
			);
			$(seeTxAction).html('<i class="fa fa-database"></i>');
			
			var editAction = jQueryDomBuilder.getAnchor(
				'#',
				'',
				[
					['target',category.id]
				],
				actionsColumn
			);
			editAction.html('<i class="fa fa-pencil"></i>');
			
			var deleteAction = jQueryDomBuilder.getAnchor(
				'#',
				'',
				[
					['target',category.id]
				],
				actionsColumn
			);
			deleteAction.html('<i class="fa fa-remove"></i>');
			
			$(editAction).click(function(event) {
				event.preventDefault();
				$(outgoingCategoriesView).trigger('category:change', [$(this).data('target'), editCategoryForm]);
			});
			
			
			
			$(deleteAction).click(function(event) {
				event.preventDefault();
				$(outgoingCategoriesView).trigger('category:delete', [$(this).data('target'), deleteModal]);
			});
		}
	};
	
})($EX);
