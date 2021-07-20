import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-timesheet-delete',
  templateUrl: './mat-timesheet-delete.component.html',
  styleUrls: ['./mat-timesheet-delete.component.css']
})
export class MatTimesheetDeleteComponent implements OnInit {

  row : string = '0'

  constructor(
    public dialogRef: MatDialogRef<MatTimesheetDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { 
      this.row = data;
    }

  ngOnInit(): void {

  }

}
