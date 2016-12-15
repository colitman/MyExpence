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
	
	var transactionsTable = $('#c-js-transactions-table');
	
	var formatTime = function(millis) {
		var date = new Date(millis);
		return date.toString('dd-MM-yyyy HH:mm:ss');
	};
	
	var updateTransactionsList = function(data) {
		var oldTbody = $('tbody', transactionsTable);
		var body = document.createElement('tbody');
		
		for(var i = 0; i < data.length; i++) {
			var row = document.createElement('tr');
			
			var tdId = document.createElement('td');
			var tdTime = document.createElement('td');
			var tdSender = document.createElement('td');
			var tdRecipient = document.createElement('td');
			var tdCategory = document.createElement('td');
			var tdAmount = document.createElement('td');
			var tdMessage = document.createElement('td');
			
			$(tdId).text(data[i].id);
			$(tdSender).text(data[i].sender);
			$(tdRecipient).text(data[i].recipient);
			$(tdCategory).text(data[i].category);
			$(tdAmount).text(data[i].amount);
			$(tdMessage).text(data[i].message);
			$(tdTime).text(formatTime(data[i].transactionDate));
			$(tdTime).addClass('c-js-no-search');
			
			$(row).append(tdId);
			$(row).append(tdTime);
			$(row).append(tdSender);
			$(row).append(tdRecipient);
			$(row).append(tdCategory);
			$(row).append(tdAmount);
			$(row).append(tdMessage);
			
			$(body).append(row);
		}
		
		
		$(oldTbody).remove();
		$('thead', transactionsTable).after(body);
	}
	
	var initDataTable = function() {
		
		var searchableColumns = $('.c-js-datatable thead th.c-js-searchable');
		searchableColumns.each(function(index, column) {
			$(column).data('index', index);
			var input = $(document.createElement('input'));
			input.attr('type', 'search');
			input.attr('id', index);
			input.addClass('form-control');
			input.attr('placeholder', 'Search...');
			input.data('target', index);
			
			var wrapper = $(document.createElement('div'))
			wrapper.addClass('form-group col-sm-6 col-md-3');
			wrapper.append(input);
			input.before('<label for="'+index+'">' + $(column).text() + '</label>')
			
			$('#c-js-transactions-filters').append(wrapper);
		});
		
		var txDataTable = $('.c-js-datatable').DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			order: [[1,'desc']],
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']],
			destroy: true
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
	
	var observable = new Observable();
	
	var transactionsView = {
		
		__proto__: observable,
		
		update: function(model) {
			
			model.getTransactions()
				.done(function(transactionsData) {
					updateTransactionsList(transactionsData);
					initDataTable();
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
			
			$EX.generateBreadcrumbs();
		}
	
	};
	
	aScope.transactionsView = transactionsView;
	
})($EX);
