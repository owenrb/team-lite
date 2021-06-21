import { Component, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Popup as PopupDHX } from "dhx-suite";
import { TimesheetAddComponent } from '../timesheet-add/timesheet-add.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnDestroy {
  @ViewChild("widget", { static: true })
  container: ElementRef | undefined;
  popup: PopupDHX | undefined;
  wait: Promise<void> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.popup = new PopupDHX();
    this.popup.attachHTML("<h1>title</h1>")
    this.popup.show(this.container?.nativeElement)
  }

  ngOnDestroy() {
    if (this.popup) {
      this.popup.destructor();
    }

  }
}
