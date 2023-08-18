package org.kosta.recipekithub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource("classpath:context.xml") 
public class FinalprojectRecipekithubApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalprojectRecipekithubApplication.class, args);
	}

}
