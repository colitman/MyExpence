"use strict";

/*
Model is an observable object.
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
	
	var observable = new Observable();
	
	var navModel = {
		__proto__: observable,
		
		addExpense: function(expenseData) {
			var _this = this;
			aScope.expenseService.createExpense(expenseData)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		getIncomeCategories: function() {
			var _this = this;
			return aScope.categoryService.getIncomeCategories()
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(data, 'category');
				});
		},
		
		getOutgoingCategories: function() {
			var _this = this;
			return aScope.categoryService.getOutgoingCategories()
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(data, 'category');
				});
		},
		
		getAssets: function() {
			var _this = this;
			return aScope.assetService.getAssets();
		},
		
		getCurrencies: function() {
			var _this = this;
			return aScope.currencyService.getCurrencies();
		}
	
	};
	
	
	aScope.navModel = navModel;
	
})($EX);
