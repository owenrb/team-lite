import { Component, ViewChild, OnDestroy, ElementRef } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Grid as GridDHX, Toolbar as ToolbarDHX } from "dhx-suite";
import { HttpClientService } from '../service/http-client.service';
import { Timesheet } from '../model/Timesheet'


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnDestroy {

  @ViewChild("toolbarWidget", { static: true })
  toolbarContainer: ElementRef | undefined;
  toolbar: ToolbarDHX | undefined;

  @ViewChild("gridWidget", { static: true })
  gridContainer: ElementRef | undefined;
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
    console.log('init tooblar...');
    this.toolbar = new ToolbarDHX(this.toolbarContainer?.nativeElement, {
      css: "dhx_widget--bordered dhx_widget--bg_white",
      navigationType: "pointer",
    });

    this.toolbar.data.load("/toolbar-timesheet.json");

    console.log('init grid...')
    console.log('cont: ' + this.gridContainer)

    const newLocal = this.gridContainer;
    // initialize grid component
    // TODO: delete, undelete, clone actions
    // TODO: batch-update via gsheet api
    // TODO: data correlation id
    // TODO: row formatting
    // TODO: date filtering
    this.grid = new GridDHX(newLocal?.nativeElement, {
      columns: [
        { id: "row", width: 40, header: [{ text: "S/N" }], type: "number" },
        { id: "productTicket", width: 125, header: [{ text: "Product Ticket" }] },
        { id: "supportTicket", width: 125, header: [{ text: "Support Ticket" }] },
        { id: "customer", header: [{ text: "Customer" }] },
        { id: "summary", header: [{ text: "Summary" }] },
        {
          id: "activity", header: [{ text: "Activity" }],
          editorType: "select", options: ["Coding", "Replication", "Analysis", "Unit Testing", "Functional Tesing", "Test Doc", "SIT", "Smoke Testing", "See Remarks"]
        },
        {
          id: "category", width: 85, header: [{ text: "Category" }],
          editorType: "select", options: ["Support", "Delivery", "Internal"]
        },
        { id: "date", width: 100, header: [{ text: "Date" }] },
        { id: "regHours", width: 85, header: [{ text: "Reg Hours" }], type: "number" },
        { id: "vaHours", width: 85, header: [{ text: "Value Added" }], type: "number" },
        { id: "otHours", width: 85, header: [{ text: "OT Hours" }], type: "number" },
        {
          id: "status", width: 85, header: [{ text: "Status" }],
          editorType: "select", options: ["In-Progress", "On-Hold", "Done"]
        },
        { id: "remarks", header: [{ text: "Remarks" }] },
        { id: "actions", header: [{ text: "Actions" }] },
      ],
      autoWidth: true,
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

    if(this.toolbar) {
      this.toolbar.destructor();
    }
  }

}
