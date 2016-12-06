'use strict';

function reloadAssetPageData() {
	getCurrencies()
		.done(function(currencyData) {
			updateCurrencySelection(currencyData);
		})
		.fail(function() {
			alert('fail to get currencies');
		});
}

function updateCurrencySelection(data) {
	var select = $('#c-configure-asset-form #currency');
	$(select).html('');
	
	for(var i = 0; i < data.length; i++) {
		var option = document.createElement('option');
		
		$(option).attr('value', data[i].id);
		$(option).text(data[i].symbol + ' ' + data[i].name + ' (' + data[i].code + ')');
		
		/*if(data[i].defaultCurrency) {
			$(option).prop('selected', 'selected');
		}*/
		
		$(select).append(option);
	}
}

function onAssetUpdate() {
	/*var editForm = $('#c-edit-currency-form');
	
	$(editForm).submit(function(event) {
		event.preventDefault();
		updateCurrency($('#id', editForm).val())
			.done(function() {
				$(editForm).addClass('hidden');
				reloadCurrenciesPageData();
			})
			.fail(function() {
				alert('failed to update currency with id=' + $('#id', editForm).val());
			});
	});
	
	$('button[type="reset"]', editForm).click(function() {
		$(editForm).addClass('hidden');
	});*/
}

/*function updateCurrencySelect(data) {
	var select = $('#c-add-asset-form #currency');
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
}*/

/*function updateAssetTypeSelect(data) {
	var select = $('#c-add-asset-form #type');
	 $(select).html('');
	 
	 for(var i = 0; i < data.length; i++) {
		 var option = document.createElement('option');
		 
		 $(option).attr('value', data[i].name);
		 $(option).text(data[i].label);
		 
		 $(select).append(option);
	 }
}*/

function updateAssetConfigForm(assetData, currencyData) {
	/*var table = $('#c-added-assets-table');
	var oldTbody = $('tbody', table);
	var body = document.createElement('tbody');
	
	for(var i = 0; i < assetData.length; i++) {
		var row = document.createElement('tr');
		
		var tdName = document.createElement('td');
		var tdType = document.createElement('td');
		var tdCurrency = document.createElement('td');
		
		$(tdName).text(assetData[i].name);
		$(tdType).text(assetData[i].label);
		
		for(var j = 0; j < currencyData.length; j++) {
			var currency = currencyData[j];
			if(currency.id === assetData[i].currency) {
				$(tdCurrency).text(currency.symbol + ' ' + currency.name + ' (' + currency.code + ')');
				break;
			}
		}
		
		$(row).append(tdName);
		$(row).append(tdType);
		$(row).append(tdCurrency);
		$(row).append(buildAssetActions(assetData[i]));
		
		$(body).append(row);
	}
	
	
	$(oldTbody).remove();
	$('thead', table).after(body)*/
}