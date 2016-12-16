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
		
		$('.c-js-generated', configureAssetForm).remove();
		$('legend', configureAssetForm).text(assetData.name);
		
		$('#id', configureAssetForm).val(assetData.id);
		$('#type', configureAssetForm).val(assetData.type);
		$('#name', configureAssetForm).val(assetData.name);
		$('#amount', configureAssetForm).val(assetData.amount);
		$('#showInTotals', configureAssetForm).prop('checked', assetData.showInTotals);
		
		if(assetData.type === $EX.ASSET_TYPES.BANK_ACCOUNT ||
			assetData.type === $EX.ASSET_TYPES.DEBIT_CARD ||
			assetData.type === $EX.ASSET_TYPES.CREDIT_CARD) {
			
			var formGroupDiv = $(document.createElement('div'));
			formGroupDiv.addClass('form-group c-js-generated');
			
			var label = $(document.createElement('label'));
			label.attr('for', 'bankName');
			label.addClass('col-sm-3 control-label');
			label.text('Bank Name');
			formGroupDiv.append(label);
			
			var inputDiv = $(document.createElement('div'));
			inputDiv.addClass('col-sm-4');
			formGroupDiv.append(inputDiv);
			
			var bankNameInput = $(document.createElement('input'));
			bankNameInput.attr('type', 'text');
			bankNameInput.addClass('form-control');
			bankNameInput.attr('name', 'bankName');
			bankNameInput.attr('id', 'bankName');
			bankNameInput.attr('placeholder', 'Bank Name');
			inputDiv.append(bankNameInput);
			
			bankNameInput.val(assetData.bankName);
			
			$('.form-group:nth-last-child(3)', configureAssetForm).after(formGroupDiv);
			//$('.form-group.c-js-always-last-but-one', configureAssetForm).before(formGroupDiv);
			
			if(assetData.type === $EX.ASSET_TYPES.DEBIT_CARD ||
				assetData.type === $EX.ASSET_TYPES.CREDIT_CARD) {
				
				var formGroupDiv2 = $(document.createElement('div'));
				formGroupDiv2.addClass('form-group c-js-generated');
				
				var label2 = $(document.createElement('label'));
				label2.attr('for', 'paymentSystem');
				label2.addClass('col-sm-3 control-label');
				label2.text('Payment System');
				formGroupDiv2.append(label2);
				
				var inputDiv2 = $(document.createElement('div'));
				inputDiv2.addClass('col-sm-4');
				formGroupDiv2.append(inputDiv2);
				
				var paymentSystemSelect = $(document.createElement('select'));
				paymentSystemSelect.addClass('form-control');
				paymentSystemSelect.attr('name', 'paymentSystem');
				paymentSystemSelect.attr('id', 'paymentSystem');
				paymentSystemSelect.attr('placeholder', 'Payment System');
				inputDiv2.append(paymentSystemSelect);
				
				$('.form-group:nth-last-child(3)', configureAssetForm).after(formGroupDiv2);
				
				if(assetData.type === $EX.ASSET_TYPES.CREDIT_CARD) {
					
					var formGroupDiv3 = $(document.createElement('div'));
					formGroupDiv3.addClass('form-group c-js-generated');
					
					var label3 = $(document.createElement('label'));
					label3.attr('for', 'limit');
					label3.addClass('col-sm-3 control-label');
					label3.text('Credit Limit');
					formGroupDiv3.append(label3);
					
					var inputDiv3 = $(document.createElement('div'));
					inputDiv3.addClass('col-sm-4');
					formGroupDiv3.append(inputDiv3);
					
					var limitInput = $(document.createElement('input'));
					limitInput.attr('type', 'number');
					limitInput.addClass('form-control');
					limitInput.attr('name', 'limit');
					limitInput.attr('id', 'limit');
					limitInput.attr('placeholder', 'Credit Limit');
					inputDiv3.append(limitInput);
					
					limitInput.val(assetData.limit);
					
					$('.form-group:nth-last-child(3)', configureAssetForm).after(formGroupDiv3);
				}
			}
		}
	}
	
	var observable = new Observable();
	var currenciesModel = $EX.currenciesModel;
	
	var assetView = {
		
		__proto__: observable,
		
		update: function(assetModel, message) {
			
			if('updated' === message) {
				new Alert('success', 'Success!', 'Asset has been successfully updated.').show();
			}
			
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
