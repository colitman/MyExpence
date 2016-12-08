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
				var type = viewEvent.data.type;
				var deleteModal = $('#c-delete-confirmation-modal');
				
				assetsModel.getAsset(id, type)
					.done(function(data) {
						$('#c-delete-subject', deleteModal).html('<b>' + data.name + ' (' + data.label + ')</b> asset.');
						$('#c-modal-delete-form #id', deleteModal).val(data.id);
						
						var typeInput = document.createElement('input');
						$(typeInput).attr('type', 'hidden');
						$(typeInput).attr('id', 'type');
						$(typeInput).attr('name', 'type');
						$(typeInput).val(data.type);
						
						$('#c-modal-delete-form #id', deleteModal).after(typeInput);
						
						$(deleteModal).modal('show');
					})
					.fail(function(jqXHR) {
						console.log(jqXHR.responseText);
					});
			}
			
			if(viewEvent.name === 'c.asset.deleted') {
				
				var deleteAssetForm = viewEvent.data;
				var id = $('#id', deleteAssetForm).val();
				var type = $('#type', deleteAssetForm).val();
				assetsModel.deleteAsset(id, type)
					.fail(function(jqXHR, textStatus, errorThrown) {
						var deleteModal = $('#c-delete-confirmation-modal');
						$('#c-delete-failure-message', deleteModal).text(jqXHR.responseText);
						$('#c-delete-failure-alert', deleteModal).removeClass('hidden');
					});
			}
		}
	};
	
	return assetsController;
	
};
