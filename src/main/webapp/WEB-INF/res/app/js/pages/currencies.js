"use strict";

$(function() {
	var m = $EX.currenciesModel;
	var v = $EX.currenciesView;
	var c = new CurrenciesController(v,m);
	
	m.subscribe(v);
	v.subscribe(c);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
