import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { MaintabComponent } from './maintab/maintab.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TimesheetAddComponent } from './timesheet-add/timesheet-add.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MaintabComponent,
    TimesheetComponent,
    WelcomeComponent,
    TimesheetAddComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
