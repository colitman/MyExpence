"use strict";

$(function() {
	var m = $EX.assetTransactionsModel;
	var v = $EX.transactionsView;
	var c = new TransactionsController(m);
	
	m.subscribe(v);
	v.subscribe(c);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
