package io.owenrbee.team.config;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import com.google.api.services.sheets.v4.SheetsScopes;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig  extends WebSecurityConfigurerAdapter{

    private static List<String> clients = Arrays.asList("google");
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	
    	// @formatter:off
        http.logout(l -> l
                .logoutSuccessUrl("/").permitAll()
             )
        	.csrf(c -> c
                     .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            	        )
            .authorizeRequests(a -> a
                .antMatchers("/", "/login", "/error", "/webjars/**").permitAll()
                .antMatchers("/*.ico", "/*.js", "/*.css", "/*.woff", "/*.woff2").permitAll() // angular/front-end
                .anyRequest().authenticated()
            )
            .exceptionHandling(e -> e
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            )
            .oauth2Login()
            	.defaultSuccessUrl("/")
            	.failureUrl("/")
            .clientRegistrationRepository(clientRegistrationRepository())
            .authorizedClientService(authorizedClientService())
            ;
        // @formatter:on
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
    	
        List<ClientRegistration> registrations = clients.stream()
          .map(c -> getRegistration(c))
          .filter(registration -> registration != null)
          .collect(Collectors.toList());
        
        return new InMemoryClientRegistrationRepository(registrations);
    }
	
	@Bean
	public OAuth2AuthorizedClientService authorizedClientService() {
	 
	    return new InMemoryOAuth2AuthorizedClientService(
	      clientRegistrationRepository());
	}

    @Bean
    @ConfigurationProperties(prefix = "spring.security.oauth2.client.registration.google")
    public OAuthClient googleClient() {
        return new OAuthClient();
    }
	

	private ClientRegistration getRegistration(String client) {
		
		System.out.println("######" + client + "#######");

		OAuthClient g = googleClient();
		
		List<String> scopes = Arrays.asList(SheetsScopes.SPREADSHEETS, "openid", "profile", "email");
	 
	    if (client.equals("google")) {
	        return CommonOAuth2Provider.GOOGLE.getBuilder(client)
	          .clientId(g.getClientId()).clientSecret(g.getClientSecret()).scope(scopes).build();
	    }
	    return null;
	}
}
