/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;


public interface BankRelatedAsset extends Asset {

    public String getBankName();
    public void setBankName(String name);

}
