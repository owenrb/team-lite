package io.owenrbee.team.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.owenrbee.team.bean.GSheetHelper;
import io.owenrbee.team.model.Resource;
import io.owenrbee.team.model.Timesheet;

@RestController
@RequestMapping("api/sheets")
public class SheetController {

	@Value("${doc.sheet.resourcemapping.id}")
	private String resourceSheet;

	@Value("${doc.sheet.resourcemapping.range}")
	private String resourceRange;

	@Autowired
	private OAuth2AuthorizedClientService clientService;
	
	@Autowired
	private GSheetHelper gsheetHelper;


	@GetMapping
	public String getBase() {

		String refreshToken = gsheetHelper.refreshToken(clientService);
		return "this is the base! " + refreshToken;
	}

	@GetMapping(path = "resources")
	public List<Resource> getResources(@AuthenticationPrincipal OAuth2User principal)
			throws GeneralSecurityException, IOException {

		List<List<Object>> values = gsheetHelper.fetch(clientService, resourceSheet, resourceRange);

		List<Resource> result = new ArrayList<>();

		String userEmail = principal.getAttribute("email");
		if (userEmail == null || userEmail.trim().isEmpty()) {
			return result;
		}

		if (values == null || values.isEmpty()) {
			System.out.println("No data found.");
		} else {
			for (List<Object> row : values) {
				// Print columns A and E, which correspond to indices 0 and 4.
				String email = (String) row.get(0);

				if (!userEmail.equals(email))
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
	
	/**
	 * CREATE 
	 * 
	 * @param spreadsheetId
	 * @param timesheet
	 * @throws GeneralSecurityException
	 * @throws IOException
	 */
	@PostMapping(path = "timesheets/{sheetId}")
	public void createTimesheet(@PathVariable("sheetId") String spreadsheetId, @RequestBody Timesheet timesheet) throws GeneralSecurityException, IOException {
		
		System.out.println("create: " + timesheet);

		final String range = "Timesheet!A2:L";
		gsheetHelper.appendTimesheet(clientService, spreadsheetId, range, timesheet);
	}

	/**
	 * READ
	 * 
	 * @param spreadsheetId
	 * @return
	 * @throws GeneralSecurityException
	 * @throws IOException
	 */
	@GetMapping(path = "timesheets/{sheetId}")
	public List<Timesheet> getTimesheets(@PathVariable("sheetId") String spreadsheetId)
			throws GeneralSecurityException, IOException {

		final String range = "Timesheet!A2:L";
		List<List<Object>> values =  gsheetHelper.fetch(clientService, spreadsheetId, range);

		if (values != null) {
			return IntStream.range(0, values.size()).mapToObj(i -> gsheetHelper.toTimesheet(values.get(i), i+2))
					.collect(Collectors.toList());
		}

		return Collections.emptyList();
	}
	
	/**
	 * UPDATE
	 * 
	 * @param spreadsheetId
	 * @param row
	 * @param timesheet
	 * @return
	 * @throws GeneralSecurityException
	 * @throws IOException
	 */
	@PutMapping(path = "timesheets/{sheetId}/{row}")
	public Timesheet updateTimesheet(@PathVariable("sheetId") String spreadsheetId, @PathVariable("row") int row,
			@RequestBody Timesheet timesheet) throws GeneralSecurityException, IOException {

		final String range = String.format("Timesheet!A%d:L%d", row, row);
		gsheetHelper.updateTimesheet(clientService, spreadsheetId, range, timesheet);
		
		
		return timesheet;
		
	}
	

	/**
	 * DELETE
	 * 
	 * @param spreadsheetId
	 * @param row
	 * @throws GeneralSecurityException
	 * @throws IOException
	 */
	@DeleteMapping(path = "timesheets/{sheetId}/{row}")
	public void deleteTimesheet(@PathVariable("sheetId") String spreadsheetId, @PathVariable("row") int row) throws GeneralSecurityException, IOException {
		
		gsheetHelper.deleteTimesheet(clientService, spreadsheetId, row);
	}
	


}
