import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from 'app/authentication/page404/page404.component';
import {CalendarDashboardComponent} from './calendar-dashboard/calendar-dashboard.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: CalendarDashboardComponent,
  },

  {path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {
}
