import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Form as FormDHX} from "dhx-suite";

@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.component.html',
  styleUrls: ['./timesheet-add.component.css']
})
export class TimesheetAddComponent implements OnDestroy {
  @ViewChild("widget", { static: true })
  container: ElementRef | undefined;
  form: FormDHX | undefined;
  wait: Promise<void> | undefined;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormDHX(this.container?.nativeElement, {
      css: "dhx_widget--bordered dhx_widget--bg_white",
      width: 500,
      rows: [
        {
          cols: [{
            padding: "5px",
            type: "input",
            label: "Product Ticket",
            name: "productTicket",
            placeholder: "WFOD-XXXX"
          },
          {
            padding: "5px",
            type: "input",
            label: "Support Ticket",
            name: "supportTicket"
          },
          {
            padding: "5px",
            type: "select",
            label: "Category",
            name: "category",
            width: 140,
            required: true,
            options: [
              { value: "Support", content: "Support" },
              { value: "Delivery", content: "Delivery" },
              { value: "Internal", content: "Internal" }
            ]
          }]
        },
        {
          cols: [{
            padding: "5px",
            width: 120,
            type: "input",
            label: "Customer",
            name: "customer",
          }, {
            padding: "5px",
            width: 365,
            type: "input",
            label: "Summary",
            name: "summary",
          }]
        },
        {
          cols: [{
            padding: "5px",
            width: 120,
            type: "datepicker",
            label: "Date",
            required: true,
            name: "date"
          },
          {
            padding: "5px",
            width: 245,
            type: "input",
            label: "Activity",
            name: "activity"
          },
          {
            padding: "5px",
            type: "select",
            label: "Status",
            name: "status",
            required: true,
            width: 120,
            options: [
              { value: "In-Progress", content: "In-Progress" },
              { value: "Re-open", content: "Re-open" },
              { value: "On-Hold", content: "On-Hold" },
              { value: "Reassigned", content: "Reassigned" },
              { value: "Done", content: "Done" },
            ]
          }]
        },
        {
          cols: [{
            padding: "5px",
            rows: [{
              title: "Regular Hours",
              cols: [
                {
                  type: "select",
                  name: "regHours_hours",
                  width: 70,
                  options: [
                    { value: "0", content: "0 hr" },
                    { value: "1", content: "1 hr" },
                    { value: "2", content: "2 hrs" },
                    { value: "3", content: "3 hrs" },
                    { value: "4", content: "4 hrs" },
                    { value: "5", content: "5 hrs" },
                    { value: "6", content: "6 hrs" },
                    { value: "7", content: "7 hrs" },
                    { value: "8", content: "8 hrs" }
                  ]
                },
                {
                  type: "select",
                  name: "regHours_min",
                  width: 80,
                  options: [
                    { value: "0", content: "0 min" },
                    { value: ".25", content: "15 mins" },
                    { value: ".5", content: "30 mins" },
                    { value: ".75", content: "45 mins" }
                  ]
                }
              ]
            }]
          },
          {
            padding: "5px",
            rows: [{
              title: "Value Added",
              cols: [
                {
                  type: "select",
                  name: "vaHours_hours",
                  width: 70,
                  options: [
                    { value: "0", content: "0 hr" },
                    { value: "1", content: "1 hr" },
                    { value: "2", content: "2 hrs" },
                    { value: "3", content: "3 hrs" },
                    { value: "4", content: "4 hrs" },
                    { value: "5", content: "5 hrs" },
                    { value: "6", content: "6 hrs" },
                    { value: "7", content: "7 hrs" },
                    { value: "8", content: "8 hrs" }
                  ]
                },
                {
                  type: "select",
                  name: "vaHours_min",
                  width: 80,
                  options: [
                    { value: "0", content: "0 min" },
                    { value: ".25", content: "15 mins" },
                    { value: ".5", content: "30 mins" },
                    { value: ".75", content: "45 mins" }
                  ]
                }
              ]
            }]
          },
          {
            padding: "5px",
            rows: [{
              title: "OT Hours",
              cols: [
                {
                  type: "select",
                  name: "otHours_hours",
                  width: 70,
                  options: [
                    { value: "0", content: "0 hr" },
                    { value: "1", content: "1 hr" },
                    { value: "2", content: "2 hrs" },
                    { value: "3", content: "3 hrs" },
                    { value: "4", content: "4 hrs" },
                    { value: "5", content: "5 hrs" },
                    { value: "6", content: "6 hrs" },
                    { value: "7", content: "7 hrs" },
                    { value: "8", content: "8 hrs" }
                  ]
                },
                {
                  type: "select",
                  name: "otHours_min",
                  width: 80,
                  options: [
                    { value: "0", content: "0 min" },
                    { value: ".25", content: "15 mins" },
                    { value: ".5", content: "30 mins" },
                    { value: ".75", content: "45 mins" }
                  ]
                }
              ]
            }]
          }]
        },
        {
          type: "input",
          label: "Remarks",
          name: "remarks",
        },
        {
          align: "center",
          cols: [
            {
              padding: "5px",
              type: "button",
              text: "Cancel",
              size: "medium",
              view: "flat",
              color: "danger",
            },
            {
              padding: "5px",
              type: "button",
              text: "Save",
              size: "medium",
              view: "flat",
              submit: true,
              color: "primary",
            },
          ]
        }
      ],
    });

  }

  ngOnDestroy() {
    if (this.form) {
      this.form.destructor();
    }

  }
}
