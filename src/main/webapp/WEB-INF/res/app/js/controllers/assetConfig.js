"use strict";

/*
Controller - Observer
*/

function AssetConfigController(view, model, undefined){
	
	var assetView = view;
	var assetModel = model;
	
	var assetController = {
		update: function(viewEvent) {
			if(viewEvent.name === 'c.asset.changed') {
				
				var changedAssetForm = viewEvent.data;
				
				var assetData = new Asset();
				assetData.id = $('#id', changedAssetForm).val();
				assetData.type = $('#type', changedAssetForm).val();
				assetData.name = $('#name', changedAssetForm).val();
				assetData.currency = $('#currency', changedAssetForm).val();
				assetData.amount = $('#amount', changedAssetForm).val();
				assetData.paymentSystem = $('#paymentSystem', changedAssetForm).val();
				assetData.bankName = $('#bankName', changedAssetForm).val();
				assetData.limit = $('#limit', changedAssetForm).val();
				
				assetModel.updateAsset(assetData);
			}
		}
	};
	
	return assetController;
	
};
