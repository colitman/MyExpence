"use strict";

"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	var assetId = $('meta[name="target_id"]').attr('content');
	
	var assetTransactionsModel = {
		__proto__: observable,
		
		/**
		 * Reloads model data and notify observers about change
		 */
		updateData: function() {
			var _this = this;
			
			var vm = {
				total: 0,
				listData: []
			};
			
			_this.getTransactions()
				.done(function(transactionsData) {
					
					vm.total = transactionsData.length;
					vm.listData = transactionsData;
					
					aScope.VM = vm;
					
					_this.setChanged();
					_this.notifyObservers(aScope.VM, 'transactions:dataUpdated');
				});
		},
		
		getTransactions: function() {
			return aScope.transactionService.getTransactions(
				assetId,
				assetId,
				null,
				null,
				null,
				true
			);
		}
		
	};
	
	aScope.transactionsModel = assetTransactionsModel;
	
})($EX);
