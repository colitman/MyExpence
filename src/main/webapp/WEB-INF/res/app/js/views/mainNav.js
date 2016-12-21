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
		
		/*var label = $('#c-js-expense-asset-form-group label');
		var select = $('#c-js-expense-asset-form-group select');
		$('input#type', addExpenseFullForm).val($EX.CATEGORY_TYPES.INCOME);
		
		label.html('To');
		label.attr('for', 'to');
		
		select.attr('name', 'to');
		select.attr('id', 'to');*/
	});
	
	addOutgoingButton.click(function(event) {
		event.preventDefault();
		$(mainNavView).trigger('outgoing:add', [addExpenseForm, addExpenseModal]);
		
		/*var label = $('#c-js-expense-asset-form-group label');
		var select = $('#c-js-expense-asset-form-group select');
		
		$('input#type', addExpenseFullForm).val($EX.CATEGORY_TYPES.OUTGOING);
		
		label.html('From');
		label.attr('for', 'from');
		
		select.attr('name', 'from');
		select.attr('id', 'from');*/
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
	
	/*
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
	
	
	var navView = {
		
		update: function(data, message) {
			if('category' === message) {
				updateCategorySelect(data);
				return;
			}
			
			if('assets' === message) {
				var assets = data.assets;
				var currencies = data.currencies;
				
				updateAssetSelect(assets, currencies);
				return;
			}
			
			
		}
	
	};*/
	
})($EX);
