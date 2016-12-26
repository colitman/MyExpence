"use strict";

function ChartJsUtils() {
	var model = {
		getDefaultLineChartDataset: function() {
			var bgColor = randomColor({
				format: 'rgba',
				alpha: 0.4
			});
			
			var borderColor = bgColor.replace(',0.4)', ',1)');
			
			var o = {
				label: '',
				fill: false,
				lineTension: 0.1,
				backgroundColor: bgColor, // line BG color
				borderColor: borderColor, // line FG color
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: borderColor, // line point color
				pointBackgroundColor: "#ccc",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: borderColor,
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [],
				spanGaps: true
			};
			return o;
		}
	}
	
	Object.seal(model);
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
