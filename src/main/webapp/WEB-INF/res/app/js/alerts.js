"use strict";

function Alert(type, title, message) {
	
	var alert = {
		type:type,
		title:title,
		message:message,
		
		show:function() {
			initAlert(buildDOM());
		}
	}
	
	var initAlert = function(alertObject) {
		$('button.close', alertObject).click(function(event) {
			$(alertObject).alert('close');
		});
		
		$(alertObject).alert();
		$(alertObject).addClass('in');
	}
	
	var hashCode = function(stringData) {
		var hash = 0, i, chr, len;
		
		if (stringData.length === 0) return hash;
		
		for (i = 0, len = stringData.length; i < len; i++) {
			chr   = stringData.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		
		return hash;
	};
	
	var buildDOM = function() {
		var alertDiv = $(document.createElement('div'));
		alertDiv.addClass('alert alert-dismissible alert-' + alert.type + ' fade');
		alertDiv.attr('role', 'alert');
		
		var closeButton = $(document.createElement('button'));
		closeButton.attr('type', 'button');
		closeButton.addClass('close');
		closeButton.data('dismiss', 'alert');
		alertDiv.append(closeButton);
		
		var span = $(document.createElement('span'));
		span.html('&times;');
		closeButton.append(span);
		
		var strong = $(document.createElement('strong'));
		strong.text(alert.title);
		alertDiv.append(strong);
		
		var p = $(document.createElement('p'));
		p.text(alert.message);
		alertDiv.append(p);
		
		var code = hashCode(type + title + message);
		
		$('#c-js-alerts .alert').each(function(index, alertObject) {
			if($(alertObject).data('hashcode') === code) {
				$(alertObject).remove();
			}
		});
		
		alertDiv.data('hashcode', code);
		
		$('#c-js-alerts').prepend(alertDiv);
		
		return alertDiv;
	}
	
	Object.seal(alert);
	return alert;
}
