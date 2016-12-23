"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	var categoryId = $('meta[name="target_id"]').attr('content');
	
	var categoryTransactionsModel = {
		__proto__: observable,
		
		/**
		 * Reloads model data and notify observers about change
		 */
		updateData: function() {
			var _this = this;
			
			var vm = {
				total: 0,
				listData: [],
				name: ''
			};
			
			_this.getTransactions()
				.done(function(transactionsData) {
					
					vm.total = transactionsData.length;
					vm.listData = transactionsData;
					if(vm.total !== 0) vm.name = transactionsData[0].category;
					
					aScope.VM = vm;
					
					_this.setChanged();
					_this.notifyObservers(aScope.VM, 'transactions:dataUpdated');
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to get transactions.').show();
					console.log(jqXHR.responseText);
				});
		},
		
		getTransactions: function() {
			return aScope.transactionService.getTransactions(
				null,
				null,
				categoryId,
				null,
				null
			);
		}
		
	};
	
	aScope.transactionsModel = categoryTransactionsModel;
	
})($EX);
