/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.web.config;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(path = "/settings")
public class SettingsController {

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "currencies", method = RequestMethod.GET)
    public ModelAndView currenciesConfigPage(ModelAndView mv) {
        mv.setViewName("settings/currencies");
        return mv;
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "assets", method = RequestMethod.GET)
    public ModelAndView assetsConfigPage(ModelAndView mv) {
        mv.setViewName("settings/assets");
        return mv;
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "categories", method = RequestMethod.GET)
    public ModelAndView categoriesConfigPage(ModelAndView mv) {
        mv.setViewName("settings/categories");
        return mv;
    }
}
