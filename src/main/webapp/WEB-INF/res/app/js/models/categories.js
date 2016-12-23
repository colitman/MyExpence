"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var categoriesModel = {
		__proto__: observable,
		
		updateData: function() {
			var _this = this;
			
			var vm = {
				income: {
					total:0,
					listData:[]
				},
				outgoing: {
					total:0,
					listData:[]
				}
			};
			
			_this.getIncomeCategories()
				.done(function(incomeCategoriesData) {
					vm.income.total = incomeCategoriesData.length;
					vm.income.listData = incomeCategoriesData;
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to get income categories.').show();
					console.log(jqXHR.responseText);
				})
				.always(function() {
					_this.getOutgoingCategories()
						.done(function(outgoingCategoriesData) {
							vm.outgoing.total = outgoingCategoriesData.length;
							vm.outgoing.listData = outgoingCategoriesData;
						})
						.fail(function(jqXHR, textStatus, errorThrown) {
							new Alert('danger', 'Oops!', 'Failed to get outgoing categories.').show();
							console.log(jqXHR.responseText);
						})
						.always(function() {
							aScope.VM = vm;
							
							_this.setChanged();
							_this.notifyObservers(aScope.VM, 'categories:dataUpdated');
						});
				});
			
		},
		
		getIncomeCategories: function() {
			return aScope.categoryService.getIncomeCategories();
		},
		
		getOutgoingCategories: function() {
			return aScope.categoryService.getOutgoingCategories();
		},
		
		getCategory: function(id) {
			return aScope.categoryService.getCategory(id);
		},
		
		addIncomeCategory: function(categoryData) {
			var _this = this;
			categoryData.type = $EX.CATEGORY_TYPES.INCOME;
			return addCategory(categoryData);
		},
		
		addOutgoingCategory: function(categoryData) {
			var _this = this;
			categoryData.type = $EX.CATEGORY_TYPES.OUTGOING;
			return addCategory(categoryData);
		},
		
		updateCategory: function(categoryData) {
			var _this = this;
			return aScope.categoryService.updateCategory(categoryData)
				.done(function(data) {
					_this.updateData();
				});
		},
		
		deleteCategory: function(id) {
			var _this = this;
			return aScope.categoryService.deleteCategory(id)
				.done(function(data) {
					_this.updateData();
				});
		}
	
	};
	
	
	aScope.categoriesModel = categoriesModel;
	
	/* Private methods */
	var addCategory = function(categoryData) {
		var _this = this;
		return aScope.categoryService.createCategory(categoryData)
			.done(function(data) {
				_this.updateData();
			});
	}
	
})($EX);
