/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.AssetType;
import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.PaymentSystemType;
import ua.hobbydev.webapp.expense.api.model.AssetTypeViewModel;
import ua.hobbydev.webapp.expense.api.model.AssetViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.asset.AssetConfiguration;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.transaction.Transaction;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.math.BigDecimal;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/web/assets")
public class AssetsApiController {

    @Autowired
    private DefaultServiceInterface defaultService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="", method = RequestMethod.POST)
    public ResponseEntity<String> createAsset(@ModelAttribute AssetViewModel newAsset, @CurrentUser User currentUser) {

        Currency currency = null;

        try {
            currency = defaultService.get(Currency.class, newAsset.getCurrency());
            String assetType = newAsset.getType();
            AssetType enumType = AssetType.valueOf(assetType);
            Asset asset = new Asset();
            asset.setName(newAsset.getName());
            asset.setUser(currentUser);
            asset.setType(enumType);
            asset.setCurrency(currency);
            asset.setAmount(BigDecimal.ZERO);

            Transaction t = new Transaction();
            t.setUser(currentUser);

            Calendar date = Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC));
            t.setTransactionDate(date);
            t.setAmount(BigDecimal.ZERO);
            t.setMessage("Asset created.");

            AssetConfiguration configuration = new AssetConfiguration();

            asset.addRecipientTransaction(t);
            asset.addConfiguration(configuration);

            Long newId = defaultService.add(asset);

            return new ResponseEntity<String>(String.valueOf(newId), HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(path = "types", method = RequestMethod.GET)
    public ResponseEntity<List<AssetTypeViewModel>> getAssetTypes() {

        List<AssetTypeViewModel> types = new ArrayList<AssetTypeViewModel>();

        for(AssetType a:AssetType.values()) {
            types.add(new AssetTypeViewModel(a));
        }

        return new ResponseEntity<List<AssetTypeViewModel>>(types, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="", method = RequestMethod.GET)
    public ResponseEntity<List<AssetViewModel>> getAssetList(@CurrentUser User currentUser) {

        List<Asset> assets = defaultService.list(Asset.class);

        List<Asset> userAssets = assets.stream()
                .filter(
                        (asset) -> asset.getUser().equals(currentUser)
                ).collect(Collectors.toList());

        List<AssetViewModel> viewModels = new ArrayList<AssetViewModel>();

        for(Asset a:userAssets) {
            viewModels.add(new AssetViewModel(a));
        }

        return new ResponseEntity<List<AssetViewModel>>(viewModels, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.GET)
    public ResponseEntity<AssetViewModel> getAssetById(@PathVariable Long id, @CurrentUser User currentUser) {
        Asset asset = null;
        AssetViewModel assetVm = null;

        try {
            asset = defaultService.get(Asset.class, id);

            if(!asset.getUser().equals(currentUser)) {
                return new ResponseEntity<AssetViewModel>(HttpStatus.NOT_FOUND);
            }

            assetVm = new AssetViewModel(asset);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<AssetViewModel>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<AssetViewModel>(assetVm, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteAssetById(@PathVariable Long id, @CurrentUser User currentUser) {

        try {
            Asset asset = defaultService.get(Asset.class, id);
            if(asset.getUser().equals(currentUser)) {

                Transaction t = new Transaction();
                t.setAmount(BigDecimal.ZERO);
                t.setUser(currentUser);
                t.setTransactionDate(Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC)));
                t.setSender(asset);
                t.setMessage("Asset deleted.");

                defaultService.delete(Asset.class, id);
                defaultService.delete(AssetConfiguration.class, asset.getConfiguration().getId());
                defaultService.add(t);
                return new ResponseEntity<String>("Deleted", HttpStatus.OK);
            }
            return new ResponseEntity<String>("No content", HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateAssetById(@PathVariable Long id, @ModelAttribute AssetViewModel assetVm, @CurrentUser User currentUser) {
        Asset asset = null;

        try {
            asset = defaultService.get(Asset.class, id);

            if(!asset.getUser().equals(currentUser)) {
                return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
            }

            asset.setName(assetVm.getName());

            Currency currency = defaultService.get(Currency.class, assetVm.getCurrency());
            asset.setCurrency(currency);

            if(asset.getAmount().compareTo(assetVm.getAmount()) != 0) { // i.e. if amount was changed
                Transaction t = new Transaction();
                t.setUser(currentUser);
                t.setTransactionDate(Calendar.getInstance(TimeZone.getTimeZone(ZoneOffset.UTC)));
                t.setAmount(assetVm.getAmount().subtract(asset.getAmount()));
                t.setRecipient(asset);
                t.setMessage("Asset amount change.");

                defaultService.add(t);
            }

            asset.setAmount(assetVm.getAmount());

            if(asset.getType() == AssetType.BANK_ACCOUNT ||
                    asset.getType() == AssetType.DEBIT_CARD ||
                    asset.getType() == AssetType.CREDIT_CARD) {

                asset.getConfiguration().setBankName(assetVm.getBankName());

                if(asset.getType() == AssetType.DEBIT_CARD ||
                        asset.getType() == AssetType.CREDIT_CARD) {

                    asset.getConfiguration().setPaymentSystem(PaymentSystemType.valueOf(assetVm.getPaymentSystem()));

                    if(asset.getType() == AssetType.CREDIT_CARD) {
                        asset.getConfiguration().setLimit(assetVm.getLimit());
                    }
                }
            }


            defaultService.update(asset);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<String>("Updated", HttpStatus.OK);
    }
}
