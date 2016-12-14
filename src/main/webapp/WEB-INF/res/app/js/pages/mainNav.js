"use strict";

$(function() {
	var m = $EX.navModel;
	var v = $EX.navView;
	var c = new MainNavController(m);
	
	m.subscribe(v);
	v.subscribe(c);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
