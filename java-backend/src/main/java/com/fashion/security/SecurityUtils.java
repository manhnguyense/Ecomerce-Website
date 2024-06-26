package com.fashion.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fashion.domain.UserContext;
import com.fashion.model.AccountVM;
import com.fashion.security.domain.UserDetailsCustom;

public class SecurityUtils {

	private static final Logger LOG = LoggerFactory.getLogger(SecurityUtils.class);

	private static Authentication getAuthentication() {
		final SecurityContext securityContext = SecurityContextHolder.getContext();
		final Authentication authentication = securityContext.getAuthentication();
		if (authentication != null) {
			return authentication;
		}
		LOG.warn("::::: Security context stored object authentication is null.");
		return null;
	}

	public static UserContext getCurrentUserContext() {
		final Authentication authentication = getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			final UserDetailsCustom userDetails = (UserDetailsCustom) authentication.getPrincipal();
			final AccountVM acc = userDetails.getAccount();
			return new UserContext(acc.getUsername(), null, acc.getStoreId(), acc.getId(), null, null, acc.getType());
		}
		return null;
	}

}
