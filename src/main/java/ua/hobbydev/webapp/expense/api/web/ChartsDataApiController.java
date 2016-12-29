/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.hobbydev.webapp.expense.api.model.charts.LineChartViewModel;
import ua.hobbydev.webapp.expense.business.DefaultServiceInterface;
import ua.hobbydev.webapp.expense.config.CurrentUser;
import ua.hobbydev.webapp.expense.domain.asset.Asset;
import ua.hobbydev.webapp.expense.domain.user.User;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/web/charts")
public class ChartsDataApiController {

    @Autowired
    private DefaultServiceInterface defaultService;

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "assets/income/line", method = RequestMethod.GET)
    public ResponseEntity<LineChartViewModel> getIncomeLineChartPerAsset(@RequestParam(required = false) Long startDate,
                                                                         @RequestParam(required = false) Long endDate,
                                                                         @CurrentUser User currentUser) {
        LineChartViewModel viewModel = new LineChartViewModel();

        List<Asset> assets = defaultService.list(Asset.class).stream()
                .filter(
                        (asset) -> asset.getUser().equals(currentUser)
                ).collect(Collectors.toList());

        Period chartPeriod = Period.between(LocalDate.ofEpochDay(startDate), LocalDate.ofEpochDay(endDate));


        return new ResponseEntity<LineChartViewModel>(viewModel, HttpStatus.OK);
    }
}
