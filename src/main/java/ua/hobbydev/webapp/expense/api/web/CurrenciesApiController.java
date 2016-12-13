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
import ua.hobbydev.webapp.expense.api.model.CurrencyViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.business.ResourceOperationForbiddenException;
import ua.hobbydev.webapp.expense.business.currencies.CurrencyServiceInterface;
import ua.hobbydev.webapp.expense.business.users.UserServiceInterface;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/web/currencies")
public class CurrenciesApiController {

    @Autowired
    private DefaultServiceInterface defaultService;
    @Autowired
    private UserServiceInterface userService;
    @Autowired
    private CurrencyServiceInterface currencyService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}/default", method = RequestMethod.PUT)
    public ResponseEntity<String> setDefaultCurrency(@PathVariable Long id, @CurrentUser User currentUser) {

        /*User user = userService.loadUserByUsername(currentUser.getUsername());*/

        Currency newDefaultCurrency = null;

        try {
            newDefaultCurrency = defaultService.get(Currency.class, id);

            if(!currentUser.getCurrencies().contains(newDefaultCurrency) || newDefaultCurrency.isDeleted()) {
                return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
            }

        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        List<Currency> userCurrencies = currentUser.getCurrencies();
        Currency oldDefaultCurrency = userCurrencies.stream()
                .filter(
                        (currency) -> currency.isDefaultCurrency()
                ).findFirst()
                .orElse(null);

        if(oldDefaultCurrency != null) {
            try {
                oldDefaultCurrency = defaultService.get(Currency.class, oldDefaultCurrency.getId());
                oldDefaultCurrency.setDefaultCurrency(false);
                defaultService.update(oldDefaultCurrency);
            } catch (ResourceNotFoundException e) {
                //TODO think on it
            }
        }

        try {
            newDefaultCurrency.setDefaultCurrency(true);
            defaultService.update(newDefaultCurrency);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>("Currency not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="", method = RequestMethod.POST)
    public ResponseEntity<String> createCurrency(@ModelAttribute CurrencyViewModel newCurrency, @CurrentUser User currentUser) {

        Currency currency = newCurrency.toDomain();

        User user = userService.loadUserByUsername(currentUser.getUsername());

        if(user.getCurrencies().isEmpty()) {
            currency.setDefaultCurrency(true);
        }

        currency.setUser(currentUser);

        Long newId = defaultService.add(currency);
        return new ResponseEntity<String>(String.valueOf(newId), HttpStatus.CREATED);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.GET)
    public ResponseEntity<CurrencyViewModel> getCurrencyById(@PathVariable Long id, @CurrentUser User currentUser) {
        Currency currency = null;
        CurrencyViewModel currencyVm = null;

        try {
            currency = defaultService.get(Currency.class, id);

            if(!currentUser.getCurrencies().contains(currency) || currency.isDeleted()) {
                return new ResponseEntity<CurrencyViewModel>(HttpStatus.NOT_FOUND);
            }

            currencyVm = new CurrencyViewModel(currency);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<CurrencyViewModel>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<CurrencyViewModel>(currencyVm, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteCurrencyById(@PathVariable Long id, @CurrentUser User currentUser) {
        try {

            for(Currency c:currentUser.getCurrencies()) {
                if(c.getId().equals(id)) {
                    currencyService.delete(id);
                    return new ResponseEntity<String>("Deleted", HttpStatus.OK);
                }
            }

        } catch (ResourceOperationForbiddenException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        return new ResponseEntity<String>("No content", HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateCurrencyById(@PathVariable Long id, @ModelAttribute CurrencyViewModel currencyVm, @CurrentUser User currentUser) {
        Currency currency = null;

        try {
            currency = defaultService.get(Currency.class, id);

            if(!currentUser.getCurrencies().contains(currency) || currency.isDeleted()) {
                return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
            }

            Currency updated = currencyVm.toDomain();
            updated.setId(currency.getId());
            updated.setUser(currency.getUser());
            updated.setDefaultCurrency(currency.isDefaultCurrency());
            defaultService.update(updated);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>("Updated", HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="", method = RequestMethod.GET)
    public ResponseEntity<List<CurrencyViewModel>> getCurrencyList(@CurrentUser User currentUser) {
        List<Currency> currencies = currentUser.getCurrencies();

        List<Currency> userCurrencies = currencies.stream()
                .filter(
                        (currency) -> !currency.isDeleted()
                ).collect(Collectors.toList());

        List<CurrencyViewModel> viewModels = new ArrayList<CurrencyViewModel>();

        for(Currency c:userCurrencies) {
            viewModels.add(new CurrencyViewModel(c));
        }

        return new ResponseEntity<List<CurrencyViewModel>>(viewModels, HttpStatus.OK);
    }
}
