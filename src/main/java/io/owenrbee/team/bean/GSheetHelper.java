package io.owenrbee.team.bean;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;


@Component
public class GSheetHelper {

	private static final String APPLICATION_NAME = "TeamLite";
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

	
	public String refreshToken(OAuth2AuthorizedClientService clientService) {

		SecurityContext securityContext = SecurityContextHolder.getContext();
		OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) securityContext.getAuthentication();

		String regId = oauth2Token.getAuthorizedClientRegistrationId();
		String name = oauth2Token.getName();
		OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(regId, name);

		System.out.println(String.format("%s : %s ==> %s", regId, name, client));

		String refreshToken = client.getAccessToken().getTokenValue();
		
		return refreshToken;
	}
	
	public List<List<Object>>  fetch(OAuth2AuthorizedClientService clientService, String spreadsheetId, String range) throws GeneralSecurityException, IOException {

		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		
		Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(getToken(clientService)))
				.setApplicationName(APPLICATION_NAME).build();
		ValueRange response = service.spreadsheets().values().get(spreadsheetId, range).execute();
		
		return response.getValues();
	}
	

	public String getToken(OAuth2AuthorizedClientService clientService) {
		String token = null;

		SecurityContext securityContext = SecurityContextHolder.getContext();
		OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) securityContext.getAuthentication();

		String regId = oauth2Token.getAuthorizedClientRegistrationId();
		String name = oauth2Token.getName();
		OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(regId, name);

		System.out.println(String.format("%s : %s ==> %s", regId, name, client));

		token = client.getAccessToken().getTokenValue();

		return token;
	}

	private GoogleCredential getCredentials(String token) {
		return new GoogleCredential().setAccessToken(token);
	}
}
