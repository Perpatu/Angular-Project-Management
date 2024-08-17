import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from 'app/authentication/page404/page404.component';
import {DepartmentsManagementComponent} from './departments-management/departments-management.component';
import {DepartmentDetailComponent} from './department-detail/department-detail.component';

const routes: Routes = [

  {
    path: "management",
    component: DepartmentsManagementComponent,
  },

  {
    path: "department-detail",
    component: DepartmentDetailComponent,
  },

  {path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule {
}
