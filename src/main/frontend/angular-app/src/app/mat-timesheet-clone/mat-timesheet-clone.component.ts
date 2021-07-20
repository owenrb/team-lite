import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientService } from '../service/http-client.service'
import { MatTimesheetFormComponent } from '../mat-timesheet-form/mat-timesheet-form.component';
import { TimesheetForm } from '../model/TimesheetForm';
import { Timesheet } from '../model/Timesheet';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mat-timesheet-clone',
  templateUrl: './mat-timesheet-clone.component.html',
  styleUrls: ['./mat-timesheet-clone.component.css']
})
export class MatTimesheetCloneComponent implements OnInit {


  @Input()
  sheetId : string | null = ''

  @Input()
  timesheet : Timesheet = new Timesheet();

  timesheetForm: TimesheetForm

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private httpClientService: HttpClientService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe) {
    this.timesheetForm = new TimesheetForm();
    this.timesheetForm.title = 'Clone Timesheet'
  }

  ngOnInit(): void {
    this.timesheetForm.timesheet.category = this.timesheet.category
    this.timesheetForm.timesheet.customer = this.timesheet.customer

    var date = new Date();
    var formatted = this.datePipe.transform(date, "yyyy-MM-dd")
    this.timesheetForm.timesheet.date = formatted ? formatted : ''

    this.timesheetForm.timesheet.productTicket = this.timesheet.productTicket
    this.timesheetForm.timesheet.summary = this.timesheet.summary
    this.timesheetForm.timesheet.supportTicket = this.timesheet.supportTicket
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MatTimesheetFormComponent, {
      width: '800px',
      data: this.timesheetForm 
    });

    dialogRef.afterClosed().subscribe(timesheet => {
      console.log('The dialog was closed! ' + JSON.stringify(timesheet));
    })

  }

}
