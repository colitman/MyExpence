/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.domain.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;
import ua.hobbydev.webapp.expense.domain.asset.Cash;
import ua.hobbydev.webapp.expense.domain.currency.Currency;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements IdentifiedEntityInterface, UserDetails {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Currency> currencies = new ArrayList<Currency>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cash> cashAssets = new ArrayList<Cash>();

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public List<Currency> getCurrencies() {
        return currencies;
    }

    public void setCurrencies(List<Currency> currencies) {
        this.currencies = currencies;
    }

    public void addCurrency(Currency currency) {
        currencies.add(currency);
        currency.setUser(this);
    }

    public void  removeCurrency(Currency currency) {
        currencies.remove(currency);
        currency.setUser(null);
    }

    @Override
    @Transient
    public List<GrantedAuthority> getAuthorities() {
        return new ArrayList<GrantedAuthority>();
    }

    // ~ ====== UserDetails methods implementation


    @Override
    @Transient
    public boolean isAccountNonExpired() {
        return isEnabled();
    }

    @Override
    @Transient
    public boolean isAccountNonLocked() {
        return isEnabled();
    }

    @Override
    @Transient
    public boolean isCredentialsNonExpired() {
        return isEnabled();
    }

    @Override
    @Transient
    public boolean isEnabled() {
        return true;
    }

    // ~ ======== Hashcode and equals

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User that = (User) o;

        return getId().equals(that.getId());

    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }
}
