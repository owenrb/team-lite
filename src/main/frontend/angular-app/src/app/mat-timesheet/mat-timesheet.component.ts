import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Timesheet } from '../model/Timesheet'
import { MatDialog } from '@angular/material/dialog';
import { MatTimesheetDeleteComponent } from '../mat-timesheet-delete/mat-timesheet-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConst } from '../model/SnackbarConst'
import { DatePipe, formatCurrency } from '@angular/common';
import * as moment from 'moment';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-mat-timesheet',
  templateUrl: './mat-timesheet.component.html',
  styleUrls: ['./mat-timesheet.component.css']
})
export class MatTimesheetComponent implements OnInit {

  @Input()
  testMode: boolean = false

  @Input()
  filterFrom: string | null = null
  @Input()
  filterTo: string | null = null


  displayedColumns: string[] = [
    'row', 'productTicket', 'supportTicket', 'customer', 'summary', 'activity', 'category', 'date', 'regHours', 'vaHours', 'otHours', 'status', 'remarks', 'action'
  ];
  dataSource: Timesheet[] = [];

  @Input()
  sheetId: string | null


  constructor(
    private httpClientService: HttpClientService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe) {

    this.sheetId = null
  }

  get filtered(): Timesheet[] {
    if (this.filterFrom && this.filterTo) {

      var from = moment(this.filterFrom, "yyyy-MM-dd");
      var to = moment(this.filterTo, "yyyy-MM-dd");
      
      if(from.isValid() && to.isValid())  {

        return this.dataSource.filter(timesheet => {
          var date = moment(timesheet.date.split('T')[0], "yyyy-MM-dd");
          var res =  date.isValid() && date.isBetween(from, to, 'days', '[]');

          return res;
        });
      }


    }

    return this.dataSource
  }


  ngOnInit(): void {

    this.fetch();

  }

  fetch(): void {

    console.log('fetching....');

    this.httpClientService.getUserTimesheets(this.sheetId).subscribe(
      timesheets => this.dataSource = timesheets
    );
  }

  openDeleteDialog(row: string): void {
    console.log("delete: " + row)
    const dialogRef = this.dialog.open(MatTimesheetDeleteComponent, { data: row });


    dialogRef.afterClosed().subscribe(rowNum => {
      console.log('The dialog was closed! ' + JSON.stringify(rowNum));

      if (rowNum) {
        this.httpClientService.deleteTimesheet(this.sheetId, rowNum)
          .subscribe(result => {
            // refresh
            this.fetch();
          },
            error => {
              console.log("error: " + JSON.stringify(error))
              new SnackbarConst().open(this.snackBar, error.message);
            })
      }
    })
  }

}
