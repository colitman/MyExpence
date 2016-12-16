"use strict";

$(function() {
	var m = $EX.dashboardModel;
	var v = $EX.dashboardView;
	
	m.subscribe(v);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
