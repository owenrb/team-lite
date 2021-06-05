package io.owenrbee.team.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users")
public class UserController {
	
	@GetMapping
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
		
		System.out.println("Authenticate");
		
		Map<String, Object> map = new HashMap<>();
		map.put("attributes", principal.getAttributes());
		map.put("authenticated", Boolean.TRUE);
		
		return map;
    }

}
