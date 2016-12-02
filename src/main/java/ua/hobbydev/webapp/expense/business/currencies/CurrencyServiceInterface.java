/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.business.currencies;

import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceOperationForbiddenException;

public interface CurrencyServiceInterface extends DefaultServiceInterface {
    public void delete(Long id) throws ResourceOperationForbiddenException;
}
