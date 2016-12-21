"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var assetsModel = {
		__proto__: observable,
		
		updateData: function() {
			var _this = this;
			_this.getAssets()
				.done(function(assetsData) {
					var vm = {};
					vm.total = assetsData.length;
					vm.listData = assetsData;
					
					aScope.VM = vm;
					
					_this.setChanged();
					_this.notifyObservers(aScope.VM, 'assets:dataUpdated');
				});
		},
		
		getAssets: function() {
			return aScope.assetService.getAssets();
		},
		
		getAssetTypes: function() {
			return aScope.assetService.getAssetTypes();
		},
		
		getAsset: function(id) {
			return aScope.assetService.getAssetById(id);
		},
		
		addAsset: function(assetData) {
			var _this = this;
			aScope.assetService.createAsset(assetData)
				.done(function(data) {
					_this.updateData();
				});
		},
		
		deleteAsset: function(id) {
			var _this = this;
			return aScope.assetService.deleteAsset(id)
				.done(function(data) {
					_this.updateData();
				});
		},
		
		transfer: function(expenseData) {
			var _this = this;
			aScope.assetService.transfer(expenseData)
				.done(function(data) {
					_this.updateData();
				});
		}
	
	};
	
	
	aScope.assetsModel = assetsModel;
	
})($EX);
