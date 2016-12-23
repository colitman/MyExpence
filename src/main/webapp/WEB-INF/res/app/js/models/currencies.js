"use strict";

(function(aScope, undefined){
	
	var observable = new Observable();
	
	/**
	 * <b>Currency List model</b>
	 *
	 * <p>Represents model for a page with a list of currencies, together with
	 * actions that may be applied to either a list or separate currency</p>
	 *
	 * <p>This model is inherited from Observable object. It provides the <b>.subscribe(observer)</b> method
	 * for registering object that will listen to model change events.</p>
	 *
	 * @param aScope global application scope object
	 */
	var currenciesModel = {
		__proto__: observable,
		
		/**
		 * Reloads model data and notify observers about change
		 */
		updateData: function() {
			var _this = this;
			_this.getCurrencies()
				.done(function(currenciesData) {
					var vm = {};
					vm.total = currenciesData.length;
					vm.listData = currenciesData;
					vm.defaultCurrency = currenciesData.filter(function(currency) {
						return currency.defaultCurrency;
					})[0];
					
					aScope.VM = vm;
					
					_this.setChanged();
					_this.notifyObservers(aScope.VM, 'currencies:dataUpdated');
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					new Alert('danger', 'Oops!', 'Failed to get currencies.').show();
					console.log(jqXHR.responseText);
				});
		},
		
		/**
		 * Gets a list of currencies from DB
		 * @returns {jqXHR} promise with an array of {@link Currency} objects.
		 */
		getCurrencies: function() {
			return aScope.currencyService.getCurrencies();
		},
		
		/**
		 * Gets currency from DB by id
		 * @param {number} id currency ID
		 * @returns {jqXHR} promise with a {@link Currency} object.
		 */
		getCurrency: function(id) {
			return aScope.currencyService.getCurrencyById(id);
		},
		
		/**
		 * Adds new currency to DB and calls the {@link updateData} method
		 * @param {Currency} currencyData - data for new currency
		 * @returns {jqXHR} promise with an ID of created object.
		 */
		addCurrency: function(currencyData) {
			var _this = this;
			return aScope.currencyService.createCurrency(currencyData)
				.done(function(data) {
					_this.updateData();
				});
		},
		
		/**
		 * Updates a currency in DB and calls the {@link updateData} method.
		 * @param {Currency} currencyData - new data for currency
		 * @returns {jqXHR} promise
		 */
		updateCurrency: function(currencyData) {
			var _this = this;
			return aScope.currencyService.updateCurrency(currencyData)
				.done(function(data) {
					_this.updateData();
				});
		},
		
		/**
		 * Sets a currency with provided ID as a default one and calls the {@link updateData} method.
		 * @param id - ID of the currency that should be default
		 * @returns {jqXHR} promise
		 */
		setDefaultCurrency: function(id) {
			var _this = this;
			return aScope.currencyService.setDefaultCurrency(id)
				.done(function(data) {
					_this.updateData();
				});
		},
		
		/**
		 * Deletes a currency with provided ID from DB and calls the {@link updateData} method.
		 * @param id - ID of a currency to be deleted
		 * @returns {jqXHR} promise
		 */
		deleteCurrency: function(id) {
			var _this = this;
			return aScope.currencyService.deleteCurrency(id)
				.done(function(data) {
					_this.updateData();
				});
		}
	
	};
	
	aScope.currenciesModel = currenciesModel;
	
})($EX);
