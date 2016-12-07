"use strict";

/*
View is an observer object.
It should expose the following public access interfaces:
- update(object)
 
 View is also an observable object.
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
	
	var configureAssetForm = $('#c-js-configure-asset-form');
	
	var assetChangedEvent = new ViewEvent('c.asset.changed',configureAssetForm);
	
	var updatePaymentSystemsSelect = function(paymentSystemsData, currentSystem) {
		var select = $('#paymentSystem', configureAssetForm);
		$(select).html('');
		
		for(var i = 0; i < paymentSystemsData.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', paymentSystemsData[i].name);
			$(option).text(paymentSystemsData[i].label);
			
			if(paymentSystemsData[i].name === currentSystem) {
				$(option).prop('selected', 'selected');
			}
			
			$(select).append(option);
		}
	}
	
	var updateCurrenciesSelect = function(currencyData, currentCurrency) {
		var select = $('#currency', configureAssetForm);
		$(select).html('');
		
		for(var i = 0; i < currencyData.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', currencyData[i].id);
			$(option).text(currencyData[i].symbol + ' ' + currencyData[i].name + ' (' + currencyData[i].code + ')');
			
			if(currencyData[i].id === currentCurrency) {
				$(option).prop('selected', 'selected');
			}
			
			$(select).append(option);
		}
	}
	
	var fillInAssetConfigureForm = function(assetData) {
		$('#id', configureAssetForm).val(assetData.id);
		$('#type', configureAssetForm).val(assetData.type);
		$('#name', configureAssetForm).val(assetData.name);
		$('#amount', configureAssetForm).val(assetData.amount);
	}
	
	var observable = new Observable();
	var currenciesModel = $EX.currenciesModel;
	
	var assetView = {
		
		__proto__: observable,
		
		update: function(assetModel) {
			
			assetModel.getAsset()
				.done(function(assetData) {
					
					fillInAssetConfigureForm(assetData);
					
					currenciesModel.getCurrencies()
						.done(function(currenciesData) {
							updateCurrenciesSelect(currenciesData, assetData.currency);
						})
						.fail(function(jqXHR) {
							console.log(jqXHR.responseText);
						});
					
					assetModel.getPaymentSystems()
						.done(function(paymentSystemsData) {
							updatePaymentSystemsSelect(paymentSystemsData, assetData.paymentSystem);
						})
						.fail(function(jqXHR) {
							console.log(jqXHR.responseText);
						});
					
					$EX.generateBreadcrumbs(assetData.name);
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
			
		}
	};
	
	configureAssetForm.submit(function(event) {
		event.preventDefault();
		assetView.setChanged();
		assetView.notifyObservers(assetChangedEvent)
	});
		
	aScope.assetView = assetView;
	
})($EX);
