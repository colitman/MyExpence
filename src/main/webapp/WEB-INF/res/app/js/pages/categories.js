"use strict";

$(function() {
	var m = $EX.categoriesModel;
	var vI = $EX.incomeCategoriesView;
	var vO = $EX.outgoingCategoriesView;
	
	var c = new CategoriesController(m);
	
	m.subscribe(vI);
	vI.subscribe(c);
	
	$('a[href="#c-js-income-categories"]').on('show.bs.tab', function(event) {
		m.deleteObservers();
		vO.deleteObservers();
		
		m.subscribe(vI);
		vI.subscribe(c);
		m.setChanged();
		m.notifyObservers(m);
	});
	
	$('a[href="#c-js-outgoing-categories"]').on('show.bs.tab', function(event) {
		m.deleteObservers();
		vI.deleteObservers();
		
		m.subscribe(vO);
		vO.subscribe(c);
		m.setChanged();
		m.notifyObservers(m);
	});
	
	m.setChanged();
	m.notifyObservers(m);
	
})
