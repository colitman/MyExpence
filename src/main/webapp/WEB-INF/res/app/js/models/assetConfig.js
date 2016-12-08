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
	
	var assetModel = {
		__proto__: observable,
		
		getPaymentSystems: function() {
			return aScope.paymentSystemService.getPaymentSystems();
		},
		
		getAsset: function() {
			var id = $('meta[name="target_id"]').attr('content');
			var type = $('meta[name="target_type"]').attr('content');
			return aScope.assetService.getAssetById(id, type);
		},
		
		updateAsset: function(assetData) {
			var _this = this;
			return aScope.assetService.updateAsset(assetData)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this, 'updated');
				});
		}
	
	};
	
	
	aScope.assetModel = assetModel;
	
})($EX);
