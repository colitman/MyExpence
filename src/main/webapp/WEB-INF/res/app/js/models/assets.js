"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var assetsModel = {
		__proto__: observable,
		
		updateData: function() {
			var _this = this;
			
			var vm = {
				assetTypes:{
					total:0,
					listData:[]
				},
				currencies: {
					total:0,
					listData:[],
					defaultCurrency:{}
				},
				assets: {
					total:0,
					listData:[]
				}
			};
			
			_this.getAssetTypes()
				.done(function(assetTypesData) {
					vm.assetTypes.total = assetTypesData.length;
					vm.assetTypes.listData = assetTypesData;
					
					_this.getCurrencies()
						.done(function(currenciesData) {
							vm.currencies.total = currenciesData.length;
							vm.currencies.listData = currenciesData;
							vm.currencies.defaultCurrency = currenciesData.filter(function(currency) {
								return currency.defaultCurrency;
							})[0];
							
							_this.getAssets()
								.done(function(assetsData) {
									vm.assets.total = assetsData.length;
									vm.assets.listData = assetsData;
									
									aScope.VM = vm;
									
									_this.setChanged();
									_this.notifyObservers(aScope.VM, 'assets:dataUpdated');
								});
						});
				});
		},
		
		getAssets: function() {
			return aScope.assetService.getAssets();
		},
		
		/**
		 * Gets a list of currencies from DB
		 * @returns {jqXHR} promise with an array of {@link Currency} objects.
		 */
		getCurrencies: function() {
			return aScope.currencyService.getCurrencies();
		},
		
		getAssetTypes: function() {
			return aScope.assetService.getAssetTypes();
		},
		
		getAsset: function(id) {
			return aScope.assetService.getAssetById(id);
		},
		
		addAsset: function(assetData) {
			var _this = this;
			return aScope.assetService.createAsset(assetData)
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
			return aScope.assetService.transfer(expenseData)
				.done(function(data) {
					_this.updateData();
				});
		}
	
	};
	
	
	aScope.assetsModel = assetsModel;
	
})($EX);
