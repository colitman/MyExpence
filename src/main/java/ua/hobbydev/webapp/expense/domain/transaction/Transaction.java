/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.transaction;

import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;
import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.category.Category;
import ua.hobbydev.webapp.expense.domain.user.User;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Calendar;

@Entity
@Table(name = "transactions")
public class Transaction implements IdentifiedEntityInterface, Comparable<Transaction> {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transactionDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Calendar transactionDate;

    /*@ManyToOne
    private Asset asset;*/

    @ManyToOne
    private Asset sender;

    @ManyToOne
    private Asset recipient;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "message")
    private String message;

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;

    @Column(name = "deleted")
    private boolean deleted;

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Calendar getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(Calendar transactionDate) {
        this.transactionDate = transactionDate;
    }

    public Asset getSender() {
        return sender;
    }

    public void setSender(Asset sender) {
        this.sender = sender;
    }

    public Asset getRecipient() {
        return recipient;
    }

    public void setRecipient(Asset recipient) {
        this.recipient = recipient;
    }

    /*public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }*/

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean isDeleted() {
        return deleted;
    }

    @Override
    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @Override
    public int compareTo(Transaction otherTransaction) {
        int order = getTransactionDate().compareTo(otherTransaction.getTransactionDate());

        if(order == 0) {
            order = getId().compareTo(otherTransaction.getId());
        }

        return order;
    }

    // ~ ======== Hashcode and equals

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Transaction that = (Transaction) o;

        return getId().equals(that.getId());

    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
