package org.kosta.recipekithub;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {    
		// addResourceHandler("매핑 경로")를 적어둔다. localhost:7777/ui/recipe 로 들어오는 모든 정적 리소스 요청을 static폴더가 아닌 .addResourceLoactions에 적어둔 경로로 부터 찾아준다.
		registry.addResourceHandler("/upload/**").addResourceLocations("file:///C:/upload/");
    }
}	
