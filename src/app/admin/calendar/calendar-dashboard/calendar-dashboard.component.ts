import {Component, OnInit} from '@angular/core';
import {CalendarOptions, EventChangeArg, EventClickArg,} from '@fullcalendar/core/';
import {SharedService} from '@core/service/shared.service';
import {Router} from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/pl';

@Component({
  selector: 'app-calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  styleUrls: ['./calendar-dashboard.component.sass']
})

export class CalendarDashboardComponent implements OnInit {
  calendarVisible = true;
  users: any;
  projectData: any;

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
    locale: esLocale,
    eventResizableFromStart: true,
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
    this.service.getProjectsBoard('Active',1000,1).subscribe((data: any) => {
      console.log(data.data)
      this.projectData = data.data.map((ev: any) => ({
        title: ev.number + ': ' + ev.client.name,
        project: ev.number,
        start: ev.start,
        end: ev.deadline,
        projectId: ev.id,
        status: ev.status,
        color: ev.client.color,
      }))
      this.calendarOptions.events = this.projectData;
    })
  }

  handleEventClick(event: EventClickArg) {
    const projectId = event["event"]._def.extendedProps.projectId;
    this.router.navigateByUrl('/admin/project-production/detail/' + projectId);
  }

  formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formatDate = `${year}-${month}-${day}`;
    return formatDate;
  }

  handleDateChangeEvent(event: EventChangeArg[]) {
    const projectId = event["event"]._def.extendedProps.projectId;
    const status = event["event"]._def.extendedProps.status;
    const start = this.formatDate(event["event"]._instance.range.start);
    const deadline = this.formatDate(event["event"]._instance.range.end);
    const value = {
      status: status,
      start: start,
      deadline: deadline
    };
    this.service.updateProject(projectId, value).subscribe();
  }
}
