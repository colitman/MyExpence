"use strict";

(function(aScope, undefined) {
	var model = aScope.assetModel;
	var view = aScope.assetView;
	
	model.subscribe(view);
	aScope.primaryModel = model;
	model.updateData();
	
	/* Event listeners */
	$(view)
		.on('asset:changed', function(event, form) {
			
			var assetData = new Asset();
			assetData.id = $('#id', form).val();
			assetData.type = $('#type', form).val();
			assetData.name = $('#name', form).val();
			assetData.currency = $('#currency', form).val();
			assetData.amount = new BigNumber($('#amount', form).val()).toNumber();
			assetData.paymentSystem = $('#paymentSystem', form).val();
			assetData.bankName = $('#bankName', form).val();
			assetData.limit = new BigNumber($('#limit', form).val()).toNumber();
			assetData.showInTotals = $('#showInTotals', form).prop('checked');
			
			model.updateAsset(assetData)
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to update asset.').show();
					console.log(jqXHR.responseText);
				});
		})
})($EX);