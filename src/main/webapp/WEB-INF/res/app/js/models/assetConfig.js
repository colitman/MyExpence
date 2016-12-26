"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var assetModel = {
		__proto__: observable,
		
		updateData: function() {
			var _this = this;
			
			var vm = {
				asset:{},
				currencies: {
					total:0,
					listData:[]
				},
				paymentSystems: {
					total:0,
					listData:[],
					currentPaymentSystem:{}
				}
			};
			
			_this.getAsset()
				.done(function(assetData) {
					vm.asset = assetData;
					
					_this.getPaymentSystems()
						.done(function(paymentSystemsData) {
							vm.paymentSystems.total = paymentSystemsData.length;
							vm.paymentSystems.listData = paymentSystemsData;
							vm.paymentSystems.currentPaymentSystem = assetData.paymentSystem;
							
							aScope.currencyService.getCurrencies()
								.done(function(currenciesData) {
									vm.currencies.total = currenciesData.length;
									vm.currencies.listData = currenciesData;
									
									aScope.VM = vm;
									
									_this.setChanged();
									_this.notifyObservers(aScope.VM, 'asset:dataUpdated');
								})
								.fail(function(jqXHR, textStatus, errorThrown) {
									new Alert('danger', 'Oops!', 'Failed to get currencies.').show();
									console.log(jqXHR.responseText);
								});
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							new Alert('danger', 'Oops!', 'Failed to get payment systems.').show();
							console.log(jqXHR.responseText);
						});
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to get asset.').show();
					console.log(jqXHR.responseText);
				});
		},
		
		getPaymentSystems: function() {
			return aScope.paymentSystemService.getPaymentSystems();
		},
		
		getAsset: function() {
			var id = $('meta[name="target_id"]').attr('content');
			return aScope.assetService.getAssetById(id);
		},
		
		updateAsset: function(assetData) {
			var _this = this;
			return aScope.assetService.updateAsset(assetData)
				.done(function(data) {
					_this.updateData();
					new Alert('success', 'Success!', 'Asset has been successfully updated.').show();
				});
		}
	
	};
	
	
	aScope.assetModel = assetModel;
	
})($EX);
