import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTimesheetComponent } from '../mat-timesheet/mat-timesheet.component';
import { DateRange } from '../model/DateRange';

@Component({
  selector: 'app-mat-timesheet-page',
  templateUrl: './mat-timesheet-page.component.html',
  styleUrls: ['./mat-timesheet-page.component.css']
})
export class MatTimesheetPageComponent implements OnInit {

  sheetId: string | null = null

  @ViewChild('timesheet') 
  timesheet!: MatTimesheetComponent

  filterFrom: string | null = null;
  filterTo: string | null = null;

  constructor(private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.sheetId = routeParams.get('sheetId');
  }

  onAddEvent(status: string): void {
    console.log('received: ' + status)
    this.timesheet.fetch()
  }

  onDateRangeChanged(range : DateRange) {
    this.filterFrom = this.datePipe.transform(range.from, "yyyy-MM-dd");
    this.filterTo = this.datePipe.transform(range.to, "yyyy-MM-dd");
  }

}
