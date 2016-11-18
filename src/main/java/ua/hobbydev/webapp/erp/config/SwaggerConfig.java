/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.CookieValue;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;
import ua.hobbydev.webapp.erp.Application;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Swagger configuration
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
	
	@Bean
	public Docket webApi() {
		String apiBasePackage = ClassUtils.getPackageName(Application.class) + ".api.web";
		
		Docket docket = new Docket(DocumentationType.SWAGGER_2);
		docket
				.groupName("web")
			.select()
				.apis(RequestHandlerSelectors.basePackage(apiBasePackage))
				.paths(PathSelectors.ant("/api/web/**"))
				.build()
			.apiInfo(apiInfo())
			.ignoredParameterTypes(CurrentUser.class,
									CookieValue.class,
					HttpServletRequest.class,
					HttpServletResponse.class);
		
		return docket;
	}

	@Bean
	public Docket mobileApi() {
		String apiBasePackage = ClassUtils.getPackageName(Application.class) + ".api.mobile";

		Docket docket = new Docket(DocumentationType.SWAGGER_2);
		docket
				.groupName("mobile")
				.select()
				.apis(RequestHandlerSelectors.basePackage(apiBasePackage))
				.paths(PathSelectors.ant("/api/mobile/**"))
				.build()
				.apiInfo(apiInfo())
				.ignoredParameterTypes(CurrentUser.class,
						CookieValue.class,
						HttpServletRequest.class,
						HttpServletResponse.class);

		return docket;
	}
	
	private ApiInfo apiInfo() {
		ApiInfo apiInfo = new ApiInfo(
				"Public API",
				"API for public use and integration",
				"1.0",
				"[[terms_of_service_url]]",
				new Contact("Dmytro Romenskyi", "https://ua.linkedin.com/in/dmytro-romenskyi-87035524", "d.romenskyi@gmail.com"),
				"This software is licensed under the terms of the MIT license.",
				"[[licence_url]]");
		return apiInfo;
		
	}
}
