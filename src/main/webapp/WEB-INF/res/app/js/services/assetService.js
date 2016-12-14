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
		
		getAssetById: function(id) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/assets/' + id,
				method  : 'GET',
				dataType: 'json'
			});
		},
		
		deleteAsset: function(id) {
			return $.ajax({
				url   : $EX.WEB_API_ROOT + '/assets/' + id,
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
				url   : $EX.WEB_API_ROOT + '/assets/' + assetData.id,
				method: 'PUT',
				data  : assetData
			});
		},
		
		transfer: function(expenseData) {
			return $.ajax({
				url     : $EX.WEB_API_ROOT + '/assets/transfer',
				method  : 'POST',
				data    : expenseData
			});
		}
	}
	
	aScope.assetService = assetService;
	
})($EX);
