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
import org.springframework.web.bind.annotation.*;
import ua.hobbydev.webapp.expense.EnumUtils.CategoryEnums.CategoryType;
import ua.hobbydev.webapp.expense.EnumUtils.TransactionEnums.TransactionType;
import ua.hobbydev.webapp.expense.api.model.ExpenseViewModel;
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
@RequestMapping(path = "/api/web/")
public class TransactionsApiController {

    @Autowired
    private DefaultServiceInterface defaultService;

    @Autowired
    private UserServiceInterface userService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "expenses", method = RequestMethod.POST)
    public ResponseEntity<String> addExpense(@ModelAttribute ExpenseViewModel expense, @CurrentUser User currentUser) {

        CategoryType type = CategoryType.valueOf(expense.getType());

        Asset asset = null;
        Category category = null;

        try {
            asset = defaultService.get(Asset.class, CategoryType.INCOME.equals(type)? expense.getTo(): expense.getFrom());
            category = defaultService.get(Category.class, expense.getCategory());

            if(!asset.getUser().equals(currentUser) || !category.getUser().equals(currentUser)) {
                return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
            }

            if(CategoryType.INCOME.equals(type)) {
                asset.addToAmount(expense.getAmount());
            } else if(CategoryType.OUTGOING.equals(type)) {
                asset.extractFromAmount(expense.getAmount());
            }

            Transaction t = new Transaction();
            t.setTransactionDate(Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC)));
            t.setAmount(CategoryType.INCOME.equals(type)? expense.getAmount(): expense.getAmount().negate());
            t.setType(CategoryType.INCOME.equals(type)? TransactionType.INCOME: TransactionType.OUTGOING);
            t.setMessage(expense.getDescription());
            t.setUser(currentUser);
            t.setCategory(category);

            if(CategoryType.INCOME.equals(type)) {
                asset.addRecipientTransaction(t);
            } else if(CategoryType.OUTGOING.equals(type)) {
                asset.addSenderTransaction(t);
            }

            defaultService.update(asset);
            return new ResponseEntity<String>(HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "transactions", method = RequestMethod.GET)
    public ResponseEntity<List<TransactionViewModel>> getTransactions(@RequestParam(required = false) Long sender,
                                                                      @RequestParam(required = false) Long recipient,
                                                                      @RequestParam(required = false) String type,
                                                                      @RequestParam(required = false) Long category,
                                                                      @RequestParam(required = false) Long startDate,
                                                                      @RequestParam(required = false) Long endDate,
                                                                      @RequestParam(required = false) String user,
                                                                      @RequestParam(required = false, defaultValue = "false") boolean useOr,
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

        if(useOr) {
            if(sender == null && recipient == null) {

            } else if (sender != null && recipient != null) {
                try {
                    Asset senderAsset = defaultService.get(Asset.class, sender);
                    Asset recipientAsset = defaultService.get(Asset.class, recipient);

                    stream = stream.filter(
                            (t) -> senderAsset.equals(t.getSender()) || recipientAsset.equals(t.getRecipient())
                    );
                } catch (ResourceNotFoundException e) {
                    // TODO add logging
                }
            } else if (sender == null && recipient != null) {
                try {
                    Asset recipientAsset = defaultService.get(Asset.class, recipient);
                    stream = stream.filter((t) -> recipientAsset.equals(t.getRecipient()));
                } catch (ResourceNotFoundException e) {
                    // TODO add logging
                }
            } else if (sender != null && recipient == null) {
                try {
                    Asset senderAsset = defaultService.get(Asset.class, sender);
                    stream = stream.filter((t) -> senderAsset.equals(t.getSender()));
                } catch (ResourceNotFoundException e) {
                    // TODO add logging
                }
            }
        } else {

            if (sender != null) {
                try {
                    Asset senderAsset = defaultService.get(Asset.class, sender);
                    stream = stream.filter((t) -> senderAsset.equals(t.getSender()));
                } catch (ResourceNotFoundException e) {
                    // TODO add logging
                }
            }

            if (recipient != null) {
                try {
                    Asset recipientAsset = defaultService.get(Asset.class, recipient);
                    stream = stream.filter((t) -> recipientAsset.equals(t.getRecipient()));
                } catch (ResourceNotFoundException e) {
                    // TODO add logging
                }
            }
        }

        if(category != null) {
            try {
                Category relatedCategory = defaultService.get(Category.class, category);
                stream = stream.filter((t) -> relatedCategory.equals(t.getCategory()));
            } catch (ResourceNotFoundException e) {
                // TODO add logging
            }
        }

        if(type != null) {
            try {
                TransactionType txType = TransactionType.valueOf(type);
                stream = stream.filter((t) -> txType.equals(t.getType()));
            } catch (IllegalArgumentException e) {
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
