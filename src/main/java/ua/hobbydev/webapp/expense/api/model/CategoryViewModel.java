/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;


import ua.hobbydev.webapp.expense.EnumUtils.CategoryEnums.CategoryType;
import ua.hobbydev.webapp.expense.domain.category.Category;

public class CategoryViewModel implements ViewModelInterface<Category> {

    private Long id;
    private String name;
    private String type;

    public CategoryViewModel() {}

    public CategoryViewModel(Category domain) {
        this.id = domain.getId();
        this.name = domain.getName();
        this.type = domain.getType().toString();
    }

    @Override
    public Category toDomain() {
        Category domain = new Category();
        domain.setId(id);
        domain.setName(name);
        domain.setType(CategoryType.valueOf(type));
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
}
