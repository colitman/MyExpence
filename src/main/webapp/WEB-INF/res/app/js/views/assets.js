"use strict";



(function(aScope, undefined){
	
	var observer = new Observer();
	
	var assetsView = {
		__proto__: observer,
		
		/**
		 * This method is called by observed model when it is changed.
		 *
		 * @param {*} subject - reference to VM object in global application scope with model data
		 * @param {string} [message=undefined] - additional message that model may send
		 */
		update: function(subject, message) {
			resetForms();
			hideModals();
			setAssetTypesSelectOptions(subject);
			setCurrenciesSelectOptions(subject);
			buildAssetsList(subject);
			initDataTable();
		}
	};
	
	aScope.assetsView = assetsView;
	
	/* Private fields */
	var addAssetForm = $('#c-js-add-asset-form');
	var assetsTable = $('#c-js-added-assets-table');
	var deleteModal = $('#c-delete-confirmation-modal');
	var deleteAssetForm = $('#c-modal-delete-form');
	var transferModal = $('#c-js-asset-transfer-modal');
	var transferForm = $('#c-js-asset-transfer-form');
	
	/* View events triggers */
	addAssetForm.submit(function(event) {
		event.preventDefault();
		$(assetsView).trigger('assets:added', [addAssetForm]);
	});
	
	deleteAssetForm.submit(function(event) {
		event.preventDefault();
		$(assetsView).trigger('assets:deleted', [$('#id', deleteAssetForm).val(), deleteModal]);
	});
	
	transferForm.submit(function(event) {
		event.preventDefault();
		assetsView.setChanged();
		$(assetsView).trigger('assets:transfered', [transferForm]);
	});
	
	$('input#amount', transferForm).keyup(function() {
		var typed = $(this).val();
		if(isNaN(typed) || typed.trim().length === 0) {
			return;
		}
		
		var entered = new BigNumber(typed);
		var limit = new BigNumber($(transferForm).data('limit'));
		
		if(entered.greaterThan(limit) || entered.lessThan(new BigNumber(0))) {
			$('[type="submit"][form="' + transferForm.attr('id') + '"]').prop('disabled', 'disabled');
		} else {
			$('[type="submit"][form="' + transferForm.attr('id') + '"]').prop('disabled','');
		}
	});
	
	/* Private methods */
	var resetForms = function() {
		$('button[type="reset"]', addAssetForm).click();
	};
	
	var hideModals = function() {
		$(deleteModal).modal('hide');
		$(transferModal).modal('hide');
	};
	
	var setAssetTypesSelectOptions = function(vm) {
		var data = vm.assetTypes;
		
		var select = $('#type', addAssetForm);
		$(select).html('');
		
		var assetTypes = data.listData;
		
		for(var i = 0; i < assetTypes.length; i++) {
			var assetType = assetTypes[i];
			var option = jQueryDomBuilder.getOption(assetType.name, assetType.label);
			$(select).append(option);
		}
	};
	
	var setCurrenciesSelectOptions = function(vm) {
		var data = vm.currencies;
		
		var select = $('#currency', addAssetForm);
		$(select).html('');
		
		var currencies = data.listData;
		
		for(var i = 0; i < currencies.length; i++) {
			var currency = currencies[i];
			var sCurrency = new Stringifier().stringify([currency.symbol, currency.name, currency.code], '%0 %1 (%2)');
			var option = jQueryDomBuilder.getOption(currency.id, sCurrency, currency.defaultCurrency);
			$(select).append(option);
		}
	};
	
	var buildAssetsList = function(vm) {
		var data = vm.assets;
		
		$('.c-js-datatable').each(function(index, table) {
			if ( $.fn.dataTable.isDataTable( table ) ) {
				$(table).DataTable().destroy();
			}
		});
		
		var body = $('tbody', assetsTable);
		body.html('');
		
		var assets = data.listData;
		
		for (var i = 0; i < assets.length; i++) {
			var asset = assets[i];
			var row = jQueryDomBuilder.getTableRow(
				[
					asset.name,
					asset.type.label,
					new BigNumber(asset.amount).toNumber(),
					new Stringifier().stringify(
						[
							asset.currency.symbol,
							asset.currency.name,
							asset.currency.code
						],
						'%0 %1 (%2)'
					),
					''
				],
				body
			);
			
			var actionsColumn = row.find('td:last');
			var seeTxAction = jQueryDomBuilder.getAnchor(
				$EX.APP_ROOT + '/settings/assets/' + asset.id + '/transactions',
				'',
				[[]],
				actionsColumn
			);
			seeTxAction.html('<i class="fa fa-database"></i>');
			
			var transferAction = jQueryDomBuilder.getAnchor(
				'#',
				'',
				[['sender',asset.id]],
				actionsColumn
			);
			transferAction.html('<i class="fa fa-exchange"></i>');
			
			var editAction = jQueryDomBuilder.getAnchor(
				$EX.APP_ROOT + '/settings/assets/' + asset.id + '/configure',
				'',
				[[]],
				actionsColumn
			);
			editAction.html('<i class="fa fa-cog"></i>');
			
			var deleteAction = jQueryDomBuilder.getAnchor(
				'#',
				'',
				[['target',asset.id]],
				actionsColumn
			);
			deleteAction.html('<i class="fa fa-remove"></i>');
			
			if(!asset.showInTotals) {
				$(row).addClass('text-muted');
			}
			
			transferAction.click(function(event) {
				event.preventDefault();
				$(assetsView).trigger('assets:transfer', [$(this).data('sender'), transferModal]);
			});
			
			deleteAction.click(function(event) {
				event.preventDefault();
				$(assetsView).trigger('assets:delete', [$(this).data('target'), deleteModal]);
			});
		}
	};
	
	var initDataTable = function() {
		
		var table = $('.c-js-datatable');
		var txDataTable = table.DataTable({
			dom: 'rt<<"col-sm-6"li><"col-sm-6 text-right"p>>',
			pagingType: 'full_numbers',
			lengthMenu: [[10,25,50,-1],[10,25,50,'All']]
		});
	};
	
})($EX);
