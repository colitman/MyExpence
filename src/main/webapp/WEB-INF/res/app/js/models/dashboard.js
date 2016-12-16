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
	
	var dashboardModel = {
		__proto__: observable,
		
		getStatsByCurrencies: function() {
			var _this = this;
			aScope.assetService.getAssets()
				.done(function(assetsData) {
					aScope.currencyService.getCurrencies()
						.done(function(currenciesData) {
							var statsByCurrency = buildStatsByCurrency(currenciesData, assetsData);
							_this.setChanged();
							_this.notifyObservers(statsByCurrency, 'c.currency.stats.update');
						})
				});
		}
	
	};
	
	var buildStatsByCurrency = function(currenciesData, assetsData) {
		var result = [];
		
		for(var c = 0; c < currenciesData.length; c++) {
			var stat = new DashboardCurrencyStat();
					
			var currency = currenciesData[c];
			stat.currency = currency;
			
			var currencyAssets = assetsData.filter(function(asset) {
				return asset.currency === currency.id;
			});
			
			for(var a = 0; a < currencyAssets.length; a++) {
				var currencyAsset = currencyAssets[a];
				stat.assets.push(currencyAsset);
				
				stat.totalAmountForCurrency = stat.totalAmountForCurrency.plus(currencyAsset.amount);
			}
			
			result.push(stat);
		}
		
		return result;
		
	}
	
	
	aScope.dashboardModel = dashboardModel;
	
})($EX);
