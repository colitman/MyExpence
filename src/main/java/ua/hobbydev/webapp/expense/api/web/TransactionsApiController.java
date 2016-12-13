/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.hobbydev.webapp.expense.api.model.TransactionViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.business.users.UserServiceInterface;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.category.Category;
import ua.hobbydev.webapp.expense.domain.transaction.Transaction;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping(path = "/api/web/transactions")
public class TransactionsApiController {

    @Autowired
    private DefaultServiceInterface defaultService;

    @Autowired
    private UserServiceInterface userService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "", method = RequestMethod.GET)
    public ResponseEntity<List<TransactionViewModel>> getTransactions(@RequestParam(required = false) Long sender,
                                                                @RequestParam(required = false) Long recipient,
                                                                @RequestParam(required = false) Long category,
                                                                @RequestParam(required = false) Long startDate,
                                                                @RequestParam(required = false) Long endDate,
                                                                @RequestParam(required = false) String user,
                                                                @CurrentUser User currentUser) {
        if(user != null) {
            try {
                User requestingUser = userService.loadUserByUsername(user);
                if(!requestingUser.getId().equals(currentUser.getId())) {
                    return new ResponseEntity<List<TransactionViewModel>>(HttpStatus.FORBIDDEN);
                }
            } catch (UsernameNotFoundException unfe) {
                return new ResponseEntity<List<TransactionViewModel>>(HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }

        List<Transaction> transactions = defaultService.list(Transaction.class);
        Stream<Transaction> stream = transactions.stream().filter((t) -> t.getUser().equals(currentUser));

        if(sender != null) {
            try {
                Asset senderAsset = defaultService.get(Asset.class, sender);
                stream = stream.filter((t) -> senderAsset.equals(t.getSender()));
            } catch (ResourceNotFoundException e) {
                // TODO add logging
            }
        }

        if(recipient != null) {
            try {
                Asset recipientAsset = defaultService.get(Asset.class, recipient);
                stream = stream.filter((t) -> recipientAsset.equals(t.getRecipient()));
            } catch (ResourceNotFoundException e) {
                // TODO add logging
            }
        }

        if(category != null) {
            try {
                Category relatedCategory = defaultService.get(Category.class, category);
                stream = stream.filter((t) -> t.getCategory().equals(relatedCategory));
            } catch (ResourceNotFoundException e) {
                // TODO add logging
            }
        }

        if(startDate != null) {
            Calendar date = Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC));
            date.setTimeInMillis(startDate);
            stream = stream.filter((t) -> !t.getTransactionDate().before(date));
        }

        if(endDate != null) {
            Calendar date = Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC));
            date.setTimeInMillis(endDate);
            stream = stream.filter((t) -> !t.getTransactionDate().after(date));
        }

        List<Transaction> filtered = stream.collect(Collectors.toList());
        Collections.sort(filtered);

        List<TransactionViewModel> vms = new ArrayList<TransactionViewModel>();

        for(Transaction t:filtered) {
            vms.add(new TransactionViewModel(t));
        }

        return new ResponseEntity<List<TransactionViewModel>>(vms, HttpStatus.OK);
    }
}
