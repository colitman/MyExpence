/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.AssetType;
import ua.hobbydev.webapp.expense.api.model.AssetTypeViewModel;
import ua.hobbydev.webapp.expense.api.model.AssetViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.business.users.UserServiceInterface;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.asset.Cash;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/web/assets")
public class AssetsApiController {

    @Autowired
    private DefaultServiceInterface defaultService;
    @Autowired
    private UserServiceInterface userService;

    @RequestMapping(path="", method = RequestMethod.POST)
    public ResponseEntity<String> createAsset(@ModelAttribute AssetViewModel newAsset, @CurrentUser User currentUser) {

        Currency currency = null;

        try {
            currency = defaultService.get(Currency.class, newAsset.getCurrency());
            String assetType = newAsset.getType();
            AssetType enumType = AssetType.valueOf(assetType);
            //Asset asset = AssetFactory.getAssetOfType(enumType);
            Cash asset = new Cash();
            asset.setName(newAsset.getName());
            asset.setUser(currentUser);
            asset.setType(enumType);
            asset.setCurrency(currency);
            Long newId = defaultService.add(asset);
            return new ResponseEntity<String>(String.valueOf(newId), HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
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
}