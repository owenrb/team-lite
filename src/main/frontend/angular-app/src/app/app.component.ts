import { Component } from '@angular/core';
import { User } from './model/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'team-lite';

  timesheetId: string | undefined

	public loggedinUser: User = new User();

	userLoggedIn(user: User) {
		this.loggedinUser = user
	}

}
