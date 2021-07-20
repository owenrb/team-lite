import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTimesheetFormComponent } from '../mat-timesheet-form/mat-timesheet-form.component';
import { TimesheetForm } from '../model/TimesheetForm';
import { HttpClientService } from '../service/http-client.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Timesheet } from '../model/Timesheet';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-mat-timesheet-add',
  templateUrl: './mat-timesheet-add.component.html',
  styleUrls: ['./mat-timesheet-add.component.css']
})
export class MatTimesheetAddComponent implements OnInit {

  @Input()
  sheetId: string | null = ''
  timesheetForm: TimesheetForm


  @Output()
  addEvent = new EventEmitter<string>();

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe) {

    this.timesheetForm = new TimesheetForm()
    this.timesheetForm.title = 'Add Timesheet'

    // set some default value
    var date = new Date();
    var formatted = this.datePipe.transform(date, "yyyy-MM-dd")
    this.timesheetForm.timesheet.date = formatted ? formatted : ''

    this.timesheetForm.timesheet.status = 'In-Progress'

  }


  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MatTimesheetFormComponent, {
      width: '800px',
      data: this.timesheetForm
    });

    dialogRef.afterClosed().subscribe(timesheet => {
      console.log('The dialog was closed' + JSON.stringify(timesheet));

      if (timesheet) {
        this.httpClientService.createTimesheet(this.sheetId, timesheet).subscribe(
          response => {
            console.log("create response: " + JSON.stringify(response));

            // clear form
            this.timesheetForm.timesheet = new Timesheet()

            // refresh
            this.addEvent.emit("success")
          },
          error => {
            console.log("error: " + JSON.stringify(error))
            this.snackBar.open(error.message, 'X', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })

            console.log('emit error...')
            this.addEvent.emit("error")
          });
      }
    });
  }

}
