'use strict';

function getAssets() {
	return $.ajax({
		url: WEB_API_ROOT + '/assets',
		method: 'GET',
		dataType: 'json'
	});
}

function getAssetTypes() {
	return $.ajax({
		url: WEB_API_ROOT + '/assets/types',
		method: 'GET',
		dataType: 'json'
	});
}

function getAssetById(id, type) {
	return $.ajax({
		url: WEB_API_ROOT + '/assets/' + type + '/' + id,
		method: 'GET',
		dataType: 'json'
	});
}

function deleteAsset(id, type) {
	
	var csrf = $('#c-modal-delete-form').serialize();
	
	return $.ajax({
		url: WEB_API_ROOT + '/assets/' + type + '/' + id + '/delete',
		method: 'POST',
		data:csrf
	});
}

function createAsset() {
	var createForm = $('#c-add-asset-form form');
	var data = $(createForm).serialize();
	
	return $.ajax({
		url: WEB_API_ROOT + '/assets',
		method: 'POST',
		data: data,
		dataType: 'json'
	});
}

function updateAsset(id) {
	
	var data = $('#c-edit-asset-form form').serialize();
	
	return $.ajax({
		url: WEB_API_ROOT + '/assets/' + id + '/update',
		method: 'POST',
		data:data
	});
}