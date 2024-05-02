package com.easy.you;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.easy.you.repository")
public class EasyYouApplication {

	public static void main(String[] args) {
		SpringApplication.run(EasyYouApplication.class, args);
	}

}
