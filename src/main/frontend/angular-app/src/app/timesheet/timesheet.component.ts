import { Component, ViewChild, OnDestroy, ElementRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Grid as GridDHX } from "dhx-suite";
import { HttpClientService } from '../service/http-client.service';
import { Timesheet } from '../model/Timesheet'


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnDestroy {

  @ViewChild("widget1", { static: true })
  container: ElementRef | undefined;
  grid: GridDHX | undefined;
  timesheets: Array<Timesheet>
  sheetId: string | null

  constructor(
    private httpClientService: HttpClientService,
    private route: ActivatedRoute) {
    this.timesheets = []
    this.sheetId = null
  }

  ngOnInit(): void {
    console.log('init grid...')
    console.log('cont: ' + this.container)

    const newLocal = this.container;
    // initialize grid component
    this.grid = new GridDHX(newLocal?.nativeElement, {
      columns: [
        { id: "productTicket", header: [{ text: "Product Ticket" }] },
        { id: "supportTicket", header: [{ text: "Support Ticket" }] },
        { id: "customer", header: [{ text: "Customer" }] },
        { id: "summary", header: [{ text: "Summary" }] },
        {
          id: "activity", header: [{ text: "Activity" }],
          editorType: "select", options: ["Coding", "Replication", "Analysis", "Unit Testing", "Functional Tesing", "Test Doc", "SIT", "Smoke Testing", "See Remarks"]
        },
        {
          id: "category", header: [{ text: "Category" }],
          editorType: "select", options: ["Support", "Delivery", "Internal"]
        },
        { id: "date", header: [{ text: "Date" }] },
        { id: "regHours", header: [{ text: "Regular Hours" }], type: "number" },
        { id: "vaHours", header: [{ text: "Value Added Hours" }], type: "number" },
        { id: "otHours", header: [{ text: "OT Hours" }], type: "number" },
        {
          id: "status", header: [{ text: "Status" }],
          editorType: "select", options: ["In-Progress", "On-Hold", "Done"]
        },
        { id: "remarks", header: [{ text: "Remarks" }] },
        { id: "actions", header: [{ text: "Actions" }] },
      ],
      rowHeight: 60,
      autoWidth: true,
      editable: true,
      multiselection: true,
      selection: "complex",
    });

    this.grid.data.add(this.timesheets);

    const routeParams = this.route.snapshot.paramMap;
    this.sheetId = routeParams.get('sheetId');

    // fetch data
    if (this.sheetId) {

      console.log('fetching sheetId: ' + this.sheetId)

      this.httpClientService.getUserTimesheets(this.sheetId).subscribe(
        timesheets => {
          this.timesheets = timesheets
          this.grid?.data.removeAll()
          console.log('fetched: ' + timesheets.length)
          this.grid?.data.add(this.timesheets);
        }
      )
    }

  }


  ngOnDestroy() {
    if (this.grid) {
      console.log('destoying grid')
      this.grid.destructor();
    }
  }

}
