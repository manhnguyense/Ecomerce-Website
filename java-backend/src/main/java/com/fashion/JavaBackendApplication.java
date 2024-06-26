package com.fashion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableJpaAuditing
@EnableCaching
@EnableScheduling
@EnableRedisRepositories
public class JavaBackendApplication {

	public static void main(String[] args) {
		final StringBuilder builder = new StringBuilder();
		builder.append("********** FASHION BACKEND JAVA************\n");
		builder.append("**********Author: Manh Nguyen *************\n");
		System.out.println(builder);
		
		SpringApplication.run(JavaBackendApplication.class, args);
	}

}
