/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ua.hobbydev.webapp.expense.EnumUtils.AssetEnums.PaymentSystemType;
import ua.hobbydev.webapp.expense.api.model.PaymentSystemViewModel;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/web/paymentSystems")
public class PaymentSystemsApiController {

    @RequestMapping(path = "", method = RequestMethod.GET)
    public ResponseEntity<List<PaymentSystemViewModel>> getPaymentSystems() {

        List<PaymentSystemViewModel> types = new ArrayList<PaymentSystemViewModel>();

        for(PaymentSystemType a:PaymentSystemType.values()) {
            types.add(new PaymentSystemViewModel(a));
        }

        return new ResponseEntity<List<PaymentSystemViewModel>>(types, HttpStatus.OK);
    }
}
