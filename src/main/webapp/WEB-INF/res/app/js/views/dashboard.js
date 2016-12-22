"use strict";

(function(aScope, undefined){
	
	var observer = new Observer();
	
	var dashboardView = {
		
		__proto__: observer,
		
		/**
		 * This method is called by observed model when it is changed.
		 *
		 * @param {*} subject - reference to VM object in global application scope with model data
		 * @param {string} [message=undefined] - additional message that model may send
		 */
		update: function(subject, message) {
			resetForms();
			hideModals();
			updateStatsByCurrencies(subject);
		}
	
	};
	
	aScope.dashboardView = dashboardView;
	
	/* Private fields */
	
	/* View events triggers */
	
	/* Private methods */
	var resetForms = function() {
		
	};
	
	var hideModals = function() {
		
	};
	
	var updateStatsByCurrencies = function(vm) {
		
		var targetSection = $('#c-js-stats-by-currencies');
		var statTemplate = $('#c-js-currency-stat-template');
		
		var data = vm.statsByCurrency.listData;
		
		for(var i = 0; i < data.length; i++) {
			var chartValues = [];
			var chartLabels = [];
			var chartBGColors = [];
			var chartHoverBGColors = [];
			
			var stat = data[i];
			
			var wrapperDiv = jQueryDomBuilder.getDiv('col-sm-6 col-md-4', targetSection, stat.currency.defaultCurrency)
			var statDOM = statTemplate.clone();
			wrapperDiv.append(statDOM);
			
			statDOM.attr('id', 'c-js-currency-stat-' + stat.currency.id);
			var panelHeading = $('.panel-heading',statDOM);
			panelHeading.data('target', panelHeading.data('target') + '-' + stat.currency.id);
			$('h3', panelHeading).text(stat.currency.name + ' (' + stat.currency.code + '): ' + stat.currency.symbol + stat.totalAmountForCurrency.toNumber());
			
			var detailsDiv = $('#c-js-stat-details', statDOM);
			detailsDiv.attr('id', panelHeading.data('target').substring(1));
			
			var pTable = $('table', detailsDiv);
			
			var statAssets = stat.assets;
			
			for(var a = 0; a < statAssets.length; a++) {
				var statAsset = statAssets[a];
				var row = jQueryDomBuilder.getTableRow(
					[
						statAsset.name,
						statAsset.type.label,
						stat.currency.symbol + ' ' + new BigNumber(statAsset.amount).toNumber()
					],
					$('tbody', pTable)
				);
				
				chartLabels.push(statAsset.name);
				chartValues.push(new BigNumber(statAsset.amount).toNumber());
			}
			
			chartBGColors = chartHoverBGColors = randomColor({count: statAssets.length});
			
			if(stat.assets.length !== 0) {
				var chartJsCanvas = $(document.createElement('canvas'));
				$('.c-js-stat-chart', wrapperDiv).append(chartJsCanvas);
				var chartJsChart = new Chart(chartJsCanvas, {
					type: 'doughnut',
					data: {
						labels  : chartLabels,
						datasets: [
							{
								data                : chartValues,
								backgroundColor     : chartBGColors,
								hoverBackgroundColor: chartHoverBGColors
							}
						]
					}
				});
			}
		}
		
		var table = $('.c-js-datatable');
		var txDataTable = table.DataTable({
			searching: false,
			paging: false,
			info:false
		});
		
		$('.c-js-currency-stat-panel .panel-heading').click(function(event) {
			event.preventDefault();
			var targetSelector = $(this).data('target');
			var target = $(targetSelector);
			target.collapse('toggle');
		});
	}
	
})($EX);
