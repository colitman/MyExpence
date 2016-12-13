/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ua.hobbydev.webapp.expense.EnumUtils.CategoryEnums.CategoryType;
import ua.hobbydev.webapp.expense.api.model.CategoryViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.business.users.UserServiceInterface;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.category.Category;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/web/categories")
public class CategoriesApiController {

    @Autowired
    private DefaultServiceInterface defaultService;
    @Autowired
    private UserServiceInterface userService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="income", method = RequestMethod.GET)
    public ResponseEntity<List<CategoryViewModel>> getIncomeCategoriesList(@CurrentUser User currentUser) {

        /*List<Category> categories = new ArrayList<Category>();

        categories = defaultService.list(Category.class);*/

        List<Category> categories = currentUser.getCategories();

        List<Category> incomeCategories = categories.stream()
        .filter(
                (category) -> !category.isDeleted() && category.getType().equals(CategoryType.INCOME)
        ).collect(Collectors.toList());

        List<CategoryViewModel> viewModels = new ArrayList<CategoryViewModel>();

        for(Category a:incomeCategories) {
            viewModels.add(new CategoryViewModel(a));
        }

        return new ResponseEntity<List<CategoryViewModel>>(viewModels, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="outgoing", method = RequestMethod.GET)
    public ResponseEntity<List<CategoryViewModel>> getOutgoingCategoriesList(@CurrentUser User currentUser) {

        /*List<Category> categories = new ArrayList<Category>();

        categories = defaultService.list(Category.class);*/

        List<Category> categories = currentUser.getCategories();

        List<Category> outgoingCategories = categories.stream()
                .filter(
                        (category) -> !category.isDeleted() && category.getType().equals(CategoryType.OUTGOING)
                ).collect(Collectors.toList());

        List<CategoryViewModel> viewModels = new ArrayList<CategoryViewModel>();

        for(Category a:outgoingCategories) {
            viewModels.add(new CategoryViewModel(a));
        }

        return new ResponseEntity<List<CategoryViewModel>>(viewModels, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.GET)
    public ResponseEntity<CategoryViewModel> getCategoryById(@PathVariable Long id, @CurrentUser User currentUser) {
        Category category = null;
        CategoryViewModel categoryVm = null;

        try {
            category = defaultService.get(Category.class, id);

            if(!currentUser.getCategories().contains(category) || category.isDeleted()) {
                return new ResponseEntity<CategoryViewModel>(HttpStatus.NOT_FOUND);
            }

            categoryVm = new CategoryViewModel(category);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<CategoryViewModel>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<CategoryViewModel>(categoryVm, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="", method = RequestMethod.POST)
    public ResponseEntity<String> createCategory(@ModelAttribute CategoryViewModel newCategory, @CurrentUser User currentUser) {

        Category category = newCategory.toDomain();
        /*User user = userService.loadUserByUsername(currentUser.getUsername());*/
        category.setUser(currentUser);

        Long newId = defaultService.add(category);
        return new ResponseEntity<String>(String.valueOf(newId), HttpStatus.CREATED);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id, @CurrentUser User currentUser) {

        for(Category c:currentUser.getCategories()) {
            if(c.getId().equals(id)) {
                defaultService.delete(Category.class, id);
                return new ResponseEntity<String>("Deleted", HttpStatus.OK);
            }
        }

        return new ResponseEntity<String>("No content", HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateCategoryById(@PathVariable Long id, @ModelAttribute CategoryViewModel categoryVm, @CurrentUser User currentUser) {
        Category category = null;

        try {
            category = defaultService.get(Category.class, id);

            if(!currentUser.getCategories().contains(category) || category.isDeleted()) {
                return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
            }

            category.setName(categoryVm.getName());
            defaultService.update(category);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>("Updated", HttpStatus.OK);
    }
}
