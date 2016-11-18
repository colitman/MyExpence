/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.config;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Base implementation for access violations routing
 */
@Service
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest req, HttpServletResponse resp, AccessDeniedException e)
			throws IOException, ServletException {
		
		if (e == null || e.getClass() == AuthorizationServiceException.class) {
			req.getRequestDispatcher("/errors/accessDenied").forward(req, resp);
		} else if (e.getClass() == InvalidCsrfTokenException.class) {
			req.getRequestDispatcher("/errors/unexpectedToken").forward(req, resp);
		} else if (e.getClass() == MissingCsrfTokenException.class) {
			req.getRequestDispatcher("/errors/missingToken").forward(req, resp);
		} else {
			req.getRequestDispatcher("/errors/accessDenied").forward(req, resp);
		}
	}

}
