/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.*;

public class PaymentSystemViewModel implements ViewModelInterface<PaymentSystemType> {

    private String name;
    private String label;

    public PaymentSystemViewModel() {}

    public PaymentSystemViewModel(PaymentSystemType domain) {
        this.name = domain.toString();
        this.label = domain.getLabel();
    }

    @Override
    public PaymentSystemType toDomain() {
        return PaymentSystemType.valueOf(name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
