import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTimesheetPageComponent } from './mat-timesheet-page/mat-timesheet-page.component'
import { WelcomeComponent } from './welcome/welcome.component'

const routes: Routes = [ 
  {path: 'team/welcome', component: WelcomeComponent },
  {path: 'team/timesheet/:sheetId', component: MatTimesheetPageComponent },
  {path: '', redirectTo: '/team/welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
