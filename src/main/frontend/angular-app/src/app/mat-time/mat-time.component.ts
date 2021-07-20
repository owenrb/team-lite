import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-mat-time',
  templateUrl: './mat-time.component.html',
  styleUrls: ['./mat-time.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MatTimeComponent
    }
  ]
})
export class MatTimeComponent implements ControlValueAccessor {


  @Input()
  label: string = '';

  @Input()
  width: string = '60'

  value: number = 0.0;

  hours: string = '0'

  minutes: string = '0';

  onChange = (value: any) => { };

  onTouched = () => { };

  constructor() { }

  ngOnInit() { }


  init(): void {

    let hr = 0;
    let min = 0;
    if (this?.value) {
      let arr = (this.value + '').split('.');
      if (arr.length > 0)
        hr = +arr[0]
      if (arr.length > 1) {
        min = +arr[1]
      }
    }

    if (hr < 0)
      this.hours = '0';
    else if (hr > 8) {
      this.hours = '8';
    } else {
      this.hours = hr + ''
    }

    this.minutes = min + '';

    console.log('value: ' + this.value + '; hours: ' + hr + '; minutes: ' + min)
  }

  onTimeChange(): void {
    this.onChange(+(this.hours + '.' + this.minutes))
  }

  writeValue(value: number) {
    console.log('writeValue: ' + value)
    this.value = value

    if (value) {
      this.init()
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

}
