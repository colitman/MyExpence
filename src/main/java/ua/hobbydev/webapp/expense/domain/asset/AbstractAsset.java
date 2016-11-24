/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.*;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.math.BigDecimal;

public abstract class AbstractAsset implements Asset {

    private Long id;
    private String name;
    private AssetType type;
    private BigDecimal amount;
    private Currency currency;
    private User user;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public AssetType getType() {
        return type;
    }

    @Override
    public void setType(AssetType type) {
        this.type = type;
    }

    @Override
    public BigDecimal getAmount() {
        return amount;
    }

    @Override
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Override
    public BigDecimal addToAmount(BigDecimal addedAmount) {
        return getAmount().add(addedAmount);
    }

    @Override
    public BigDecimal extractFromAmount(BigDecimal extractedAmount) {
        return getAmount().subtract(extractedAmount);
    }

    @Override
    public Currency getCurrency() {
        return currency;
    }

    @Override
    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    @Override
    public User getUser() {
        return user;
    }

    @Override
    public void setUser(User user) {
        this.user = user;
    }
}
