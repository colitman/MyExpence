/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;


import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.asset.AssetConfiguration;

import java.math.BigDecimal;

public class BackendAssetViewModel implements ViewModelInterface<Asset> {

    private Long id;
    private String name;
    private AssetTypeViewModel type;
    private CurrencyViewModel currency;
    private BigDecimal amount;
    private PaymentSystemViewModel paymentSystem;
    private String bankName;
    private BigDecimal limit;
    private boolean showInTotals;

    public BackendAssetViewModel() {}

    public BackendAssetViewModel(Asset domain) {
        this.id = domain.getId();
        this.name = domain.getName();
        this.type = new AssetTypeViewModel(domain.getType());
        this.currency = new CurrencyViewModel(domain.getCurrency());
        this.amount = domain.getAmount();

        this.bankName = domain.getConfiguration().getBankName();
        this.paymentSystem = domain.getConfiguration().getPaymentSystem() == null? null: new PaymentSystemViewModel(domain.getConfiguration().getPaymentSystem());
        this.limit = domain.getConfiguration().getLimit();
        this.showInTotals = domain.isShowInTotals();
    }

    @Override
    public Asset toDomain() {
        Asset domain = new Asset();
        domain.setId(id);
        domain.setName(name);
        domain.setType(type.toDomain());
        domain.setAmount(amount);
        domain.setShowInTotals(showInTotals);

        /*Currency assetCurrency = new Currency();
        assetCurrency.setId(currency);*/

        domain.setCurrency(currency.toDomain());

        AssetConfiguration configuration = new AssetConfiguration();
        configuration.setBankName(bankName);
        configuration.setPaymentSystem(paymentSystem.toDomain());
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

    public AssetTypeViewModel getType() {
        return type;
    }

    public void setType(AssetTypeViewModel type) {
        this.type = type;
    }

    public CurrencyViewModel getCurrency() {
        return currency;
    }

    public void setCurrency(CurrencyViewModel currency) {
        this.currency = currency;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentSystemViewModel getPaymentSystem() {
        return paymentSystem;
    }

    public void setPaymentSystem(PaymentSystemViewModel paymentSystem) {
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

    public boolean isShowInTotals() {
        return showInTotals;
    }

    public void setShowInTotals(boolean showInTotals) {
        this.showInTotals = showInTotals;
    }
}
