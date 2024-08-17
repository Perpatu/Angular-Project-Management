import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsProductionRoutingModule} from './projects-production-routing.module';
import {ProjectsProductionBoardComponent} from './projects-production-board/projects-production-board.component';
import {ProjectProductionDetailComponent} from './project-production-detail/project-production-detail.component';
import {ProjectAddComponent} from './project-add/project-add.component';
import {ProjectProductionEditComponent} from './project-production-edit/project-production-edit.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '@shared';
import {ComponentsModule} from '@shared/components/components.module';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {AddTaskComponent} from './add-task/add-task.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {ManageTaskComponent} from './manage-task/manage-task.component';


@NgModule({
  declarations: [
    ProjectsProductionBoardComponent,
    ProjectProductionDetailComponent,
    ProjectAddComponent,
    ProjectProductionEditComponent,
    AddTaskComponent,
    ManageTaskComponent
  ],
  imports: [
    CommonModule,
    ProjectsProductionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCheckboxModule,
    NgxExtendedPdfViewerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDatepickerModule,
    NgScrollbarModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ]
})
export class ProjectsProductionModule {
}
