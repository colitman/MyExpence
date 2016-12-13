/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.business.currencies;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.hobbydev.webapp.expense.business.DefaultService;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.business.ResourceOperationForbiddenException;
import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;
import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.currency.Currency;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CurrencyService extends DefaultService implements CurrencyServiceInterface {

    @Override
    @Transactional
    public <ENTITY extends IdentifiedEntityInterface> void delete(Class<ENTITY> clazz, Long id) {
        try {
            this.delete(id);
        } catch (ResourceOperationForbiddenException e) {
            // TODO add logging
        }
    }

    @Override
    @Transactional
    public void delete(Long id) throws ResourceOperationForbiddenException {
        try {
            Currency currency = get(Currency.class, id);

            List<Asset> assets = list(Asset.class);

            List<Asset> assetsWithCurrency = assets.stream()
                    .filter(
                            (asset) -> asset.getCurrency().getId().equals(currency.getId())
                    ).collect(Collectors.toList());

            if(!assetsWithCurrency.isEmpty()) {
                throw new ResourceOperationForbiddenException("Currency cannot be deleted, since it has one or more assets associated.");
            }

            getDAO().delete(currency);

        } catch (ResourceNotFoundException e) {
            // TODO add logging
        }
    }
}
