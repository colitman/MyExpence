"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var assetView = {
		
		__proto__: observable,
		
		/**
		 * This method is called by observed model when it is changed.
		 *
		 * @param {*} subject - reference to VM object in global application scope with model data
		 * @param {string} [message=undefined] - additional message that model may send
		 */
		update: function(subject, message) {
			hideModals();
			setCurrenciesSelectOptions(subject.currencies);
			fillInAssetConfigureForm(subject.asset);
			setPaymentSystemsSelectOptions(subject.paymentSystems);
			aScope.generateBreadcrumbs(subject.asset.name);
		}
	};
	
	aScope.assetView = assetView;
	
	/* Private fields */
	var configureAssetForm = $('#c-js-configure-asset-form');
	
	/* View events triggers */
	configureAssetForm.submit(function(event) {
		event.preventDefault();
		$(assetView).trigger('asset:changed', [configureAssetForm]);
	});
	
	/* Private methods */
	var hideModals = function() {
		
	};
	
	var setPaymentSystemsSelectOptions = function(paymentSystemsVm) {
		var select = $('#paymentSystem', configureAssetForm);
		
		if(select.length === 0) return;
		
		$(select).html('');
		
		var systems = paymentSystemsVm.listData;
		
		for(var i = 0; i < systems.length; i++) {
			var system = systems[i];
			var option = jQueryDomBuilder.getOption(system.name, system.label, system.name === paymentSystemsVm.currentPaymentSystem.name);
			$(select).append(option);
		}
	}
	
	var setCurrenciesSelectOptions = function(currenciesVm) {
		var select = $('#currency', configureAssetForm);
		$(select).html('');
		
		var currencies = currenciesVm.listData;
		
		for(var i = 0; i < currencies.length; i++) {
			var currency = currencies[i];
			var sCurrency = new Stringifier().stringify([currency.symbol, currency.name, currency.code], '%0 %1 (%2)');
			var option = jQueryDomBuilder.getOption(currency.id, sCurrency);
			$(select).append(option);
		}
	}
	
	var buildBankNameInput = function(asset) {
		var formGroupDiv = jQueryDomBuilder.getDiv('form-group c-js-generated');
		var label = jQueryDomBuilder.getLabel('bankName', 'Bank Name', formGroupDiv);
		label.addClass('col-sm-3 control-label');
		
		var inputDiv = jQueryDomBuilder.getDiv('col-sm-4', formGroupDiv);
		
		var bankNameInput = jQueryDomBuilder.getInput(
			[
				['type', 'text'],
				['name', 'bankName'],
				['id', 'bankName'],
				['placeholder', 'Bank Name']
			],
			asset.bankName,
			inputDiv
		);
		bankNameInput.addClass('form-control');
		
		$('.form-group:nth-last-child(3)', configureAssetForm).after(formGroupDiv);
	};
	
	var buildPaymentSystemInput = function() {
		var formGroupDiv = jQueryDomBuilder.getDiv('form-group c-js-generated');
		var label = jQueryDomBuilder.getLabel('paymentSystem', 'Payment System', formGroupDiv);
		label.addClass('col-sm-3 control-label');
		
		var inputDiv = jQueryDomBuilder.getDiv('col-sm-4', formGroupDiv);
		
		var paymentSystemSelect = jQueryDomBuilder.getSelect(
			[
				['name', 'paymentSystem'],
				['id', 'paymentSystem'],
				['placeholder', 'Payment System']
			],
			inputDiv
		);
		paymentSystemSelect.addClass('form-control');
		
		$('.form-group:nth-last-child(3)', configureAssetForm).after(formGroupDiv);
	};
	
	var buildLimitInput = function(asset) {
		var formGroupDiv = jQueryDomBuilder.getDiv('form-group c-js-generated');
		var label = jQueryDomBuilder.getLabel('limit', 'Credit Limit', formGroupDiv);
		label.addClass('col-sm-3 control-label');
		
		var inputDiv = jQueryDomBuilder.getDiv('col-sm-4', formGroupDiv);
		
		var limitInput = jQueryDomBuilder.getInput(
			[
				['type', 'number'],
				['step', 'any'],
				['name', 'limit'],
				['id', 'limit'],
				['placeholder', 'Credit Limit']
			],
			new BigNumber(asset.limit).toNumber(),
			inputDiv
		);
		limitInput.addClass('form-control');
		
		$('.form-group:nth-last-child(3)', configureAssetForm).after(formGroupDiv);
	};
	
	var fillInAssetConfigureForm = function(assetData) {
		
		$('.c-js-generated', configureAssetForm).remove();
		$('legend', configureAssetForm).text(assetData.name);
		
		$('#id', configureAssetForm).val(assetData.id);
		$('#type', configureAssetForm).val(assetData.type.name);
		$('#name', configureAssetForm).val(assetData.name);
		$('#amount', configureAssetForm).val(new BigNumber(assetData.amount).toNumber());
		$('#showInTotals', configureAssetForm).prop('checked', assetData.showInTotals);
		
		$('#currency option[value="' + assetData.currency.id + '"]', configureAssetForm).prop('selected', 'selected');
		
		if(assetData.type.name === $EX.ASSET_TYPES.BANK_ACCOUNT ||
			assetData.type.name === $EX.ASSET_TYPES.DEBIT_CARD ||
			assetData.type.name === $EX.ASSET_TYPES.CREDIT_CARD) {
			
			buildBankNameInput(assetData);
			
			if(assetData.type.name === $EX.ASSET_TYPES.DEBIT_CARD ||
				assetData.type.name === $EX.ASSET_TYPES.CREDIT_CARD) {
				
				buildPaymentSystemInput();
				
				if(assetData.type.name === $EX.ASSET_TYPES.CREDIT_CARD) {
					
					buildLimitInput(assetData);
				}
			}
		}
	}
})($EX);
