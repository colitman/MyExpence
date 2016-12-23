"use strict";

(function(aScope, undefined){
	
	var observer = new Observer();
	
	var transactionsView = {
		
		__proto__: observer,
		
		/**
		 * This method is called by observed model when it is changed.
		 *
		 * @param {*} subject - reference to VM object in global application scope with model data
		 * @param {string} [message=undefined] - additional message that model may send
		 */
		update: function(subject, message) {
			
			buildTransactionsList(subject);
			initDataTable();
			$EX.generateBreadcrumbs();
		}
		
	};
	
	aScope.transactionsView = transactionsView;
	
	/* Private fields */
	var transactionsTable = $('#c-js-transactions-table');
	
	/* Private methods */
	var formatTime = function(millis) {
		var date = new Date(millis);
		return date.toString('dd-MM-yyyy HH:mm:ss');
	};
	
	var buildTransactionsList = function(vm) {
		
		var transactions = vm.listData;
		
		$('.c-js-datatable').each(function(index, table) {
			if ( $.fn.dataTable.isDataTable( table ) ) {
				$(table).DataTable().destroy();
			}
		});
		
		var body = $('tbody', transactionsTable);
		body.html('');
		
		for(var i = 0; i < transactions.length; i++) {
			var transaction = transactions[i];
			
			var row = jQueryDomBuilder.getTableRow(
				[
					transaction.id,
					formatTime(transaction.transactionDate),
					transaction.sender,
					transaction.recipient,
					transaction.category,
					new BigNumber(transaction.amount),
					transaction.message
				],
				body
			);
		}
	};
	
	var initDataTable = function() {
		
		var searchableColumns = $('.c-js-datatable thead th.c-js-searchable');
		searchableColumns.each(function(index, column) {
			$(column).data('index', index);
			var wrapper = jQueryDomBuilder.getDiv('form-group col-sm-6 col-md-3', $('#c-js-transactions-filters'));
			var input = jQueryDomBuilder.getInput(
				[
					['type', 'search'],
					['id', index],
					['placeholder', 'Search...']
				],
				'',
				wrapper
			);
			input.addClass('form-control');
			input.data('target', index);
			jQueryDomBuilder.getLabel(index, $(column).text(), wrapper);
		});
		
		var txDataTable = $('.c-js-datatable').DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			order: [[1,'desc']],
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']]
		});
		
		txDataTable.columns(searchableColumns).every(function() {
			var column = this;
			var index = $(column.header()).data('index');
			var searchField = $('#c-js-transactions-filters input#' + index);
			
			searchField.on('keyup change', function() {
				var term = searchField.val();
				var colsearch = column.search();
				
				if(colsearch !== term) {
					var result = column.search(term);
					result.draw();
				}
			});
			
		});
	}
	
	
	
})($EX);
