import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentsRoutingModule} from './departments-routing.module';
import {DepartmentsManagementComponent} from './departments-management/departments-management.component';
import {DepartmentDetailComponent} from './department-detail/department-detail.component';
import {DepartmentAddComponent} from './departments-management/department-add/department-add.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '@shared';
import {ComponentsModule} from '@shared/components/components.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {DepartmentEditComponent} from './department-edit/department-edit.component';

@NgModule({
  declarations: [
    DepartmentsManagementComponent,
    DepartmentDetailComponent,
    DepartmentAddComponent,
    DepartmentEditComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule,
    MatSnackBarModule,
    MatCheckboxModule,
    NgxExtendedPdfViewerModule,
    MatPaginatorModule,
    NgScrollbarModule
  ]
})
export class DepartmentsModule {
}
