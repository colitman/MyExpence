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
	
	var addAssetForm = $('#c-js-add-asset-form');
	var assetsTable = $('#c-js-added-assets-table');
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteAssetForm = $('#c-modal-delete-form');
	var transferModal = $('#c-js-asset-transfer-modal');
	var transferForm = $('#c-js-asset-transfer-form');
	
	var assetAddedEvent = new ViewEvent('c.asset.added',addAssetForm);
	var assetDeleteEvent = new ViewEvent('c.asset.delete');
	var assetDeletedEvent = new ViewEvent('c.asset.deleted');
	var transferAttemptEvent = new ViewEvent('c.asset.transfer.attempt');
	var transferDoEvent = new ViewEvent('c.asset.transfer.do', transferForm);
	
	var updateAssetTypesSelect = function(data) {
		var select = $('#type', addAssetForm);
		$(select).html('');
		
		for(var i = 0; i < data.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', data[i].name);
			$(option).text(data[i].label);
			
			$(select).append(option);
		}
	}
	
	var updateCurrenciesSelect = function(data) {
		var select = $('#currency', addAssetForm);
		$(select).html('');
		
		for(var i = 0; i < data.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', data[i].id);
			$(option).text(data[i].symbol + ' ' + data[i].name + ' (' + data[i].code + ')');
			if(data[i].defaultCurrency) {
				$(option).prop('selected', 'selected');
			}
			
			$(select).append(option);
		}
	};
	
	var fillInTransferTargets = function(data) {
		var select = $('select#to', transferModal);
		$(select).html('');
		
		for(var i = 0; i < data.length; i++) {
			var option = document.createElement('option');
			
			$(option).attr('value', data[i].id);
			$(option).text(data[i].name);
			
			$(select).append(option);
		}
	};
	
	var updateAssetsList = function(assetData, currencyData) {
		var oldTbody = $('tbody', assetsTable);
		var body = document.createElement('tbody');
		
		for(var i = 0; i < assetData.length; i++) {
			var row = document.createElement('tr');
			
			var tdName = document.createElement('td');
			var tdType = document.createElement('td');
			var tdAmount = document.createElement('td');
			var tdCurrency = document.createElement('td');
			
			$(tdName).text(assetData[i].name);
			$(tdType).text(assetData[i].label);
			$(tdAmount).text(assetData[i].amount);
			
			for(var j = 0; j < currencyData.length; j++) {
				var currency = currencyData[j];
				if(currency.id === assetData[i].currency) {
					$(tdCurrency).text(currency.symbol + ' ' + currency.name + ' (' + currency.code + ')');
					break;
				}
			}
			
			$(row).append(tdName);
			$(row).append(tdType);
			$(row).append(tdAmount);
			$(row).append(tdCurrency);
			$(row).append(createAssetActions(assetData[i]));
			
			if(!assetData[i].showInTotals) {
				$(row).addClass('text-muted');
			}
			
			$(body).append(row);
		}
		
		
		$(oldTbody).remove();
		$('thead', assetsTable).after(body)
	}
	
	var createAssetActions = function(assetData) {
		var tdActions = document.createElement('td');
		
		var seeTxAction = document.createElement('a');
		$(seeTxAction).attr('href', $EX.APP_ROOT + '/settings/assets/' + assetData.id + '/transactions');
		$(seeTxAction).html('<i class="fa fa-database"></i>');
		$(tdActions).append(seeTxAction);
		
		var transferAction = document.createElement('a');
		$(transferAction).attr('href', '#');
		$(transferAction).addClass('c-js-transfer-action');
		$(transferAction).data('sender', assetData.id);
		$(transferAction).data('available', assetData.amount);
		$(transferAction).html('<i class="fa fa-exchange"></i>');
		$(tdActions).append(transferAction);
		
		$(transferAction).click(function(event) {
			event.preventDefault();
			var senderData = {id:$(transferAction).data('sender')}
			$('#from', transferModal).val(senderData.id);
			$(transferForm).data('limit', $(transferAction).data('available'));
			transferAttemptEvent.data = senderData;
			assetsView.setChanged();
			assetsView.notifyObservers(transferAttemptEvent);
		});
		
		var editAction = document.createElement('a');
		$(editAction).attr('href', $EX.APP_ROOT + '/settings/assets/' + assetData.id + '/configure');
		$(editAction).html('<i class="fa fa-cog"></i>');
		$(tdActions).append(editAction);
		
		var deleteAction = document.createElement('a');
		$(deleteAction).attr('href', '#');
		$(deleteAction).addClass('c-js-delete-action');
		$(deleteAction).html('<i class="fa fa-remove"></i>');
		$(deleteAction).data('target', assetData.id);
		$(tdActions).append(deleteAction);
		
		$(deleteAction).click(function(event) {
			event.preventDefault();
			var deleteAssetData = {id:$(deleteAction).data('target')}
			assetDeleteEvent.data = deleteAssetData;
			assetsView.setChanged();
			assetsView.notifyObservers(assetDeleteEvent);
		});
		
		return tdActions;
	}
	
	var initDataTable = function() {
		
		var txDataTable = $('.c-js-datatable').DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			order: [[0,'asc']],
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']],
			destroy: true
		});
	}
	
	var observable = new Observable();
	var currenciesModel = $EX.currenciesModel;
	
	var assetsView = {
		
		__proto__: observable,
		
		update: function(subject, message) {
			
			if('transferAttempt' === message) {
				fillInTransferTargets(subject);
				$(transferModal).modal('show');
				return;
			}
			
			$('button[type="reset"]', addAssetForm).click();
			$(deleteModal).modal('hide');
			$(transferModal).modal('hide');
			
			currenciesModel.getCurrencies()
				.done(function(currenciesData) {
					updateCurrenciesSelect(currenciesData);
					
					subject.getAssets()
						.done(function(assetData) {
							updateAssetsList(assetData, currenciesData);
							initDataTable();
						})
						.fail(function(jqXHR) {
							console.log(jqXHR.responseText);
						});
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
			
			subject.getAssetTypes()
				.done(function(assetTypesData) {
					updateAssetTypesSelect(assetTypesData);
				})
				.fail(function(jqXHR) {
					console.log(jqXHR.responseText);
				});
		}
	};
	
	addAssetForm.submit(function(event) {
		event.preventDefault();
		assetsView.setChanged();
		assetsView.notifyObservers(assetAddedEvent);
	});
	
	deleteAssetForm.submit(function(event) {
		event.preventDefault();
		assetDeletedEvent.data = $(deleteAssetForm);
		assetsView.setChanged();
		assetsView.notifyObservers(assetDeletedEvent);
	});
	
	transferForm.submit(function(event) {
		event.preventDefault();
		assetsView.setChanged();
		assetsView.notifyObservers(transferDoEvent);
	});
	
	$('input#amount', transferForm).keyup(function() {
		var entered = $(this).val();
		var limit = $(transferForm).data('limit');
		if(entered > limit || entered < 0) {
			$('[type="submit"][form="c-js-asset-transfer-form"]').prop('disabled', 'disabled');
		} else {
			$('[type="submit"][form="c-js-asset-transfer-form"]').prop('disabled','');
		}
	});
		
	aScope.assetsView = assetsView;
	
})($EX);
