import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Options, LabelType, ChangeContext } from "@angular-slider/ngx-slider";
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateRange } from '../model/DateRange'

const DAYS_UNIT = (1000 * 60 * 60 * 24);

@Component({
  selector: 'app-mat-datefilter',
  templateUrl: './mat-datefilter.component.html',
  styleUrls: ['./mat-datefilter.component.css']
})
export class MatDatefilterComponent implements OnInit {

  @Input()
  startDate: string | null

  @Input()
  endDate: string | null

  dateFilterGroup
  minDate; maxDate;

  minValue: number;
  maxValue: number;
  options: Options


	@Output()
	dateRangeEvent = new EventEmitter<DateRange>();

  constructor(private datePipe: DatePipe) {

    this.minDate = new Date(new Date().getFullYear(), 0, 1);
    this.maxDate = new Date(new Date().getFullYear(), 11, 31);
    this.startDate = this.datePipe.transform(this.minDate, "yyyy-MM-dd")
    this.endDate = this.datePipe.transform(this.maxDate, "yyyy-MM-dd")

    var date = new Date();

    this.dateFilterGroup = new FormGroup({
      fromDate: new FormControl(date),
      toDate: new FormControl(date)
    })

    var duration = (this.maxDate.getTime() - this.minDate.getTime()) / DAYS_UNIT;
    var minMax = (date.getTime() - this.minDate.getTime()) / DAYS_UNIT;
    this.minValue = this.maxValue = minMax - 1;

    this.options = {
      floor: 0,
      ceil: duration,
      translate: (value: number, label: LabelType): string => {

        var date = new Date();
        date.setTime(this.minDate.getTime() + (value * DAYS_UNIT))
        var formatted = this.datePipe.transform(date, "yyyy-MM-dd");

        if (formatted)
          return formatted;

        return "Oppsss..."

      }
    };

  }

  ngOnInit(): void {
  }

  datePickerEvent(source: string, event: MatDatepickerInputEvent<Date>) {
    var date = event.value;
    if(!date)
      return;

    var num = +date;

    switch(source) {
      case 'start':
          var min = (num - this.minDate.getTime()) / DAYS_UNIT;
          this.minValue = min
        break;
      case 'end':
        var max = (num - this.minDate.getTime()) / DAYS_UNIT;
        this.maxValue = max
        break;
    }

    var range = new DateRange();
    range.from = this.addDays(this.minDate, this.minValue);
    range.to = this.addDays(this.minDate, this.maxValue);

    this.dateRangeEvent.emit(range);

  }

  private addDays(date: Date, days : number) : Date {

    var newDate = new Date();
    newDate.setTime(date.getTime() + (days * DAYS_UNIT))

    return newDate;
  }

  onSliderChange(changeContext : ChangeContext) {

    var min = new Date()
    min.setTime(this.minDate.getTime() + changeContext.value * DAYS_UNIT);
    this.dateFilterGroup.get('fromDate')?.setValue(min);

    var max = new Date()
    if(changeContext.highValue)
      max.setTime(this.minDate.getTime() + changeContext.highValue * DAYS_UNIT)
    this.dateFilterGroup.get('toDate')?.setValue(max);

    var range = new DateRange();
    range.from = min;
    range.to = max;

    this.dateRangeEvent.emit(range);
  }
}
