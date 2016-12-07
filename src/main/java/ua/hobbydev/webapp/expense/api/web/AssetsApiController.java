/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.reflections.Reflections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.*;
import ua.hobbydev.webapp.expense.Application;
import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.AssetType;
import ua.hobbydev.webapp.expense.api.model.AssetTypeViewModel;
import ua.hobbydev.webapp.expense.api.model.AssetViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.business.ResourceNotFoundException;
import ua.hobbydev.webapp.expense.business.users.UserServiceInterface;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.asset.AssetFactory;
import ua.hobbydev.webapp.expense.domain.currency.Currency;
import ua.hobbydev.webapp.expense.domain.user.User;

import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/web/assets")
public class AssetsApiController {

    @Autowired
    private DefaultServiceInterface defaultService;
    @Autowired
    private UserServiceInterface userService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="", method = RequestMethod.POST)
    public ResponseEntity<String> createAsset(@ModelAttribute AssetViewModel newAsset, @CurrentUser User currentUser) {

        Currency currency = null;

        try {
            currency = defaultService.get(Currency.class, newAsset.getCurrency());
            String assetType = newAsset.getType();
            AssetType enumType = AssetType.valueOf(assetType);
            Asset asset = AssetFactory.getAssetOfType(enumType);
            asset.setName(newAsset.getName());
            asset.setUser(userService.loadUserByUsername(currentUser.getUsername()));
            asset.setType(enumType);
            asset.setCurrency(currency);
            asset.setAmount(new BigDecimal(0));
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

        Reflections refs = new Reflections(ClassUtils.getPackageName(Application.class) + ".domain.asset");
        Set<Class<? extends Asset>> assetSet = refs.getSubTypesOf(Asset.class);

        List<Asset> assets = new ArrayList<Asset>();

        for(Class<? extends Asset> a:assetSet) {
            if(!a.isAnnotationPresent(Table.class)) {
                continue;
            }
            assets.addAll(defaultService.list(a));
        }

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
    @RequestMapping(path="{type}/{id}", method = RequestMethod.GET)
    public ResponseEntity<AssetViewModel> getAssetById(@PathVariable Long id, @PathVariable String type, @CurrentUser User currentUser) {
        Asset asset = null;
        AssetViewModel assetVm = null;

        AssetType enumType = AssetType.valueOf(type);
        Class<? extends Asset> assetClass = AssetFactory.getAssetOfType(enumType).getClass();

        try {
            asset = defaultService.get(assetClass, id);
            assetVm = new AssetViewModel(asset);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<AssetViewModel>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<AssetViewModel>(assetVm, HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{type}/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteAssetById(@PathVariable Long id, @PathVariable String type, @CurrentUser User currentUser) {
        AssetType enumType = AssetType.valueOf(type);
        Class<? extends Asset> assetClass = AssetFactory.getAssetOfType(enumType).getClass();

        defaultService.delete(assetClass, id);
        return new ResponseEntity<String>("Deleted", HttpStatus.OK);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path="{type}/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateAssetById(@PathVariable Long id, @PathVariable String type, @ModelAttribute AssetViewModel assetVm, @CurrentUser User currentUser) {
        Asset asset = null;

        AssetType enumType = AssetType.valueOf(type);
        Class<? extends Asset> assetClass = AssetFactory.getAssetOfType(enumType).getClass();

        try {
            asset = defaultService.get(assetClass, id);
            asset.setName(assetVm.getName());
            defaultService.update(asset);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<String>("Updated", HttpStatus.OK);
    }
}
