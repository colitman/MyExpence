"use strict";

/*
Controller - Observer
*/

function AssetsController(model, undefined){
	
	var assetsModel = model;
	
	var assetsController = {
		update: function(viewEvent) {
			if(viewEvent.name === 'c.asset.added') {
				
				var newAssetForm = viewEvent.data;
				
				var assetData = new Asset();
				assetData.name = $('#name', newAssetForm).val();
				assetData.type = $('#type', newAssetForm).val();
				assetData.currency = $('#currency', newAssetForm).val();
				
				assetsModel.addAsset(assetData);
			}
			
			if(viewEvent.name === 'c.asset.delete') {
				
				var id = viewEvent.data.id;
				var deleteModal = $('#c-delete-confirmation-modal');
				
				assetsModel.getAsset(id)
					.done(function(data) {
						$('#c-delete-subject', deleteModal).html('<b>' + data.name + ' (' + data.label + ')</b> asset.');
						$('#c-modal-delete-form #id', deleteModal).val(data.id);
						
						$(deleteModal).modal('show');
					})
					.fail(function(jqXHR) {
						console.log(jqXHR.responseText);
					});
			}
			
			if(viewEvent.name === 'c.asset.deleted') {
				
				var deleteAssetForm = viewEvent.data;
				var id = $('#id', deleteAssetForm).val();
				assetsModel.deleteAsset(id)
					.fail(function(jqXHR, textStatus, errorThrown) {
						var deleteModal = $('#c-delete-confirmation-modal');
						$('#c-delete-failure-message', deleteModal).text(jqXHR.responseText);
						$('#c-delete-failure-alert', deleteModal).removeClass('hidden');
					});
			}
			
			if(viewEvent.name === 'c.asset.transfer.attempt') {
				
				var sender = viewEvent.data.id;
				
				assetsModel.getAsset(sender)
					.done(function(senderData) {
						
						assetsModel.getAssets()
							.done(function(assetsData) {
								var filteredAssets = assetsData.filter(function(asset) {
									return asset.currency === senderData.currency && asset.id !== senderData.id;
								});
								
								assetsModel.setChanged();
								assetsModel.notifyObservers(filteredAssets, 'transferAttempt');
								
							})
							.fail(function(jqXHR) {
								console.log(jqXHR.responseText);
							});
					})
					.fail(function(jqXHR) {
						console.log(jqXHR.responseText);
					});
			}
			
			if(viewEvent.name === 'c.asset.transfer.do') {
				var transferForm = viewEvent.data;
				
				var expenseData = new Expense();
				expenseData.amount = $('#amount', transferForm).val();
				expenseData.to = $('#to', transferForm).val();
				expenseData.from = $('#from', transferForm).val();
				expenseData.description = $('#description', transferForm).val();
				
				assetsModel.transfer(expenseData);
			}
		}
	};
	
	return assetsController;
	
}