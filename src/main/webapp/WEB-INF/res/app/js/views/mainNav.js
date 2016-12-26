"use strict";

(function(aScope, undefined){
	
	var observer = new Observer();
	
	var mainNavView = {
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
		}
		
	};
	
	aScope.mainNavView = mainNavView;
	
	/* Private fields */
	var addIncomeButton = $('#c-js-add-income-button');
	var addOutgoingButton = $('#c-js-add-outgoing-button');
	var addExpenseForm = $('#c-js-add-expense-form');
	
	var addExpenseModal = $('#c-js-add-expense-modal');
	var addExpenseFullForm = $('#c-js-add-expense-full-form');
	
	/* View events triggers */
	addIncomeButton.click(function(event) {
		event.preventDefault();
		$(mainNavView).trigger('income:add', [addExpenseForm, addExpenseModal]);
	});
	
	addOutgoingButton.click(function(event) {
		event.preventDefault();
		$(mainNavView).trigger('outgoing:add', [addExpenseForm, addExpenseModal]);
	});
	
	addExpenseFullForm.submit(function(event) {
		event.preventDefault();
		$(mainNavView).trigger('expense:added', [addExpenseFullForm]);
	});
	
	/* Private methods */
	var resetForms = function() {
		
	};
	
	var hideModals = function() {
		$(addExpenseModal).modal('hide');
	};
	
})($EX);
