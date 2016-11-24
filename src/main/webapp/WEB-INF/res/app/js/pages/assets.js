'use strict';

$(function() {
	onAssetCreate();
	onAssetUpdate();
	reloadPageData();
});

function reloadPageData() {
	getCurrencies()
		.done(function(data) {
			updateCurrencySelect(data);
		})
		.fail(function() {
			alert('fail to get currencies');
		});
	
	getAssetTypes()
		.done(function(data) {
			updateAssetTypeSelect(data);
		})
		.fail(function() {
			alert('fail to get asset types');
		});
	
	getAssets()
		.done(function(data) {
			updateAssetsTable(data);
		})
		.fail(function() {
			alert('fail to get assets');
		});
}

function onAssetUpdate() {
	/*var editForm = $('#c-edit-currency-form');
	
	$(editForm).submit(function(event) {
		event.preventDefault();
		updateCurrency($('#id', editForm).val())
			.done(function(data) {
				$(editForm).addClass('hidden');
				reloadPageData();
			})
			.fail(function() {
				alert('failed to update currency with id=' + $(control).data('target'));
			});
	});
	
	$('button[type="reset"]', editForm).click(function(event) {
		$(editForm).addClass('hidden');
	});*/
}

function onAssetCreate() {
	/*$('#c-add-currency-form form').submit(function(submitEvent) {
		submitEvent.preventDefault();
		var form = $(this);
		createCurrency()
			.done(function(data) {
				$('button[type="reset"]', form).click();
				reloadPageData();
			})
			.fail(function() {
				alert('fail to post currency');
			});
	});*/
}

function updateCurrencySelect(data) {
	/*var select = $('#c-choose-default-currency-form #id');
	$(select).html('');
	
	for(var i = 0; i < data.length; i++) {
		var option = document.createElement('option');
		
		$(option).attr('value', data[i].id);
		$(option).text(data[i].symbol + ' ' + data[i].name + ' (' + data[i].code + ')');
		if(data[i].defaultCurrency) {
			$(option).prop('selected', 'selected');
		}
		
		$(select).append(option);
	}*/
}

function updateAssetTypeSelect(data) {
	/*var select = $('#c-choose-default-currency-form #id');
	 $(select).html('');
	 
	 for(var i = 0; i < data.length; i++) {
	 var option = document.createElement('option');
	 
	 $(option).attr('value', data[i].id);
	 $(option).text(data[i].symbol + ' ' + data[i].name + ' (' + data[i].code + ')');
	 if(data[i].defaultCurrency) {
	 $(option).prop('selected', 'selected');
	 }
	 
	 $(select).append(option);
	 }*/
}

function updateAssetsTable(data) {
	/*var table = $('#c-added-currencies-table');
	var oldTbody = $('tbody', table);
	var body = document.createElement('tbody');
	
	for(var i = 0; i < data.length; i++) {
		var row = document.createElement('tr');
		
		var tdName = document.createElement('td');
		var tdSymbol = document.createElement('td');
		var tdCode = document.createElement('td');
		
		$(tdName).text(data[i].name);
		$(tdSymbol).text(data[i].symbol);
		$(tdCode).text(data[i].code);
		
		$(row).append(tdName);
		$(row).append(tdSymbol);
		$(row).append(tdCode);
		$(row).append(buildCurrencyActions(data[i]));
		
		if(data[i].defaultCurrency) {
			$(row).addClass('success');
			$(body).prepend(row);
		} else {
			$(body).append(row);
		}
	}
	
	
	$(oldTbody).remove();
	$('thead', table).after(body)*/
}

function buildAssetActions(assetData) {
	/*var tdActions = document.createElement('td');
	
	var editAction = document.createElement('a');
	$(editAction).attr('href', '#');
	$(editAction).html('<i class="fa fa-pencil"></i>');
	$(editAction).data('target', currencyData.id);
	$(tdActions).append(editAction);
	
	$(editAction).click(function(event) {
		event.preventDefault();
		onCurrencyEditAttempt(editAction);
	});
	
	if(!currencyData.defaultCurrency) {
		var deleteAction = document.createElement('a');
		$(deleteAction).attr('href', '#');
		$(deleteAction).html('<i class="fa fa-remove"></i>');
		$(deleteAction).data('target', currencyData.id);
		$(tdActions).append(deleteAction);
		
		$(deleteAction).click(function(event) {
			event.preventDefault();
			onCurrencyDeleteAttempt(deleteAction);
		});
	}
	
	return tdActions;*/
}

function onAssetEditAttempt(control) {
	/*var editForm = $('#c-edit-currency-form');
	
	getCurrencyById($(control).data('target'))
		.done(function(data) {
			$('#name', editForm).val(data.name);
			$('#code', editForm).val(data.code);
			$('#symbol', editForm).val(data.symbol);
			$('#id', editForm).val(data.id);
			
			$(editForm).removeClass('hidden');
		})
		.fail(function() {
			alert('failed to get currency with id=' + $(control).data('target'));
		});*/
}

function onAssetDeleteAttempt(control) {
	/*var deleteModal = $('#c-delete-confirmation-modal');
	
	getCurrencyById($(control).data('target'))
		.done(function(data) {
			$('#c-delete-subject', deleteModal).html('<b>' + data.symbol + ' ' + data.name + ' (' + data.code + ')</b> currency.');
			
			$('#c-modal-delete-form').submit(function(event) {
				event.preventDefault();
				deleteCurrency($(control).data('target'))
					.done(function(data) {
						$(deleteModal).modal('hide');
						reloadPageData();
					})
					.fail(function() {
						alert('failed to delete currency with id=' + $(control).data('target'))
					});
			});
			
			$(deleteModal).modal('show');
		})
		.fail(function() {
			alert('failed to get currency with id=' + $(control).data('target'));
		});*/
}