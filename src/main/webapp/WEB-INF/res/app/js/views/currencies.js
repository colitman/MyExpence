"use strict";

/**
 * <b>Currency List view</b>
 *
 * <p>Represents view for a page with a list of currencies, together with
 * actions that may be applied to either a list or separate currency</p>
 *
 * <p>This view acts as observer object, registered to listen to model change notifications.
 * Obsrvable object calls the <b>.update(subject, message)</b> method of observer to notify about changes.
 * </p>
 *
 * @param aScope global application scope object
 */

(function(aScope, undefined){
	
	var observer = new Observer();
	
	var currenciesView = {
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
			setDefaultCurrencySelectOptions(subject);
			buildCurrenciesList(subject);
			initDataTable();
		}
	};
	
	aScope.currenciesView = currenciesView;
	
	/* Private fields */
	var addCurrencyForm = $('#c-js-add-currency-form');
	var editCurrencyForm = $('#c-js-edit-currency-form');
	var chooseDefaultCurrencyForm = $('#c-js-choose-default-currency-form');
	var deleteCurrencyForm = $('#c-modal-delete-form');
	
	var currenciesTable = $('#c-js-currencies-table');
	
	var deleteModal = $('#c-delete-confirmation-modal');
	
	/* View events triggers */
	addCurrencyForm.submit(function(event) {
		event.preventDefault();
		$(currenciesView).trigger('currency:added',[addCurrencyForm]);
	});
	
	editCurrencyForm.submit(function(event) {
		event.preventDefault();
		$(currenciesView).trigger('currency:changed',[editCurrencyForm]);
	});
	
	chooseDefaultCurrencyForm.submit(function(event) {
		event.preventDefault();
		$(currenciesView).trigger('currency:changedDefault',[$('#id', chooseDefaultCurrencyForm).val()]);
	});
	
	deleteCurrencyForm.submit(function(event) {
		event.preventDefault();
		$(currenciesView).trigger('currency:deleted',[$('#id', deleteCurrencyForm).val(), deleteModal]);
	});
	 
	 $('[type="reset"]', editCurrencyForm).click(function(event) {
		 $('[type="hidden"]', editCurrencyForm).each(function(index, hiddenInput) {
			 $(hiddenInput).val('');
		 });
		 editCurrencyForm.addClass('hidden');
	 });
	 
	 $('#c-js-cancel-edit-currency-button', editCurrencyForm).click(function(event) {
		 event.preventDefault();
		 $(currenciesView).trigger('currency:change', [$('#id', editCurrencyForm).val(), editCurrencyForm]);
	 });
	
	/* Private methods */
	var resetForms = function() {
		$('button[type="reset"]', addCurrencyForm).click();
		
		$('button[type="reset"]', editCurrencyForm).click();
		$(editCurrencyForm).addClass('hidden');
	};
	
	var hideModals = function() {
		$(deleteModal).modal('hide');
	};
	
	var setDefaultCurrencySelectOptions = function(vm) {
		var select = $('#id', chooseDefaultCurrencyForm);
		$(select).html('');
		
		var currencies = vm.listData;
		
		for(var i = 0; i < currencies.length; i++) {
			var currency = currencies[i];
			var sCurrency = new Stringifier().stringify([currency.symbol, currency.name, currency.code], '%0 %1 (%2)');
			var option = jQueryDomBuilder.getOption(currency.id, sCurrency, currency.defaultCurrency);
			$(select).append(option);
		}
	};
	
	var buildCurrenciesList = function(vm) {
		var currencies = vm.listData;
		
		$('.c-js-datatable').each(function(index, table) {
			if ( $.fn.dataTable.isDataTable( table ) ) {
				$(table).DataTable().destroy();
			}
		});
		
		var body = $('tbody', currenciesTable);
		body.html('');
		
		for(var i = 0; i < currencies.length; i++) {
			var currency = currencies[i];
			var row = jQueryDomBuilder.getTableRow([currency.name, currency.symbol, currency.code,''], body);
			
			var actionsColumn = row.find('td:last');
			var editAction = jQueryDomBuilder.getAnchor('#','',[['target',currency.id]], actionsColumn);
			editAction.html('<i class="fa fa-pencil"></i>');
			
			if(!currency.defaultCurrency) {
				var deleteAction = jQueryDomBuilder.getAnchor('#','',[['target',currency.id]], actionsColumn);
				deleteAction.html('<i class="fa fa-remove"></i>');
			} else {
				$(row).addClass('success');
			}
			
			editAction.click(function(event) {
				event.preventDefault();
				$(currenciesView).trigger('currency:change', [$(this).data('target'), editCurrencyForm]);
			});
			
			deleteAction.click(function(event) {
				event.preventDefault();
				$(currenciesView).trigger('currency:delete', [$(this).data('target'), deleteModal]);
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
