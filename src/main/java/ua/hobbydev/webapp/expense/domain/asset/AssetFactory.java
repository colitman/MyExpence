/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.*;

public class AssetFactory {

    public static Asset getAssetOfType(AssetType type) {
        if(AssetType.CASH.equals(type)) {
            return new Cash();
        }

        if(AssetType.DEBIT_CARD.equals(type)) {
            return new DebitCard();
        }

        if(AssetType.CREDIT_CARD.equals(type)) {
            return new CreditCard();
        }

        if(AssetType.BANK_ACCOUNT.equals(type)) {
            return new BankAccount();
        }

        return null;
    }
}
