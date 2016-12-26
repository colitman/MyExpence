/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model;

import ua.hobbydev.webapp.expense.domain.transaction.Transaction;

import java.math.BigDecimal;

public class TransactionViewModel implements ViewModelInterface<Transaction> {

    private Long id;
    private String type;
    private Long transactionDate;
    private String sender;
    private String recipient;
    private BigDecimal amount;
    private String message;
    private String category;

    public TransactionViewModel() {}

    public TransactionViewModel(Transaction transaction) {
        this.id = transaction.getId();
        this.type = transaction.getType().getLabel();
        this.transactionDate = transaction.getTransactionDate().getTimeInMillis();
        this.sender = transaction.getSender() == null? "": transaction.getSender().getName();
        this.recipient = transaction.getRecipient() == null? "": transaction.getRecipient().getName();
        this.amount = transaction.getAmount();
        this.message = transaction.getMessage();
        this.category = transaction.getCategory() == null? "": transaction.getCategory().getName();
    }

    @Override
    public Transaction toDomain() {
        throw new UnsupportedOperationException();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Long transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
