/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.hobbydev.webapp.expense.api.model.CurrencyViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
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

    @RequestMapping(path="default", method = RequestMethod.POST)
    public ResponseEntity<String> setDefaultCurrency(@RequestParam Long id, @CurrentUser User currentUser) {

        User user = userService.loadUserByUsername(currentUser.getUsername());

        List<Currency> userCurrencies = user.getCurrencies();
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
            Currency newDefaultCurrency = defaultService.get(Currency.class, id);
            newDefaultCurrency.setDefaultCurrency(true);
            defaultService.update(newDefaultCurrency);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>("Currency not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }

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

    @RequestMapping(path="{id}", method = RequestMethod.GET)
    public ResponseEntity<CurrencyViewModel> getCurrencyById(@PathVariable Long id, @CurrentUser User currentUser) {
        Currency currency = null;
        CurrencyViewModel currencyVm = null;

        try {
            currency = defaultService.get(Currency.class, id);
            currencyVm = new CurrencyViewModel(currency);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<CurrencyViewModel>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<CurrencyViewModel>(currencyVm, HttpStatus.OK);
    }

    @RequestMapping(path="{id}/delete", method = RequestMethod.POST)
    public ResponseEntity<String> deleteCurrencyById(@PathVariable Long id, @CurrentUser User currentUser) {
        defaultService.delete(Currency.class, id);
        return new ResponseEntity<String>("Deleted", HttpStatus.OK);
    }

    @RequestMapping(path="{id}/update", method = RequestMethod.POST)
    public ResponseEntity<String> updateCurrencyById(@PathVariable Long id, @ModelAttribute CurrencyViewModel currencyVm, @CurrentUser User currentUser) {
        Currency currency = null;

        try {
            currency = defaultService.get(Currency.class, id);
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

    @RequestMapping(path="", method = RequestMethod.GET)
    public ResponseEntity<List<CurrencyViewModel>> getCurrencyList(@CurrentUser User currentUser) {
        List<Currency> currencies = defaultService.list(Currency.class);

        List<Currency> userCurrencies = currencies.stream()
                .filter(
                        (currency) -> currency.getUser().equals(currentUser)
                ).collect(Collectors.toList());

        List<CurrencyViewModel> viewModels = new ArrayList<CurrencyViewModel>();

        for(Currency c:userCurrencies) {
            viewModels.add(new CurrencyViewModel(c));
        }

        return new ResponseEntity<List<CurrencyViewModel>>(viewModels, HttpStatus.OK);
    }
}
