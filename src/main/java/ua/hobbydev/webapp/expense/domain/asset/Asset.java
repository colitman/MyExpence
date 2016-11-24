/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.*;
import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.math.BigDecimal;

public interface Asset extends IdentifiedEntityInterface {

    public String getName();
    public void setName(String name);

    public AssetType getType();
    public void setType(AssetType assetType);

    public BigDecimal getAmount();
    public void setAmount(BigDecimal amount);
    public BigDecimal addToAmount(BigDecimal addedAmount);
    public BigDecimal extractFromAmount(BigDecimal extractedAmount);

    public Currency getCurrency();
    public void setCurrency(Currency currency);

    public User getUser();
    public void setUser(User user);
}
