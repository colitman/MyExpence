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
	
	var observers = [];
	var changed = false;
	var _this = this;
	
	var countObservers = function() {
		return observers.length;
	};
	
	var isChanged = function() {
		return changed;
	};
	
	var setChanged = function() {
		changed = true;
	};
	
	var clearChanged = function() {
		changed = false;
	};
	
	var deleteObservers = function() {
		observers.length = 0;
	};
	
	var notifyObservers = function() {
		
		if(!isChanged()) {
			return;
		}
		
		for(var i = 0; i < observers.length; i++) {
			var observer = observers[i];
			observer.update(_this);
		}
		
		clearChanged();
	};
	
	var currenciesModel = {
		
		subscribe: function(observer){
			observers.push(observer);
		},
		
		getCurrencies: function() {
			return aScope.curencyService.getCurrencies();
		},
		
		getCurrency: function(id) {
			return aScope.curencyService.getCurrencyById(id);
		},
		
		addCurrency: function(currencyData) {
			aScope.curencyService.createCurrency(currencyData)
				.done(function(data) {
					setChanged();
					notifyObservers();
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		updateCurrency: function(currencyData) {
			aScope.curencyService.updateCurrency(currencyData)
				.done(function(data) {
					setChanged();
					notifyObservers();
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		setDefaultCurrency: function(id) {
			aScope.curencyService.setDefaultCurrency(id)
				.done(function(data) {
					setChanged();
					notifyObservers();
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		deleteCurrency: function(id) {
			aScope.curencyService.deleteCurrency(id)
				.done(function(data) {
					setChanged();
					notifyObservers();
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		}
	
	};
	
	
	aScope.currenciesModel = currenciesModel;
	
})($EX);
