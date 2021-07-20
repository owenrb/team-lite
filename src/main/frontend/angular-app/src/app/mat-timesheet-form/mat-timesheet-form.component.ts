import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Setting } from '../model/Setting';
import { TimesheetForm } from '../model/TimesheetForm';
import { Timesheet } from '../model/Timesheet';
import { FormControl, ValidatorFn, AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';


const ticketValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const productTicket = control.get('productTicket');
  const supportTicket = control.get('supportTicket');


  var hasError = (!productTicket || productTicket.value.length === 0)
    && (!supportTicket || supportTicket.value.length === 0);


  if (productTicket)
    productTicket.setErrors(hasError ? { noTicket: true } : null)
  if (supportTicket)
    supportTicket.setErrors(hasError ? { noTicket: true } : null)

  return hasError ? { noTicket: true } : null
}

const hourValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regHours = control.get('regHours');
  const vaHours = control.get('vaHours');
  const otHours = control.get('otHours');

  var hasError = (!regHours || regHours.value === 0)
    && (!vaHours || vaHours.value === 0) && (!otHours || otHours.value === 0);


  if (regHours)
    regHours.setErrors(hasError ? { noTicket: true } : null)
  if (vaHours)
    vaHours.setErrors(hasError ? { noTicket: true } : null)
  if (otHours)
    otHours.setErrors(hasError ? { noTicket: true } : null)

  return hasError ? { noHour: true } : null
}

@Component({
  selector: 'app-mat-timesheet-form',
  templateUrl: './mat-timesheet-form.component.html',
  styleUrls: ['./mat-timesheet-form.component.css'],
})
export class MatTimesheetFormComponent implements OnInit {

  title: string = ''

  @Input()
  timesheet: Timesheet
  customers: string[] = []

  timesheetForm;

  constructor(
    private httpClientService: HttpClientService,
    public dialogRef: MatDialogRef<MatTimesheetFormComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TimesheetForm) {

    this.title = data?.title
    this.timesheet = data?.timesheet

    console.log('product ticket: ' + this.timesheet?.productTicket)

    this.timesheetForm = fb.group({
      row: new FormControl(this.timesheet?.row),
      productTicket: new FormControl(this.timesheet?.productTicket),
      supportTicket: new FormControl(this.timesheet?.supportTicket),
      customer: new FormControl(this.timesheet?.customer),
      category: new FormControl(this.timesheet?.category),
      date: new FormControl(this.timesheet?.date),
      summary: new FormControl(this.timesheet?.summary),
      status: new FormControl(this.timesheet?.status),
      activity: new FormControl(this.timesheet?.activity),
      remarks: new FormControl(this.timesheet?.remarks),
      regHours: new FormControl(this.timesheet?.regHours),
      vaHours: new FormControl(this.timesheet?.vaHours),
      otHours: new FormControl(this.timesheet?.otHours)
    }, { validators: [ticketValidator, hourValidator] }
    );

  }

  ngOnInit(): void {

    this.httpClientService.getSettings(true).subscribe(
      setting => {
        this.customers = setting.customers;
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
