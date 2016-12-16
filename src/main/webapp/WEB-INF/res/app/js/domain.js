"use strict";

function DashboardCurrencyStat() {
	var model = {
		currency: new Currency(),
		totalAmountForCurrency: 0,
		assets:[]
	}
	
	Object.seal(this);
	return model;
}

function Expense() {
	var model = {
		type:'',
		amount:'',
		category:'',
		to:'',
		from:'',
		description:''
	}
	
	Object.seal(this);
	return model;
}

function Transaction() {
	var model = {
		id:'',
		transactionDate:'',
		sender:'',
		recipient:'',
		amount:'',
		message:'',
		category:''
	}
	
	Object.seal(this);
	return model;
}

function Currency() {
	var model = {
		id:'',
		name:'',
		code:'',
		symbol:'',
		defaultCurrency:''
	}
	
	Object.seal(model);
	return model;
}

function AssetType() {
	var model = {
		name:'',
		label:''
	}
	
	Object.seal(model);
	return model;
}

function PaymentSystem() {
	var model = {
		name:'',
		label:''
	}
	
	Object.seal(model);
	return model;
}

function Asset() {
	var model = {
		id:'',
		name:'',
		type:'',
		label:'',
		currency:'',
		amount:'',
		paymentSystem:'',
		bankName:'',
		limit:''
	}
	
	Object.seal(model);
	return model;
}

function Category() {
	var model = {
		id:'',
		name:'',
		type:''
	}
	
	Object.seal(model);
	return model;
}
