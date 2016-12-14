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
	
	var addExpenseForm = $('#c-js-add-expense-form');
	var addIncomeButton = $('#c-js-add-income-button');
	var addOutgoingButton = $('#c-js-add-outgoing-button');
	
	var addExpenseModal = $('#c-js-add-expense-modal');
	var addExpenseFullForm = $('#c-js-add-expense-full-form');
	
	var incomeAddEvent = new ViewEvent('c.income.add',{form: addExpenseForm, modal: addExpenseModal});
	var outgoingAddEvent = new ViewEvent('c.outgoing.add',{form: addExpenseForm, modal: addExpenseModal});
	var expenseAddedEvent = new ViewEvent('c.expense.added', addExpenseFullForm);
	
	var updateAssetSelect = function(assets, currencies) {
		var select = $('#c-js-expense-asset-form-group select');
		$(select).html('');
		
		for(var i = 0; i < assets.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', assets[i].id);
			
			for(var j= 0; j < currencies.length; j++) {
				if(currencies[j].id === assets[i].currency) {
					$(option).text(assets[i].name + ' (' + currencies[j].symbol + ' ' + currencies[j].code + ')');
				}
			}
						
			$(select).append(option);
		}
	}
	
	var updateCategorySelect = function(data) {
		var select = $('#c-js-expense-category-form-group select');
		$(select).html('');
		
		for(var i = 0; i < data.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', data[i].id);
			$(option).text(data[i].name);
			
			$(select).append(option);
		}
	}
	
	var observable = new Observable();
	
	var navView = {
		
		__proto__: observable,
		
		update: function(data, message) {
			if('category' === message) {
				updateCategorySelect(data);
			}
			
			if('assets' === message) {
				var assets = data.assets;
				var currencies = data.currencies;
				
				updateAssetSelect(assets, currencies);
			}
		}
	
	};
	
	addIncomeButton.click(function(event) {
		event.preventDefault();
		
		var label = $('#c-js-expense-asset-form-group label');
		var select = $('#c-js-expense-asset-form-group select');
		$('input#type', addExpenseFullForm).val($EX.CATEGORY_TYPES.INCOME);
		
		label.html('To');
		label.attr('for', 'to');
		
		select.attr('name', 'to');
		select.attr('id', 'to');
		
		navView.setChanged();
		navView.notifyObservers(incomeAddEvent);
	});
	
	addOutgoingButton.click(function(event) {
		event.preventDefault();
		
		var label = $('#c-js-expense-asset-form-group label');
		var select = $('#c-js-expense-asset-form-group select');
		
		$('input#type', addExpenseFullForm).val($EX.CATEGORY_TYPES.OUTGOING);
		
		label.html('From');
		label.attr('for', 'from');
		
		select.attr('name', 'from');
		select.attr('id', 'from');
		
		navView.setChanged();
		navView.notifyObservers(outgoingAddEvent);
	});
	
	addExpenseFullForm.submit(function(event) {
		event.preventDefault();
		navView.setChanged();
		navView.notifyObservers(expenseAddedEvent);
		
	});
		
	aScope.navView = navView;
	
})($EX);
