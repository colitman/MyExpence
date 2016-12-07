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
	
	var currenciesModel = {
		__proto__: observable,
		
		getCurrencies: function() {
			return aScope.curencyService.getCurrencies();
		},
		
		getCurrency: function(id) {
			return aScope.curencyService.getCurrencyById(id);
		},
		
		addCurrency: function(currencyData) {
			var _this = this;
			aScope.curencyService.createCurrency(currencyData)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		updateCurrency: function(currencyData) {
			var _this = this;
			aScope.curencyService.updateCurrency(currencyData)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		setDefaultCurrency: function(id) {
			var _this = this;
			aScope.curencyService.setDefaultCurrency(id)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		deleteCurrency: function(id) {
			var _this = this;
			return aScope.curencyService.deleteCurrency(id)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				});
		}
	
	};
	
	
	aScope.currenciesModel = currenciesModel;
	
})($EX);
