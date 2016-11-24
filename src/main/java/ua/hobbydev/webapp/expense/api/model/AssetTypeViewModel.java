/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.AssetType;

public class AssetTypeViewModel implements ViewModelInterface<AssetType> {

    private String name;
    private String label;

    public AssetTypeViewModel() {}

    public AssetTypeViewModel(AssetType domain) {
        this.name = domain.toString();
        this.label = domain.getLabel();
    }

    @Override
    public AssetType toDomain() {
        return AssetType.valueOf(name);
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
