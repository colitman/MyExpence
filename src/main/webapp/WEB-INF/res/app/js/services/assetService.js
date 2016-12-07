"use strict";

(function(aScope, undefined){
	
	
	
	var assetService = {
		
		getAssets: function() {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/assets',
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		getAssetTypes: function() {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/assets/types',
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		getAssetById: function(id, type) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/assets/' + type + '/' + id,
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		deleteAsset: function(id, type) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/assets/' + type + '/' + id,
				method: 'DELETE'
			});
		},
		
		createAsset: function(assetData) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/assets',
				method  : 'POST',
				data    : assetData,
				dataType: 'json'
			});
		},
		
		updateAsset: function(assetData) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/assets/' + assetData.type + '/' + assetData.id,
				method: 'PUT',
				data  : assetData
			});
		}
	}
	
	aScope.assetService = assetService;
	
})($EX);
