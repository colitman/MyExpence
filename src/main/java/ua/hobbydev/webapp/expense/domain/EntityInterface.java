/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain;

/**
 * Designates a persistent entity
 */
public interface EntityInterface {

    public boolean isDeleted();
    public void setDeleted(boolean deleted);
}
