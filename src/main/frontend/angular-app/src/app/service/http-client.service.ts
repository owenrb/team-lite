import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
import { Resource } from '../model/Resource';


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
	
}
