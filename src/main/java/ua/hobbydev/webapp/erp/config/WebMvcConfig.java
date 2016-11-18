/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.erp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

/**
 * Spring MVC configuration
 */
@Configuration
@EnableWebMvc
@ComponentScan({"ua.hobbydev.webapp.erp.*"})
public class WebMvcConfig extends WebMvcConfigurerAdapter {
	
	protected static final String RESOURCES_BASE_URL = "/res/**";

	private static final String RESOURCES_LOCATION = "/WEB-INF/res/";
	private static final String VIEWS = "/WEB-INF/view/";

	/**
	 * JSP page views location configuration
     */
	@Bean
	public InternalResourceViewResolver viewResolver() {
		
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix(VIEWS);
		viewResolver.setSuffix(".jsp");
		
		return viewResolver;
	}

	/**
	 * Static resources location configuration
     */
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		registry
			.addResourceHandler(RESOURCES_BASE_URL)
			.addResourceLocations(RESOURCES_LOCATION);
		
		registry
			.addResourceHandler("swagger-ui.html")
			.addResourceLocations("classpath:/META-INF/resources/");
	 
	    registry
	    	.addResourceHandler("/webjars/**")
	    	.addResourceLocations("classpath:/META-INF/resources/webjars/");
	}

	/**
	 * Default servlet configuration
     */
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
}
