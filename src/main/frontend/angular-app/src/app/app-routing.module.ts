import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './timesheet/timesheet.component'
import { WelcomeComponent } from './welcome/welcome.component'

const routes: Routes = [ 
  {path: 'team/welcome', component: WelcomeComponent },
  {path: 'team/timesheet/:sheetId', component: TimesheetComponent },
  {path: '', redirectTo: '/team/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
