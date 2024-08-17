import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentsRoutingModule} from './departments-routing.module';
import {DepartmentDetailComponent} from './department-detail/department-detail.component';

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


@NgModule({
  declarations: [
    DepartmentDetailComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
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
