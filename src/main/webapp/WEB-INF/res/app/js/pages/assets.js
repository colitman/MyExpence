"use strict";

$(function() {
	var m = $EX.assetsModel;
	var v = $EX.assetsView;
	var c = new AssetsController(v,m);
	
	m.subscribe(v);
	v.subscribe(c);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
