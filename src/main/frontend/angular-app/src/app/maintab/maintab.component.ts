import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Tab } from '../model/Tab'

@Component({
  selector: 'app-maintab',
  templateUrl: './maintab.component.html',
  styleUrls: ['./maintab.component.css']
})
export class MaintabComponent implements OnInit {

  tabs: Array<Tab> 

  constructor(
    private httpClientService: HttpClientService,
    private router: Router) {
      this.tabs = []
  }

  ngOnInit(): void {

    var welcome = new Tab();
    welcome.label = 'Welcome'
    welcome.link = '/team/welcome'

    this.tabs.push(welcome);

    // retrieve tab info from the server
    this.httpClientService.getUserResources().subscribe(list => {
      list.forEach((resource, index) => {

        if(resource?.sheetType == 'Timesheet') {
          var tab = new Tab();
          tab.label = 'Timesheet'
          tab.link = '/team/timesheet/' + resource.sheetId

          this.tabs.push(tab);

        } else {
          console.log('Unhandled resource type: ' + resource.sheetType)
        }

      })
    })
  }

}
