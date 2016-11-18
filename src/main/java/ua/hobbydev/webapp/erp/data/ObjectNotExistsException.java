/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.data;

/**
 * Exception means that requested entity doe not exist in datastorage
 */
public class ObjectNotExistsException extends Exception {

	private static final long serialVersionUID = 1L;
	/**
	 * @param message - exception message
	 */
	public ObjectNotExistsException(String message) {
		super(message);
	}
}
