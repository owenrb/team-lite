import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MaintabComponent } from './maintab/maintab.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { MatTimesheetComponent } from './mat-timesheet/mat-timesheet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatTimesheetAddComponent } from './mat-timesheet-add/mat-timesheet-add.component';
import { MatTimesheetFormComponent } from './mat-timesheet-form/mat-timesheet-form.component';
import { DemoMaterialModule } from './material-module';
import { MatTimeComponent } from './mat-time/mat-time.component';
import { MatTimesheetEditComponent } from './mat-timesheet-edit/mat-timesheet-edit.component';
import { MatTimesheetCloneComponent } from './mat-timesheet-clone/mat-timesheet-clone.component';
import { MatTimesheetPageComponent } from './mat-timesheet-page/mat-timesheet-page.component'
import {DatePipe} from '@angular/common';
import { MatTimesheetDeleteComponent } from './mat-timesheet-delete/mat-timesheet-delete.component';
import { MatDatefilterComponent } from './mat-datefilter/mat-datefilter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MaintabComponent,
    TimesheetComponent,
    WelcomeComponent,
    TimesheetAddComponent,
    MatTimesheetComponent,
    MatTimesheetAddComponent,
    MatTimesheetFormComponent,
    MatTimeComponent,
    MatTimesheetEditComponent,
    MatTimesheetCloneComponent,
    MatTimesheetPageComponent,
    MatTimesheetDeleteComponent,
    MatDatefilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    DemoMaterialModule,
    NgxSliderModule,
    FlexLayoutModule
  ],
  providers: [
    DatePipe,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
   // { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMAT },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
