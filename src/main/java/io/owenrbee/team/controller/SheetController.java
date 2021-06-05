package io.owenrbee.team.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;

import io.owenrbee.team.model.Resource;


@RestController
@RequestMapping("api/sheets")
public class SheetController {

	private static final String APPLICATION_NAME = "TeamLite";
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	
	@Value("${doc.sheet.resourcemapping.id}")
	private String resourceSheet;
	
	@Value("${doc.sheet.resourcemapping.range}")
	private String resourceRange;

	@Autowired
	private OAuth2AuthorizedClientService clientService;

	@GetMapping
	public String getBase() {

		SecurityContext securityContext = SecurityContextHolder.getContext();
		OAuth2AuthenticationToken oauth2Token = (OAuth2AuthenticationToken) securityContext.getAuthentication();

		String regId = oauth2Token.getAuthorizedClientRegistrationId();
		String name = oauth2Token.getName();
		OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(regId, name);

		System.out.println(String.format("%s : %s ==> %s", regId, name, client));

		String refreshToken = client.getAccessToken().getTokenValue();

		return "this is the base! " + refreshToken;
	}

	@GetMapping(path = "resources")
	public List<Resource> getResources(@AuthenticationPrincipal OAuth2User principal) throws GeneralSecurityException, IOException {

		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		final String spreadsheetId = resourceSheet;
		final String range = resourceRange;
		Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(getToken()))
				.setApplicationName(APPLICATION_NAME).build();
		ValueRange response = service.spreadsheets().values().get(spreadsheetId, range).execute();
		List<List<Object>> values = response.getValues();

		List<Resource> result = new ArrayList<>();
		
		String userEmail = principal.getAttribute("email");
		if(userEmail == null || userEmail.trim().isEmpty()) {
			return result;
		}

		if (values == null || values.isEmpty()) {
			System.out.println("No data found.");
		} else {
			for (List<Object> row : values) {
				// Print columns A and E, which correspond to indices 0 and 4.
				String email = (String) row.get(0);
				
				if(!userEmail.equals(email))
					continue;
				
				String role = (String) row.get(1);
				String sheetid = (String) row.get(2);
				String sheetType = (String) row.get(3);
				System.out.printf("%s, %s, %s, %s\n", email, role, sheetid, sheetType);

				Resource res = new Resource();

				res.setEmail(email);
				res.setRole(role);
				res.setSheetId(sheetid);
				res.setSheetType(sheetType);

				result.add(res);
			}
		}

		return result;
	}

	public String getToken() {
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
