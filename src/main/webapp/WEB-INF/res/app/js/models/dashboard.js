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
		},
		
		getIncomeTrendData: function(startDate, endDate, period) {
			if(startDate == null && endDate == null && period == null) {
				startDate = Date.today().set({day:1, hour:0, minute:0, second:0});
				startDate.add(-6).months();
				
				endDate = Date.today().moveToLastDayOfMonth().add(1).days();
				
				period = 'monthly';
			}
			
			var _this = this;
			
			aScope.transactionService.getTransactions(null, null, null, startDate.getTime(), endDate.getTime(), null)
				.done(function(data) {
					var trendData = buildIncomeTrendData(data, period);
					_this.setChanged();
					_this.notifyObservers(trendData, 'c.trend.income.update');
				});
		}
	
	};
	
	var buildIncomeTrendData = function(transactionsData, period) {
		if(period === 'monthly') {
			return buildIncomeMonthlyTrendData(transactionsData);
		}
		return {};
	}
	
	var buildIncomeMonthlyTrendData = function(data) {
		var result = new DashboardTrendData();
		var txMonths = new Map();
		
		for(var i = 0; i < data.length; i++) {
			var tx = data[i];
			var txDate = new Date(tx.transactionDate);
			var monthName = txDate.getMonthName();
			
			if(txMonths.has(monthName)) {
				
			} else {
				txMonths.set(monthName, new BigNumber(tx.amount));
				txMonths.get(monthName).push();
			}
			
		}
		
		return result;
	}
	
	var buildStatsByCurrency = function(currenciesData, assetsData) {
		var result = [];
		
		for(var c = 0; c < currenciesData.length; c++) {
			var stat = new DashboardCurrencyStat();
					
			var currency = currenciesData[c];
			stat.currency = currency;
			
			var currencyAssets = assetsData.filter(function(asset) {
				return asset.currency === currency.id && asset.showInTotals;
			});
			
			if(currencyAssets.length === 0) {
				continue;
			}
			
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
