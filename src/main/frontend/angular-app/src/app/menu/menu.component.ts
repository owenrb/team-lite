import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	user: User;

	@Output()
	logEvent = new EventEmitter<User>();

	constructor(
		private httpClientService: HttpClientService) {
		this.user = new User();
	}

	ngOnInit(): void {
		this.httpClientService.getLoggedInUser().subscribe(
			response => this.handleSuccessfulResponse(response),
		);
	}


	handleSuccessfulResponse(response: User) {
		this.user = response;
		this.logEvent.emit(this.user);
	}

	logout() {
		this.httpClientService.logoutUser().subscribe(
			response => {

				this.logEvent.emit(new User());
			}
		);

		this.resetUser();
		this.logEvent.emit(new User());
	}

	resetUser() {
		this.user = new User();
	}

}
