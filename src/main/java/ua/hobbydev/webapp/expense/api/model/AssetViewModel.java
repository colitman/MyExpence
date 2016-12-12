/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.*;
import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.asset.AssetConfiguration;
import ua.hobbydev.webapp.expense.domain.currency.Currency;

import java.math.BigDecimal;

public class AssetViewModel implements ViewModelInterface<Asset> {

    private Long id;
    private String name;
    private String type;
    private String label;
    private Long currency;
    private BigDecimal amount;
    private String paymentSystem;
    private String bankName;
    private BigDecimal limit;

    public AssetViewModel() {}

    public AssetViewModel(Asset domain) {
        this.id = domain.getId();
        this.name = domain.getName();
        this.type = domain.getType().toString();
        this.label = domain.getType().getLabel();
        this.currency = domain.getCurrency().getId();
        this.amount = domain.getAmount();

        this.bankName = domain.getConfiguration().getBankName();
        this.paymentSystem = domain.getConfiguration().getPaymentSystem() == null? "": domain.getConfiguration().getPaymentSystem().name();
        this.limit = domain.getConfiguration().getLimit();
    }

    @Override
    public Asset toDomain() {
        Asset domain = new Asset();
        domain.setId(id);
        domain.setName(name);
        domain.setType(AssetType.valueOf(type));
        domain.setAmount(amount);

        Currency assetCurrency = new Currency();
        assetCurrency.setId(currency);

        domain.setCurrency(assetCurrency);

        AssetConfiguration configuration = new AssetConfiguration();
        configuration.setBankName(bankName);
        configuration.setPaymentSystem(PaymentSystemType.valueOf(paymentSystem));
        configuration.setLimit(limit);

        domain.addConfiguration(configuration);

        return domain;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getCurrency() {
        return currency;
    }

    public void setCurrency(Long currency) {
        this.currency = currency;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getPaymentSystem() {
        return paymentSystem;
    }

    public void setPaymentSystem(String paymentSystem) {
        this.paymentSystem = paymentSystem;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public BigDecimal getLimit() {
        return limit;
    }

    public void setLimit(BigDecimal limit) {
        this.limit = limit;
    }
}
