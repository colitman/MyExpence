/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;


import ua.hobbydev.webapp.expense.domain.currency.Currency;

public class CurrencyViewModel implements ViewModelInterface<Currency> {
    private Long id;
    private String name;
    private String code;
    private String symbol;
    private String defaultCurrency;

    public CurrencyViewModel() {}

    public CurrencyViewModel(Currency domain) {
        this.id = domain.getId();
        this.name = domain.getName();
        this.code = domain.getCode();
        this.symbol = domain.getSymbol();
        this.defaultCurrency = domain.getDefaultCurrency();
    }

    @Override
    public Currency toDomain() {
        Currency dCurrency = new Currency();

        dCurrency.setId(id);
        dCurrency.setName(name);
        dCurrency.setCode(code);
        dCurrency.setDefaultCurrency(defaultCurrency);
        dCurrency.setSymbol(symbol);

        return dCurrency;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getDefaultCurrency() {
        return defaultCurrency;
    }

    public void setDefaultCurrency(String defaultCurrency) {
        this.defaultCurrency = defaultCurrency;
    }
}
