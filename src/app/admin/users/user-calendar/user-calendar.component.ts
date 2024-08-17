import {Component} from '@angular/core';
import {CalendarOptions, EventChangeArg, EventClickArg,} from '@fullcalendar/core/';
import {Router} from '@angular/router';
import {SharedService} from '@core/service/shared.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/pl';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent {

  calendarVisible = true;
  userId: string = this.router.url.split('/')[4];
  taskData: any = [];
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin
    ],
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'dayGridDay,dayGridWeek,dayGridMonth'
    },
    initialView: 'dayGridMonth',
    editable: true,
    events: [],
    themeSystem: 'bootstrap5',
    eventResizableFromStart: true,
    locale: esLocale,
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.handleDateChangeEvent.bind(this)
  };

  constructor(
    private service: SharedService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.service.getUserCalendar(this.userId).subscribe((data: any) => {
      this.taskData = data.map((ev: any) => ({
        title: ev.project.number + ': ' + ev.department.name + ': ' + ev.file.name,
        start: ev.planned_start_date,
        end: ev.planned_end_date,
        taskId: ev.id,
        departmentId: ev.department.id,
        departmentName: ev.department.name,
      }))
      this.calendarOptions.events = this.taskData;
    })
  }

  handleEventClick(event: EventClickArg) {
    const baseUrl = 'http://localhost:4200/#/admin/department/department-detail';
    const departmentId = event["event"]._def.extendedProps.departmentId;
    const departmentName = event["event"]._def.extendedProps.departmentName;
    const params = {
      dep_name: departmentName,
      dep_id: departmentId,
      status: 'Active'
    };
    const paramString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    const urlWithParams = `${baseUrl}?${paramString}`;
    window.open(urlWithParams, '_blank');
  }


  handleDateChangeEvent(event: EventChangeArg[]) {
    const taskId = event["event"]._def.extendedProps.taskId;
    const status = event["event"]._def.extendedProps.status;
    const planned_start_date = event["event"]._instance.range.start;
    const planned_end_date = event["event"]._instance.range.end;
    const value = {
      status: status,
      planned_start_date: planned_start_date,
      planned_end_date: planned_end_date
    };
    this.service.updateTask(taskId, value).subscribe();
  }
}




