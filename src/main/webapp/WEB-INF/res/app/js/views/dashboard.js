"use strict";

/*
View is an observer object.
It should expose the following public access interfaces:
- update(object)
 
 View is also an observable object.
 It should expose the following public access interfaces:
 - subscribe
 
 It also should have the following private methods:
 - countObservers
 - isChanged
 - setChanged
 - clearChanged
 - notifyObservers
 - deleteObservers
*/

(function(aScope, undefined){
	
	var observable = new Observable();
	var dashboardModel = aScope.dashboardModel;
	
	var dashboardView = {
		
		__proto__: observable,
		
		update: function(data, message) {
			if('c.currency.stats.update' === message) {
				updateStatsByCurrencies(data);
				return;
			}
			
			data.getStatsByCurrencies();
		}
	
	};
	
	var updateStatsByCurrencies = function(data) {
		
		var targetSection = $('#c-js-stats-by-currencies');
		var statTemplate = $('#c-js-currency-stat-template');
		
		for(var i = 0; i < data.length; i++) {
			var chartValues = [];
			var chartLabels = [];
			var chartBGColors = [];
			var chartHoverBGColors = [];
			
			var stat = data[i];
			
			var wrapperDiv = $(document.createElement('div'));
			wrapperDiv.addClass('col-sm-6 col-md-4');
			
			var statDOM = statTemplate.clone();
			wrapperDiv.append(statDOM);
			statDOM.attr('id', 'c-js-currency-stat-' + stat.currency.id);
			var panelHeading = $('.panel-heading',statDOM);
			panelHeading.data('target', panelHeading.data('target') + '-' + stat.currency.id);
			$('h3', panelHeading).text(stat.currency.name + ' (' + stat.currency.code + '): ' + stat.currency.symbol + stat.totalAmountForCurrency.toNumber());
			
			var detailsDiv = $('#c-js-stat-details', statDOM);
			detailsDiv.attr('id', panelHeading.data('target').substring(1));
			
			panelHeading.click(function(event) {
				event.preventDefault();
				var targetSelector = $(this).data('target');
				var target = $(targetSelector);
				target.collapse('toggle');
			});
			
			var pTable = $('table', detailsDiv);
			
			var statAssets = stat.assets;
			
			for(var a = 0; a < statAssets.length; a++) {
				var statAsset = statAssets[a];
				var row = $(document.createElement('tr'));
				
				var tdName = $(document.createElement('td'));
				tdName.text(statAsset.name);
				row.append(tdName);
				
				var tdType = $(document.createElement('td'));
				tdType.text(statAsset.label);
				row.append(tdType);
				
				var tdAmount = $(document.createElement('td'));
				tdAmount.text(stat.currency.symbol + statAsset.amount);
				row.append(tdAmount);
				
				$('tbody', pTable).append(row);
				
				chartLabels.push(statAsset.name);
				chartValues.push(statAsset.amount);
				var color = randomColor({luminosity: 'light'});
				chartBGColors.push(color);
				chartHoverBGColors.push(color);
			}
			
			if(stat.currency.defaultCurrency) {
				targetSection.prepend(wrapperDiv);
			} else {
				targetSection.append(wrapperDiv);
			}
			
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
		
		$('.c-js-datatable').DataTable({
			searching: false,
			paging: false,
			info:false
		});
	}
		
	aScope.dashboardView = dashboardView;
	
})($EX);
