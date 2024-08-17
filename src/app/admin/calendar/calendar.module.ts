import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarDashboardComponent} from './calendar-dashboard/calendar-dashboard.component';

import {FormsModule} from '@angular/forms';
import {FullCalendarModule} from '@fullcalendar/angular';

@NgModule({
  declarations: [
    CalendarDashboardComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    FullCalendarModule
  ]
})
export class CalendarModule {
}
