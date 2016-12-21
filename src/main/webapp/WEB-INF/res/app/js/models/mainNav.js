"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var navModel = {
		__proto__: observable,
		
		updateData: function() {
			var _this = this;
			
			var vm = {
				
			};
			
			aScope.VM.misc.mainNav = vm;
			
			_this.setChanged();
			_this.notifyObservers(aScope.VM, 'misc:mainNavDataUpdated');
		},
		
		addExpense: function(expenseData) {
			var _this = this;
			aScope.expenseService.createExpense(expenseData)
				.done(function(data) {
					_this.updateData();
				});
		},
		
		getIncomeCategories: function() {
			var _this = this;
			return aScope.categoryService.getIncomeCategories();
		},
		
		getOutgoingCategories: function() {
			var _this = this;
			return aScope.categoryService.getOutgoingCategories();
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
