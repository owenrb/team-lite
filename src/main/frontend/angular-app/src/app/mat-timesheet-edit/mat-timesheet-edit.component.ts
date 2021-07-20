import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientService } from '../service/http-client.service'
import { MatTimesheetFormComponent } from '../mat-timesheet-form/mat-timesheet-form.component';
import { TimesheetForm } from '../model/TimesheetForm';
import { Timesheet } from '../model/Timesheet';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarConst} from '../model/SnackbarConst'


@Component({
  selector: 'app-mat-timesheet-edit',
  templateUrl: './mat-timesheet-edit.component.html',
  styleUrls: ['./mat-timesheet-edit.component.css']
})
export class MatTimesheetEditComponent implements OnInit {

  @Input()
  rowId : string = ''

  @Input()
  sheetId : string | null = ''

  @Input()
  timesheet : Timesheet = new Timesheet();

  dirtyTimesheet : Timesheet = this.timesheet

  timesheetForm : TimesheetForm


  constructor(
    private httpClientService: HttpClientService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 
    this.timesheetForm = new TimesheetForm();
    this.timesheetForm.title = 'Edit Timesheet'
  }

  ngOnInit(): void {
    this.timesheetForm.timesheet = this.timesheet
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MatTimesheetFormComponent, {
      width: '800px',
      data: this.timesheetForm 
    });

    dialogRef.afterClosed().subscribe(timesheet => {
      console.log('The dialog was closed! ' + JSON.stringify(timesheet));

      if(timesheet) {

        this.dirtyTimesheet = timesheet

        this.httpClientService.updateTimesheet(this.sheetId, timesheet, timesheet.row)
          .subscribe(result => {
            this.timesheet.productTicket = this.dirtyTimesheet?.productTicket
            this.timesheet.supportTicket = this.dirtyTimesheet?.supportTicket
            this.timesheet.customer = this.dirtyTimesheet?.customer
            this.timesheet.category = this.dirtyTimesheet?.category
            this.timesheet.date = this.dirtyTimesheet?.date
            this.timesheet.status = this.dirtyTimesheet?.status
            this.timesheet.summary = this.dirtyTimesheet?.summary
            this.timesheet.activity = this.dirtyTimesheet?.activity
            this.timesheet.remarks = this.dirtyTimesheet?.remarks
            this.timesheet.regHours = this.dirtyTimesheet?.regHours
            this.timesheet.vaHours = this.dirtyTimesheet?.vaHours
            this.timesheet.otHours = this.dirtyTimesheet?.otHours
          },
          error => {
            console.log("error: " + JSON.stringify(error))
            new SnackbarConst().open(this.snackBar, error.message);

          })
      }
    });
  }

}
