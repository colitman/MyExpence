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
				listData: [],
				name:''
			};
			
			_this.getTransactions()
				.done(function(transactionsData) {
					
					vm.total = transactionsData.length;
					vm.listData = transactionsData;
					
					for(var i = 0; i < transactionsData.length; i++) {
						var tx = transactionsData[i];
						if(tx.recipient != undefined && tx.recipient.trim().length !== 0) {
							vm.name = tx.recipient;
							break;
						}
					}
					
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
