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
	
	var updateSearchContext = function() {
		$(transactionsTable).searchable({
			searchField: '#tx-search',
			selector: 'tbody tr',
			childSelector: 'td:not(.c-js-no-search)'
		});
	}
	
	var observable = new Observable();
	
	var transactionsView = {
		
		__proto__: observable,
		
		update: function(model) {
			
			model.getTransactions()
				.done(function(transactionsData) {
					updateTransactionsList(transactionsData);
					updateSearchContext();
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
		}
	
	};
	
	aScope.transactionsView = transactionsView;
	
})($EX);
