/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;


import ua.hobbydev.webapp.expense.domain.asset.Asset;

public class AssetViewModel implements ViewModelInterface<Asset> {

    private Long id;
    private String name;
    private String type;
    private String label;
    private Long currency;

    public AssetViewModel() {}

    public AssetViewModel(Asset domain) {
        this.id = domain.getId();
        this.name = domain.getName();
        this.type = domain.getType().toString();
        this.label = domain.getType().getLabel();
        this.currency = domain.getCurrency().getId();
    }

    @Override
    public Asset toDomain() {
        return null;
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
}
