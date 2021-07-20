import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-mat-datefilter',
  templateUrl: './mat-datefilter.component.html',
  styleUrls: ['./mat-datefilter.component.css']
})
export class MatDatefilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };
}
