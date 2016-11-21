/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.web.auth;

import org.jasypt.springsecurity3.authentication.encoding.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import ua.hobbydev.webapp.expense.business.users.UserServiceInterface;
import ua.hobbydev.webapp.expense.domain.user.User;

@Controller
public class AuthenticationController {

    @Autowired
    private UserServiceInterface userServiceInterface;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public ModelAndView register(@ModelAttribute User newUser, ModelAndView mv) {
        try {
            userServiceInterface.loadUserByUsername(newUser.getUsername());
            mv.setViewName("redirect:/register?error");
        } catch (UsernameNotFoundException unfe) {

            String email = newUser.getEmail();

            boolean emailExists = userServiceInterface.list().stream()
                    .filter(
                            (user) -> user.getEmail().equals(email)
                    )
                    .findFirst()
                    .isPresent();
            if(emailExists) {
                mv.setViewName("redirect:/register?error");
                return mv;
            }

            newUser.setPassword(passwordEncoder.encodePassword(newUser.getPassword(), null));
            userServiceInterface.add(newUser);
            mv.setViewName("redirect:/login");
        } finally {
            return mv;
        }
    }
}
