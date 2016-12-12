/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.business.currencies;

import org.reflections.Reflections;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ClassUtils;
import ua.hobbydev.webapp.expense.Application;
import ua.hobbydev.webapp.expense.business.DefaultService;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.business.ResourceOperationForbiddenException;
import ua.hobbydev.webapp.expense.domain.IdentifiedEntityInterface;
import ua.hobbydev.webapp.expense.domain.currency.Currency;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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

            Reflections refs = new Reflections(ClassUtils.getPackageName(Application.class) + ".domain.asset");
            Set<Class<? extends Obsolete_Asset>> assetSet = refs.getSubTypesOf(Obsolete_Asset.class);

            List<Obsolete_Asset> assets = new ArrayList<Obsolete_Asset>();

            for(Class<? extends Obsolete_Asset> a:assetSet) {
                assets.addAll(list(a));
            }

            List<Obsolete_Asset> assetsWithCurrency = assets.stream()
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
