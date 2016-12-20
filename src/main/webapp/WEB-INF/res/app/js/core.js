"use strict";

/**
 * Observer object base implementation
 */
function Observer() {
	var observer = {
		
		/**
		 * Method doing nothing and intended to be overriden in subclasses.
		 * @param {*} [subject=undefined] - any data that related to change event
		 * @param {string} [message=undefined] - optional message that may be provided with a notification
		 */
		update: function(subject, message) {
			
		}
	}
	
	return observer;
}

/**
 * Observable object base implementation
 */
function Observable() {
	
	var observable = {
		
		/**
		 * Registers an object, provided as argument as an observer for current object's state
		 * @param {Observer} observer - object that will receive notifications about current object change events
		 */
		subscribe: function(observer) {
			observers.push(observer);
		},
		
		/**
		 * Sets the current object as one that had been changed
		 */
		setChanged: function() {
			changed = true;
		},
		
		/**
		 * Sends notifications about current object change event to all observers and clears the changed status for current object afterwards
		 * @param {*} [subject=undefined] - any data that related to change event
		 * @param {string} [message=undefined] - optional message that may be provided with a notification
		 */
		notifyObservers: function(subject, message) {
			
			if(!isChanged()) {
				return;
			}
			
			for(var i = 0; i < observers.length; i++) {
				var observer = observers[i];
				observer.update(subject, message);
			}
			
			clearChanged();
		}
	};
	
	/* Private fields */
	var observers = [];
	var changed = false;
	var _this = this;
	
	/* Private methods */
	
	/**
	 * Counts how many observers are registered for the current object
	 * @returns {number} amount of registered observers
	 */
	var countObservers = function() {
		return observers.length;
	};
	
	/**
	 * Returns the "changed" flag for current object
	 * @returns {boolean} true if object is in changed state. False otherwise.
	 */
	var isChanged = function() {
		return changed;
	};
	
	/**
	 * Sets the "changed" flag to false for current object
	 */
	var clearChanged = function() {
		changed = false;
	};
	
	/**
	 * Unsubscribes all observers from the current object
	 */
	var deleteObservers = function() {
		observers.length = 0;
	};
	
	return observable;
}




/*function ViewEvent(name, data) {
 var viewEvent = {
 name:name,
 data:data
 }
 
 Object.seal(viewEvent);
 return viewEvent;
 }*/