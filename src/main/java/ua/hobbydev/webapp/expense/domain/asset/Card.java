/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.PaymentSystemType;

public interface Card extends BankRelatedAsset {

    public PaymentSystemType getPaymentSystem();
    public void setPaymentSystem(PaymentSystemType paymentSystem);

}
