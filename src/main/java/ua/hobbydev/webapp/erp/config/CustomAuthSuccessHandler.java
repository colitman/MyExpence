/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.config;

import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

@Service
public class CustomAuthSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    /*@Autowired
    private AuthController authController;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        String token = authController.authenticate(request.getParameter("username"), request.getParameter("password"), request).getBody();
        Cookie tokenCookie = new Cookie("token", token);
        tokenCookie.setMaxAge(7*24*60*60); //7 days

        Cookie userCookie = new Cookie("user", request.getParameter("username"));
        userCookie.setMaxAge(7*24*60*60); //7 days


        response.addCookie(tokenCookie);
        response.addCookie(userCookie);



        super.onAuthenticationSuccess(request, response, authentication);
    }*/
}
