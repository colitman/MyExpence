package ua.hobbydev.webapp.expense.business;

public class ResourceOperationForbiddenException extends Exception {

	private static final long serialVersionUID = 1L;

	public ResourceOperationForbiddenException(String message) {
		super(message);
	}

	public ResourceOperationForbiddenException(String message, Throwable cause) {
		super(message, cause);
	}

}
