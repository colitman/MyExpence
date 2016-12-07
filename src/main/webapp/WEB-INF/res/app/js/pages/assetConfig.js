"use strict";

$(function() {
	var m = $EX.assetModel;
	var v = $EX.assetView;
	var c = new AssetConfigController(v,m);
	
	m.subscribe(v);
	v.subscribe(c);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
