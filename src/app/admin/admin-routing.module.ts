import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },

  {
    path: "project-production",
    loadChildren: () =>
      import("./projects/projects-production/projects-production.module").then((m) => m.ProjectsProductionModule),
  },

  {
    path: "project-secretariat",
    loadChildren: () =>
      import("./projects/projects-secretariat/projects-secretariat.module").then((m) => m.ProjectsSecretariatModule),
  },

  {
    path: "department",
    loadChildren: () =>
      import("./departments/departments.module").then((m) => m.DepartmentsModule),
  },

  {
    path: "client",
    loadChildren: () =>
      import("./clients/clients.module").then((m) => m.ClientsModule),
  },

  {
    path: "user",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
  },

  {
    path: "calendar",
    loadChildren: () =>
      import("./calendar/calendar.module").then((m) => m.CalendarModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
