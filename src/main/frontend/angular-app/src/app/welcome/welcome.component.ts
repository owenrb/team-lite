import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateRange } from '../model/DateRange';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  filterFrom: string | null = null;
  filterTo: string | null = null;

  constructor(private datePipe: DatePipe) {
    var today = new Date();
    this.filterFrom = this.datePipe.transform(today, "yyyy-MM-dd");
    this.filterTo = this.datePipe.transform(today, "yyyy-MM-dd");
   }

  ngOnInit(): void {
  }

  onAddEvent(status: string): void {
    console.log('received: ' + status)
  }

  onDateRangeChanged(range : DateRange) {
    this.filterFrom = this.datePipe.transform(range.from, "yyyy-MM-dd");
    this.filterTo = this.datePipe.transform(range.to, "yyyy-MM-dd");
  }

}
