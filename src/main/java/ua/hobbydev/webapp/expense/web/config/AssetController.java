/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.web.config;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(path = "/settings/assets")
public class AssetController {

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "{type}/{id}/configure", method = RequestMethod.GET)
    public ModelAndView configureAssetPage(@PathVariable Long id, @PathVariable String type, ModelAndView mv) {
        mv.addObject("id", id);
        mv.addObject("type", type);
        mv.setViewName("settings/assets/configure");
        return mv;
    }
}
