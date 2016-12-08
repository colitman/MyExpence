"use strict";

function ViewEvent(name, data) {
	var viewEvent = {
		name:name,
		data:data
	}
	
	Object.seal(viewEvent);
	return viewEvent;
}

function Observable() {
	var observers = [];
	var changed = false;
	var _this = this;
	
	var observable = {
		
		subscribe: function(observer) {
			observers.push(observer);
		},
		
		countObservers: function() {
			return observers.length;
		},
	
		isChanged: function() {
			return changed;
		},
		
		setChanged: function() {
			changed = true;
		},
		
		clearChanged: function() {
			changed = false;
		},
		
		deleteObservers: function() {
			observers.length = 0;
		},
		
		notifyObservers: function(subject) {
			
			if(!this.isChanged()) {
				return;
			}
			
			for(var i = 0; i < observers.length; i++) {
				var observer = observers[i];
				observer.update(subject);
			}
			
			this.clearChanged();
		}
	};
	
	return observable;
}
