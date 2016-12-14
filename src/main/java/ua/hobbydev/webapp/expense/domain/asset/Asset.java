/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;


import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.AssetType;
import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.transaction.Transaction;
import ua.hobbydev.webapp.expense.domain.user.User;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.*;


@Entity
@Table(name = "assets")
public class Asset implements IdentifiedEntityInterface {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private AssetType type;

    @Column(name = "amount")
    private BigDecimal amount;

    @ManyToOne
    private Currency currency;

    @ManyToOne
    private User user;

    @OneToOne(mappedBy = "asset", cascade = CascadeType.ALL, orphanRemoval = true)
    private AssetConfiguration configuration;

    @OneToMany(mappedBy = "sender", cascade =  CascadeType.ALL)
    private List<Transaction> senderTransactions = new ArrayList<Transaction>();

    @OneToMany(mappedBy = "recipient", cascade =  CascadeType.ALL)
    private List<Transaction> recipientTransactions = new ArrayList<Transaction>();

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AssetType getType() {
        return type;
    }

    public void setType(AssetType type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal addToAmount(BigDecimal addedAmount) {
        return getAmount().add(addedAmount);
    }

    public BigDecimal extractFromAmount(BigDecimal extractedAmount) {
        return getAmount().subtract(extractedAmount);
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public AssetConfiguration getConfiguration() {
        return configuration;
    }

    public void setConfiguration(AssetConfiguration configuration) {
        this.configuration = configuration;
    }

    public void addConfiguration(AssetConfiguration configuration) {
        configuration.setAsset(this);
        this.configuration = configuration;
    }

    public void removeConfiguration() {
        if(configuration != null) {
            configuration.setAsset(null);
            this.configuration = null;
        }
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Transaction> getSenderTransactions() {
        return senderTransactions;
    }

    public void setSenderTransactions(List<Transaction> senderTransactions) {
        this.senderTransactions = senderTransactions;
    }

    public List<Transaction> getRecipientTransactions() {
        return recipientTransactions;
    }

    public void setRecipientTransactions(List<Transaction> recipientTransactions) {
        this.recipientTransactions = recipientTransactions;
    }

    public void addSenderTransaction(Transaction transaction) {
        transaction.setSender(this);
        this.senderTransactions.add(transaction);
    }

    public void removeSenderTransaction(Transaction transaction) {
        transaction.setSender(null);
        this.senderTransactions.remove(transaction);
    }

    public void addRecipientTransaction(Transaction transaction) {
        transaction.setRecipient(this);
        this.recipientTransactions.add(transaction);
    }

    public void removeRecipientTransaction(Transaction transaction) {
        transaction.setRecipient(null);
        this.recipientTransactions.remove(transaction);
    }

    @Override
    public boolean isDeleted() {
        return deleted;
    }

    @Override
    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    @Transient
    public List<Transaction> getTransactions() {
        List<Transaction> all = new ArrayList<Transaction>();

        all.addAll(getRecipientTransactions());
        all.addAll(getSenderTransactions());

        Collections.sort(all);

        return all;
    }

    // ~ ======== Hashcode and equals

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Asset that = (Asset) o;

        return getId().equals(that.getId());

    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
