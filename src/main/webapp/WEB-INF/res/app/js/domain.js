"use strict";

function DashboardTrendData() {
	var model = {
		labels: [],
		datasets:[]
	}
	
	Object.seal(this);
	return model;
}

function DashboardTrendLineData() {
	var model = {
		label: '', // Asset name
		fill: false,
		lineTension: 0.1,
		backgroundColor: '', // line BG color
		borderColor: '', // line FG color
		borderCapStyle: 'butt',
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: '', // line point color
		pointBackgroundColor: '',
		pointBorderWidth: 1,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: '',
		pointHoverBorderColor: '',
		pointHoverBorderWidth: 2,
		pointRadius: 1,
		pointHitRadius: 10,
		data: [], // numbers
		spanGaps: true
	}
	
	Object.seal(this);
	return model;
}

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
