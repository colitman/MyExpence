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
	
	var assetsModel = {
		__proto__: observable,
		
		getAssets: function() {
			return aScope.assetService.getAssets();
		},
		
		getAssetTypes: function() {
			return aScope.assetService.getAssetTypes();
		},
		
		getAsset: function(id) {
			return aScope.assetService.getAssetById(id);
		},
		
		addAsset: function(assetData) {
			var _this = this;
			aScope.assetService.createAsset(assetData)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				})
				.fail(function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
				});
		},
		
		deleteAsset: function(id) {
			var _this = this;
			return aScope.assetService.deleteAsset(id)
				.done(function(data) {
					_this.setChanged();
					_this.notifyObservers(_this);
				});
		}
	
	};
	
	
	aScope.assetsModel = assetsModel;
	
})($EX);
