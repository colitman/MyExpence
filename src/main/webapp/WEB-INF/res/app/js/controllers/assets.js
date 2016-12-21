"use strict";

(function(aScope, undefined) {
	var model = aScope.assetsModel;
	var view = aScope.assetsView;
	
	model.subscribe(view);
	aScope.primaryModel = model;
	model.updateData();
	
	/* Event listeners */
	$(view)
		.on('assets:added', function(event, form) {
			var assetData = new Asset();
			assetData.name = $('#name', form).val();
			assetData.type = $('#type', form).val();
			assetData.currency = $('#currency', form).val();
			
			model.addAsset(assetData)
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to add asset.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('assets:transfer', function(event, assetId, transferModal) {
			
			model.getAsset(assetId)
				.done(function(senderData) {
					
					$('#from', transferModal).val(senderData.id);
					$('form', transferModal).data('limit', new BigNumber(senderData.amount));
					
					model.getAssets()
						.done(function(assetsData) {
							var filteredAssets = assetsData.filter(function(asset) {
								return asset.currency.id === senderData.currency.id && asset.id !== senderData.id;
							});
							
							var select = $('select#to', transferModal);
							$(select).html('');
							
							for(var i = 0; i < filteredAssets.length; i++) {
								var asset = filteredAssets[i];
								var sAsset = new Stringifier().stringify([asset.name, asset.type.label], '%0 (%1)');
								var option = jQueryDomBuilder.getOption(asset.id, sAsset);
								
								$(select).append(option);
							}
							
							$(transferModal).modal('show');
							
						})
						.fail(function(jqXHR) {
							new Alert('danger', 'Oops!', 'Failed to get a list of recipients.').show();
							console.log(jqXHR.responseText);
						});
				})
				.fail(function(jqXHR) {
					new Alert('danger', 'Oops!', 'Failed to get asset.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('assets:transfered', function(event, form) {
			
			var expenseData = new Expense();
			expenseData.amount = new BigNumber($('#amount', form).val());
			expenseData.to = $('#to', form).val();
			expenseData.from = $('#from', form).val();
			expenseData.description = $('#description', form).val();
			
			assetsModel.transfer(expenseData)
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to perform a transfer.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('assets:delete', function(event, assetId, deleteModal) {
			
			model.getAsset(assetId)
				.done(function(assetData) {
					$('#c-delete-subject', deleteModal).html('<b>' + assetData.name + ' (' + assetData.type.label + ')</b> asset.');
					$('#c-modal-delete-form #id', deleteModal).val(assetData.id);
					$(deleteModal).modal('show');
				})
				.fail(function(jqXHR) {
					new Alert('danger', 'Oops!', 'Failed to get asset.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('assets:deleted', function(event, assetId, deleteModal) {
			model.deleteAsset(assetId)
				.fail(function(jqXHR, textStatus, errorThrown) {
					$('#c-delete-failure-message', modal).text(jqXHR.responseText);
					$('#c-delete-failure-alert', modal).removeClass('hidden');
				});
		});
})($EX);