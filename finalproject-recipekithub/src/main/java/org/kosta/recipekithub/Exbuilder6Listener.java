package org.kosta.recipekithub;


import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cleopatra.XBInitializer;


@Configuration
public class Exbuilder6Listener {


	@Bean
	public ServletListenerRegistrationBean<XBInitializer> getServletListenerRegistrationBean() {
		ServletListenerRegistrationBean<XBInitializer> listener = new ServletListenerRegistrationBean<XBInitializer>(new XBInitializer());
		
		return listener;
	}

}