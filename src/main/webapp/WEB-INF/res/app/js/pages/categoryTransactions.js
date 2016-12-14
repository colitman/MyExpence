"use strict";

$(function() {
	var m = $EX.categoryTransactionsModel;
	var v = $EX.transactionsView;
	var c = new TransactionsController(m);
	
	m.subscribe(v);
	v.subscribe(c);
	
	m.setChanged();
	m.notifyObservers(m);
	
})
