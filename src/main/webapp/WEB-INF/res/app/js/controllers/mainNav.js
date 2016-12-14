"use strict";

/*
Controller - Observer
*/

function MainNavController(model, undefined){
	
	var navModel = model;
	
	var navController = {
		update: function(viewEvent) {
			if(viewEvent.name === 'c.income.add') {
				
				var addForm = viewEvent.data.form;
				var modal = viewEvent.data.modal;
				var amount = $('input#amount', addForm).val();
				
				$('input#amount',modal).val(amount);
				
				navModel.getIncomeCategories();
				navModel.getAssets()
					.done(function(assetsData) {
						navModel.getCurrencies()
							.done(function(currenciesData) {
								navModel.setChanged();
								navModel.notifyObservers({assets:assetsData, currencies:currenciesData},'assets');
							});
					});
				
				modal.modal('show');
			}
			
			if(viewEvent.name === 'c.outgoing.add') {
				
				var addForm = viewEvent.data.form;
				var modal = viewEvent.data.modal;
				var amount = $('input#amount', addForm).val();
				
				$('input#amount',modal).val(amount);
				
				navModel.getOutgoingCategories();
				navModel.getAssets()
					.done(function(assetsData) {
						navModel.getCurrencies()
							.done(function(currenciesData) {
								navModel.setChanged();
								navModel.notifyObservers({assets:assetsData, currencies:currenciesData},'assets');
							});
					});
				
				modal.modal('show');
				
			}
			
			if(viewEvent.name === 'c.expense.added') {
				var expenseForm = viewEvent.data;
				
				var expenseData = new Expense();
				expenseData.type = $('#type', expenseForm).val();
				expenseData.amount = $('#amount', expenseForm).val();
				expenseData.category = $('#category', expenseForm).val();
				expenseData.to = $('#to', expenseForm).val();
				expenseData.from = $('#from', expenseForm).val();
				expenseData.description = $('#description', expenseForm).val();
				
				navModel.addExpense(expenseData);
			}
		}
	};
	
	return navController;
	
}
