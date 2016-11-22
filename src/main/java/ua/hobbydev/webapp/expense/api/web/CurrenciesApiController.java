/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ua.hobbydev.webapp.expense.api.model.CurrencyViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/currencies")
public class CurrenciesApiController {

    @Autowired
    private DefaultServiceInterface defaultService;

    @RequestMapping(path="", method = RequestMethod.POST)
    public ResponseEntity<String> createCurrency(@ModelAttribute CurrencyViewModel newCurrency, @CurrentUser User currentUser) {

        Currency currency = newCurrency.toDomain();
        currency.setUser(currentUser);

        Long newId = defaultService.add(currency);
        return new ResponseEntity<String>(String.valueOf(newId), HttpStatus.CREATED);
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
