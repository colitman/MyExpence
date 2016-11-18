/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.config;

import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Service;

@Service
public class CustomLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    /*@Autowired
    private AuthController authController;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        String token = "";
        String username = "";

        Cookie[] cookies = request.getCookies();

        for(Cookie c:cookies) {
            String cookieName = c.getName();
            if(cookieName.equalsIgnoreCase("token")) {
                token = c.getValue();
            } else if(cookieName.equalsIgnoreCase("user")) {
                username = c.getValue();
            }
        }

        authController.unauthenticate(username, token);
        response.addCookie(new Cookie("token",""));
        response.addCookie(new Cookie("user",""));

        super.onLogoutSuccess(request, response, authentication);
    }*/
}
