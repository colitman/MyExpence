"use strict";

/*
Model is an observable object.
It should expose the following public access interfaces:
- subscribe

It also should have the following private methods:
- countObservers
- isChanged
- setChanged
- clearChanged
- notifyObservers
- deleteObservers
 */

(function(aScope, undefined){
	
	var observable = new Observable();
	
	var addCategory = function(categoryData) {
		return aScope.categoryService.createCategory(categoryData)
			.done(function(data) {
				categoriesModel.setChanged();
				categoriesModel.notifyObservers(categoriesModel);
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
			});
	}
	
	var categoriesModel = {
		__proto__: observable,
		
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
			categoryData.type = $EX.CATEGORY_TYPES.INCOME;
			return addCategory(categoryData);
		},
		
		addOutgoingCategory: function(categoryData) {
			categoryData.type = $EX.CATEGORY_TYPES.OUTGOING;
			return addCategory(categoryData);
		},
		
		updateCategory: function(categoryData) {
			var _this = this;
			aScope.categoryService.updateCategory(categoryData)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		deleteCategory: function(id) {
			var _this = this;
			return aScope.categoryService.deleteCategory(id)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				});
		}
	
	};
	
	
	aScope.categoriesModel = categoriesModel;
	
})($EX);
