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
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.domain.currency.Currency;

import java.util.List;

@RestController
@RequestMapping(path = "/currencies")
public class CurrenciesApiController {

    @Autowired
    private DefaultServiceInterface defaultService;

    @RequestMapping(path="", method = RequestMethod.POST)
    public ResponseEntity<String> createCurrency(@ModelAttribute Currency newCurrency) {
        Long newId = defaultService.add(newCurrency);
        return new ResponseEntity<String>(String.valueOf(newId), HttpStatus.CREATED);
    }

    @RequestMapping(path="", method = RequestMethod.GET)
    public ResponseEntity<List<Currency>> getCurrencyList() {
        List<Currency> currencies = defaultService.list(Currency.class);
        return new ResponseEntity<List<Currency>>(currencies, HttpStatus.OK);
    }
}
