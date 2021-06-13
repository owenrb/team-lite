import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Resource } from '../model/Resource';
import { Timesheet } from '../model/Timesheet';


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

	getUserTimesheets(sheetId: string) {
		return this.httpClient.get<Timesheet[]>('/api/sheets/timesheets/' + sheetId)
	}
	
}
