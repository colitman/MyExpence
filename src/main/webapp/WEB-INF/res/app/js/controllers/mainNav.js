"use strict";

(function(aScope, undefined) {
	var model = aScope.mainNavModel;
	var view = aScope.mainNavView;
	
	model.subscribe(view);
	model.updateData();
	
	/* Event listeners */
	$(view)
		.on('income:add', function(event, shortForm, modal) {
			var amount = new BigNumber(0);
			
			var typed = $('input#amount', shortForm).val();
			if(!isNaN(typed) && typed.trim().length !== 0) {
				amount = new BigNumber(typed);
			}
			
			$('input#amount',modal).val(amount.toNumber());
			
			var label = $('#c-js-expense-asset-form-group label', modal);
			var select = $('#c-js-expense-asset-form-group select', modal);
			$('input#type', modal).val($EX.CATEGORY_TYPES.INCOME);
			 
			label.html('To');
			label.attr('for', 'to');
			select.attr('name', 'to');
			select.attr('id', 'to');
			
			model.getIncomeCategories()
				.done(function(categoriesData) {
					setCategoriesSelectOptions(categoriesData, modal);
					
					model.getAssets()
						.done(function(assetsData) {
							setAssetsSelectOptions(assetsData, modal);
							modal.modal('show');
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							new Alert('danger', 'Oops!', 'Failed to get assets.').show();
							console.log(jqXHR.responseText);
						});
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to get categories.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('outgoing:add', function(event, shortForm, modal) {
			var amount = new BigNumber(0);
			
			var typed = $('input#amount', shortForm).val();
			if(!isNaN(typed) && typed.trim().length !== 0) {
				amount = new BigNumber(typed);
			}
			
			$('input#amount',modal).val(amount.toNumber());
			
			var label = $('#c-js-expense-asset-form-group label', modal);
			var select = $('#c-js-expense-asset-form-group select', modal);
			$('input#type', modal).val($EX.CATEGORY_TYPES.OUTGOING);
			
			label.html('From');
			label.attr('for', 'from');
			select.attr('name', 'from');
			select.attr('id', 'from');
			
			model.getOutgoingCategories()
				.done(function(categoriesData) {
					setCategoriesSelectOptions(categoriesData, modal);
					
					model.getAssets()
						.done(function(assetsData) {
							setAssetsSelectOptions(assetsData, modal);
							modal.modal('show');
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							new Alert('danger', 'Oops!', 'Failed to get assets.').show();
							console.log(jqXHR.responseText);
						});
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to get categories.').show();
					console.log(jqXHR.responseText);
				});
		})
		.on('expense:added', function(event, fullForm) {
			
			var expenseData = new Expense();
			expenseData.type = $('#type', fullForm).val();
			expenseData.amount = new BigNumber($('#amount', fullForm).val()).toNumber();
			expenseData.category = $('#category', fullForm).val();
			expenseData.to = $('#to', fullForm).val();
			expenseData.from = $('#from', fullForm).val();
			expenseData.description = $('#description', fullForm).val();
			
			model.addExpense(expenseData)
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to add an expense.').show();
					console.log(jqXHR.responseText);
				})
				.always(function() {
					aScope.primaryModel.updateData();
				});
		});
	
	/* Private methods */
	var setCategoriesSelectOptions = function(categoriesData, modal) {
		var select = $('#c-js-expense-category-form-group select', modal);
		$(select).html('');
		
		for(var i = 0; i < categoriesData.length; i++) {
			var category = categoriesData[i];
			var option = jQueryDomBuilder.getOption(category.id, category.name);
			$(select).append(option);
		}
	};
	
	var setAssetsSelectOptions = function(assetsData, modal) {
		var select = $('#c-js-expense-asset-form-group select', modal);
		$(select).html('');
		
		for(var i = 0; i < assetsData.length; i++) {
			var asset = assetsData[i];
			var sAsset = new Stringifier().stringify([asset.currency.symbol, asset.name, asset.currency.code], '%1 (%0 %2)');
			var option = jQueryDomBuilder.getOption(asset.id, sAsset);
			$(select).append(option);
		}
	};
})($EX);