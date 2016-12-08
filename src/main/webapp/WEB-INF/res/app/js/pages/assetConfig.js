"use strict";

$(function() {
	var m = $EX.assetModel;
	var v = $EX.assetView;
	var c = new AssetConfigController(m);
	
	m.subscribe(v);
	v.subscribe(c);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
