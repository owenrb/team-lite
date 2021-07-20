import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTimesheetComponent } from '../mat-timesheet/mat-timesheet.component';

@Component({
  selector: 'app-mat-timesheet-page',
  templateUrl: './mat-timesheet-page.component.html',
  styleUrls: ['./mat-timesheet-page.component.css']
})
export class MatTimesheetPageComponent implements OnInit {

  sheetId: string | null = null

  @ViewChild('timesheet') 
  timesheet!: MatTimesheetComponent

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.sheetId = routeParams.get('sheetId');
  }

  onAddEvent(status: string): void {
    console.log('received: ' + status)
    this.timesheet.fetch()
  }

}
