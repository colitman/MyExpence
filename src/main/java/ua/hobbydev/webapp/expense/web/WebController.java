/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.web;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(method = RequestMethod.GET)
public class WebController {

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "/")
    public ModelAndView root(ModelAndView mv) {
        mv.setViewName("dashboard");
        return mv;
    }

    @RequestMapping(path = "/login")
    public ModelAndView login(ModelAndView mv, Authentication auth) {
        if(auth != null && auth.isAuthenticated()) {
            mv.setViewName("redirect:/");
            return mv;
        }
        mv.setViewName("login");
        return mv;
    }

    @RequestMapping(path = "/register")
    public ModelAndView register(ModelAndView mv, Authentication auth) {
        if(auth != null && auth.isAuthenticated()) {
            mv.setViewName("redirect:/");
            return mv;
        }
        mv.setViewName("signup");
        return mv;
    }

    @RequestMapping(path = "/imports/head")
    public ModelAndView head(ModelAndView mv, @RequestParam String pageTitle) {
        mv.addObject("pageTitle", pageTitle);
        mv.setViewName("imports/head");
        return mv;
    }

    @RequestMapping(path = "/imports/mainNav")
    public ModelAndView mainNav(ModelAndView mv) {
        mv.setViewName("imports/mainNav");
        return mv;
    }

    @RequestMapping(path = "/imports/mainFooter")
    public ModelAndView mainFooter(ModelAndView mv) {
        mv.setViewName("imports/mainFooter");
        return mv;
    }

    @RequestMapping(path = "/imports/scripts")
    public ModelAndView scripts(ModelAndView mv) {
        mv.setViewName("imports/scripts");
        return mv;
    }
}
