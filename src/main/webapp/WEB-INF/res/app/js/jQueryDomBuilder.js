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
		},
		
		/**
		 * Builds the "div" DOM element
		 * @param {string} classes - value for "class" attribute
		 * @param {jQuery} [parent=undefined] - jQuery object to place the "div" into
		 * @param {boolean} [isPrepend=false] - if true, "div" will be prepended to provided "parent"; if false - appended.
		 * @returns {jQuery}
		 */
		getDiv: function(classes, parent, isPrepend) {
			var div = $(document.createElement('div'));
			div.addClass(classes);
			
			if(parent != undefined) {
				isPrepend? parent.prepend(div): parent.append(div);
			}
			
			return div;
		},
		
		/**
		 * Builds the "label" DOM element
		 * @param {string} forAttr - value for "for" attribute
		 * @param {string} text - value for label display text
		 * @param {jQuery} [parent=undefined] - jQuery object to place the "label" into
		 * @param {boolean} [isPrepend=false] - if true, "label" will be prepended to provided "parent"; if false - appended.
		 * @returns {jQuery}
		 */
		getLabel: function(forAttr, text, parent, isPrepend) {
			var label = $(document.createElement('label'));
			label.attr('for', forAttr);
			label.text(text);
			
			if(parent != undefined) {
				isPrepend? parent.prepend(label): parent.append(label);
			}
			
			return label;
		},
		
		/**
		 * Builds the "input" DOM element
		 * @param {string[][]} attrs - two-dimensional array of key-value pairs for input attributes.
		 * @example
		 * // will produce <input type="text" id="comments" name="comments />
		 * .getInput([['type', 'text'],['id', 'comments'], ['name', 'comments]])
		 * @param {string} value - value for input
		 * @param {jQuery} [parent=undefined] - jQuery object to place the "input" into
		 * @param {boolean} [isPrepend=false] - if true, "input" will be prepended to provided "parent"; if false - appended.
		 * @returns {jQuery}
		 */
		getInput: function(attrs, value, parent, isPrepend) {
			var input = $(document.createElement('input'));
			input.val(value);
			
			for(var i = 0; i < attrs.length; i++) {
				var attrItem = attrs[i];
				input.attr(attrItem[0], attrItem[1]);
			}
			
			if(parent != undefined) {
				isPrepend? parent.prepend(input): parent.append(input);
			}
			
			return input;
		},
		
		/**
		 * Builds the "select" DOM element
		 * @param {string[][]} attrs - two-dimensional array of key-value pairs for select attributes.
		 * @example
		 * // will produce <select id="comments" name="comments ></select>
		 * .getSelect([['id', 'comments'], ['name', 'comments]])
		 * @param {Array} [options=undefined] - select options array
		 * @param {jQuery} [parent=undefined] - jQuery object to place the "select" into
		 * @param {boolean} [isPrepend=false] - if true, "select" will be prepended to provided "parent"; if false - appended.
		 * @returns {jQuery}
		 */
		getSelect: function(attrs, options, parent, isPrepend) {
			var select = $(document.createElement('select'));
			
			for(var i = 0; i < attrs.length; i++) {
				var attrItem = attrs[i];
				select.attr(attrItem[0], attrItem[1]);
			}
			
			// TODO implement options building
			
			if(parent != undefined) {
				isPrepend? parent.prepend(select): parent.append(select);
			}
			
			return select;
		}
	};
	
	window.jQueryDomBuilder = builder;
})(window);