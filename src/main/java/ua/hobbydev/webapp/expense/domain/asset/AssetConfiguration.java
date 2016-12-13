/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.asset;

import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.*;
import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "asset_configurations")
public class AssetConfiguration implements IdentifiedEntityInterface {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Asset asset;

    @Column(name = "bankName")
    private String bankName;

    @Enumerated(EnumType.STRING)
    @Column(name = "paymentSystem")
    private PaymentSystemType paymentSystem;

    @Column(name = "creditLimit")
    private BigDecimal limit;

    @Column(name = "deleted")
    private boolean deleted;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Asset getAsset() {
        return asset;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public PaymentSystemType getPaymentSystem() {
        return paymentSystem;
    }

    public void setPaymentSystem(PaymentSystemType paymentSystem) {
        this.paymentSystem = paymentSystem;
    }

    public BigDecimal getLimit() {
        return limit;
    }

    public void setLimit(BigDecimal limit) {
        this.limit = limit;
    }

    @Override
    public boolean isDeleted() {
        return deleted;
    }

    @Override
    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    // ~ ======== Hashcode and equals

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AssetConfiguration that = (AssetConfiguration) o;

        return getId().equals(that.getId());

    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
