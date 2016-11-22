/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;

/**
 * Created by dmytro.romenskyi on 11/22/2016.
 */
public interface ViewModelInterface<T> {

    public T toDomain();
}
