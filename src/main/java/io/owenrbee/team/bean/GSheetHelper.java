package io.owenrbee.team.bean;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
import com.google.api.services.sheets.v4.Sheets.Spreadsheets.Get;
import com.google.api.services.sheets.v4.Sheets.Spreadsheets.Values.Append;
import com.google.api.services.sheets.v4.Sheets.Spreadsheets.Values.Update;
import com.google.api.services.sheets.v4.model.BatchUpdateSpreadsheetRequest;
import com.google.api.services.sheets.v4.model.DeleteDimensionRequest;
import com.google.api.services.sheets.v4.model.DimensionRange;
import com.google.api.services.sheets.v4.model.Request;
import com.google.api.services.sheets.v4.model.Sheet;
import com.google.api.services.sheets.v4.model.Spreadsheet;
import com.google.api.services.sheets.v4.model.ValueRange;

import io.owenrbee.team.model.Timesheet;


@Component
public class GSheetHelper {

	private static final String APPLICATION_NAME = "TeamLite";
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	
	private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	
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
	
	public boolean appendTimesheet(OAuth2AuthorizedClientService clientService, String spreadsheetId, String range, Timesheet timesheet) throws GeneralSecurityException, IOException {

		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		
		Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(getToken(clientService)))
				.setApplicationName(APPLICATION_NAME).build();
		
		ValueRange content = new ValueRange();
		content.setRange(range);
		content.setMajorDimension("ROWS");
		List<List<Object>> values = new ArrayList<>();
		System.out.println("timesheet: " + timesheet.asList(dateFormat));
		values.add(timesheet.asList(dateFormat));
		content.setValues(values );
		
		Append append = service.spreadsheets().values().append(spreadsheetId, range, content);
		append.setValueInputOption("RAW");
		append.execute();
		
		return true;
	}
	
	public boolean updateTimesheet(OAuth2AuthorizedClientService clientService, String spreadsheetId, String range, Timesheet timesheet) throws GeneralSecurityException, IOException {

		System.out.println("update range: " + range);
		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		
		Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(getToken(clientService)))
				.setApplicationName(APPLICATION_NAME).build();
		
		ValueRange content = new ValueRange();
		content.setRange(range);
		content.setMajorDimension("ROWS");
		List<List<Object>> values = new ArrayList<>();
		System.out.println("timesheet: " + timesheet.asList(dateFormat));
		values.add(timesheet.asList(dateFormat));
		content.setValues(values );
		
		Update append = service.spreadsheets().values().update(spreadsheetId, range, content);
		append.setValueInputOption("RAW");
		append.execute();
		
		return true;
	}
	

	public boolean deleteTimesheet(OAuth2AuthorizedClientService clientService, String spreadsheetId, int row) throws GeneralSecurityException, IOException {

		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		
		Sheets service = new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(getToken(clientService)))
				.setApplicationName(APPLICATION_NAME).build();
		
		BatchUpdateSpreadsheetRequest content = new BatchUpdateSpreadsheetRequest();
		Request request = new Request();
		DeleteDimensionRequest deleteDimension = new DeleteDimensionRequest();
		
		
		DimensionRange range = new DimensionRange();
		range.setSheetId(getSheetId(service, spreadsheetId, "Timesheet"));
		range.setDimension("ROWS");
		range.setStartIndex(row - 1);
		range.setEndIndex(row);
		
		deleteDimension.setRange(range );
		request.setDeleteDimension(deleteDimension );
		content.setRequests(Arrays.asList(request) );
		service.spreadsheets().batchUpdate(spreadsheetId, content).execute();
		
		return true;
	}
	
	private Integer getSheetId(Sheets service, String spreadsheetId, String name) throws IOException {

		Get info = service.spreadsheets().get(spreadsheetId);
		info.setFields("sheets.properties");
		Spreadsheet details = info.execute();
		Optional<Sheet> found = details.getSheets().stream().filter(item -> "Timesheet".equals(item.getProperties().getTitle())).findFirst();
		
		return found.isPresent() ? found.get().getProperties().getSheetId() : 0;
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
	

	public Timesheet toTimesheet(List<Object> row, int rowId) {

		Timesheet timesheet = new Timesheet();
		timesheet.setRow(rowId);

		int columns = row.size();

		int column = 0;

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setProductTicket(value);
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setSupportTicket(value);
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setCustomer(value);
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setSummary(value);
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setActivity(value);
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setCategory(value);
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			
			
			try {
				timesheet.setDate(dateFormat.parse(value));
			} catch (ParseException e) {
				e.printStackTrace();
				
			}
			
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			try {
				timesheet.setRegHours(Float.valueOf(value));
			} catch (Exception e) {
			}
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			try {
				timesheet.setVaHours(Float.valueOf(value));
			} catch (Exception e) {
			}
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			try {
				timesheet.setOtHours(Float.valueOf(value));
			} catch (Exception e) {
			}
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setStatus(value);
		}

		if (columns > column) {
			String value = (String) row.get(column++);
			timesheet.setRemarks(value);
		}

		return timesheet;
	}

	private GoogleCredential getCredentials(String token) {
		return new GoogleCredential().setAccessToken(token);
	}
}
