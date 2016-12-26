"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var dashboardModel = {
		__proto__: observable,
		
		updateData: function() {
			var _this = this;
			
			var vm = {
				statsByCurrency: {
					total:0,
					listData:[]
				}
			}
			
			aScope.assetService.getAssets()
				.done(function(assetsData) {
					var statsByCurrency = buildStatsByCurrency(
						assetsData.filter(function(asset) {
							return asset.showInTotals
						})
					);
					vm.statsByCurrency.total = statsByCurrency.length;
					vm.statsByCurrency.listData = statsByCurrency;
					
					aScope.VM = vm;
					
					_this.setChanged();
					_this.notifyObservers(aScope.VM, 'dashboard:dataUpdated');
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to get assets.').show();
					console.log(jqXHR.responseText);
				});
		}
	
	};
	
	/* Private methods */
	var buildStatsByCurrency = function(assetsData) {
		var result = [];
		var map = new jsMap();
		
		for(var i = 0; i < assetsData.length; i++) {
			var asset = assetsData[i];
			var assetCurrency = asset.currency;
			var stat = null;
			
			if(!map.hasKey(assetCurrency.id)) {
				stat = new DashboardCurrencyStat();
				stat.currency = assetCurrency;
				map.put(assetCurrency.id, stat);
				result.push(stat);
			} else {
				stat = map.get(assetCurrency.id);
			}
			
			stat.assets.push(asset);
			stat.totalAmountForCurrency = stat.totalAmountForCurrency.plus(new BigNumber(asset.amount));
		}
		
		return result;
		
	}
	
	
	aScope.dashboardModel = dashboardModel;
	
})($EX);
