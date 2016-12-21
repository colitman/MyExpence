"use strict";

(function(window, undefined) {
	
	var builder = {
		
		/**
		 * Builds the "a" DOM element
		 * @param {string} href - value for "href" attribute
		 * @param {string} text - value for anchor display text
		 * @param {string[][]} data - two-dimensional array of key-value pairs for HTML5 data-* attributes.
		 * @example
		 * .getAnchor('#', 'Link 2', [['target', '2'],['parent', '#achor-parent']])
		 * @param {jQuery} [parent=undefined] - jQuery object to place the "a" into
		 * @param {boolean} [isPrepend=false] - if true, "a" will be prepended to provided "parent"; if false - appended.
		 * @returns {jQuery}
		 */
		getAnchor: function(href, text, data, parent,isPrepend) {
			var a = $(document.createElement('a'));
			a.attr('href', href);
			a.text(text);
			
			for(var i = 0; i < data.length; i++) {
				var dataItem = data[i];
				a.data(dataItem[0], dataItem[1]);
			}
			
			if(parent != undefined) {
				isPrepend? parent.prepend(a): parent.append(a);
			}
			
			return a;
		},
		
		/**
		 * Builds the "option" DOM element
		 * @param {number|string} value - value for "value" attribute
		 * @param {string} text - value for option display text
		 * @param {boolean} [isSelected=false] - if true, option will be marked as selected
		 * @returns {jQuery} jQuery object
		 */
		getOption: function(value, text, isSelected) {
			var option = $(document.createElement('option'));
			option.attr('value', value);
			option.text(text);
			if(isSelected) option.prop('selected', 'selected');
			return option;
		},
		
		/**
		 * Builds the "tr" DOM element
		 * @param {Array} values - array of values for row columns
		 * @param {jQuery} [tbody=undefined] - jQuery object to place the "tr" into
		 * @param {boolean} [isPrepend=false] - if true, "tr" will be prepended to provided "tbody"; if false - appended.
		 * @returns {jQuery} jQuery object
		 */
		getTableRow: function(values, tbody, isPrepend) {
			var tr = $(document.createElement('tr'));
			
			for(var i = 0; i < values.length; i++) {
				var value = values[i];
				var td = $(document.createElement('td'));
				td.text(value);
				tr.append(td);
			}
			
			if(tbody != undefined) {
				isPrepend? tbody.prepend(tr): tbody.append(tr);
			}
			
			return tr;
		}
	};
	
	window.jQueryDomBuilder = builder;
})(window);