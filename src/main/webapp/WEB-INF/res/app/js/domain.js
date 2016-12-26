"use strict";

function DashboardCurrencyStat() {
	var model = {
		currency: new Currency(),
		totalAmountForCurrency: new BigNumber(0),
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
		type:'',
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

/**
 * Currency object
 * @returns {{id: string, name: string, code: string, symbol: string, defaultCurrency: string}}
 * @constructor
 */
function Currency() {
	var model = {
		id:'',
		name:'',
		code:'',
		symbol:'',
		defaultCurrency:'',
		
		toCurrencyString: function() {
			return symbol + ' ' + name + ' (' + code + ')';
		}
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
		limit:'',
		showInTotals: true
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
