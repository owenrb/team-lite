import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Resource } from '../model/Resource';
import { Timesheet } from '../model/Timesheet';
import { Setting } from '../model/Setting';
import { of } from 'rxjs';


const TEST_DATA: Timesheet[] = [
	{row: 1, productTicket: 'WFOD-XXXX', supportTicket: '', customer: 'R&D', summary: 'As a user...', activity: 'Coding', category: 'Delivery', date: '2021-05-30', regHours: 4, vaHours: 2, otHours:0, status:'In-Progress', remarks: ''},
	{row: 2, productTicket: '', supportTicket: 'WFOS-XXXX', customer: 'R&D', summary: 'Runtime error', activity: 'Fixing', category: 'Support', date: '2021-05-30', regHours: 3, vaHours: 0, otHours:0, status:'In-Progress', remarks: ''},
	];

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  	constructor(private httpClient:HttpClient) { }


   	getLoggedInUser() {
		return this.httpClient.get<User>('/api/user')
	}
	
	logoutUser() {
		return this.httpClient.post('/logout', {});
	}

	getUserResources() {
		return this.httpClient.get<Resource[]>('/api/sheets/resources')
	}

	getUserTimesheets(sheetId: string | null) {
		if(!sheetId)
			return of(TEST_DATA)
		
		return this.httpClient.get<Timesheet[]>('/api/sheets/timesheets/' + sheetId)
	}

	getSettings(testMode: boolean) {

		if(testMode)
			return of(new Setting());
		else
			return this.httpClient.get<Setting>('/api/sheet/setting')
	}

	getTimesheetRow(sheetId: string | null, row: string) {

		if(!sheetId || !row || sheetId == 'test') {

			return of({ row: 2, productTicket: '', supportTicket: 'WFOS-XXXX', customer: 'R&D', summary: 'Runtime error', activity: 'Fixing', category: 'Support', date: '2021-05-30', regHours: 3, vaHours: 0, otHours: 0, status: 'In-Progress', remarks: '' })

		} else {
			return this.httpClient.get<Timesheet>('/api/sheets/timesheets/' + sheetId + '/' + row)
		}
	}

	createTimesheet(sheetId: string | null, timesheet: Timesheet) {

		return this.httpClient.post('/api/sheets/timesheets/' + sheetId, timesheet)
	}
	
	updateTimesheet(sheetId: string | null, timesheet: Timesheet, row: number) {

		return this.httpClient.put('/api/sheets/timesheets/' + sheetId + '/' + row, timesheet)
	}

	deleteTimesheet(sheetId: string | null, row: number) {

		return this.httpClient.delete('/api/sheets/timesheets/' + sheetId + '/' + row)
	}
}
