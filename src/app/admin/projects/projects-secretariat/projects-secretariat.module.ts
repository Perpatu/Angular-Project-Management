import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsSecretariatRoutingModule} from './projects-secretariat-routing.module';
import {ProjectsSecretariatBoardComponent} from './projects-secretariat-board/projects-secretariat-board.component';
import {ProjectSecretariatDetailComponent} from './project-secretariat-detail/project-secretariat-detail.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '@shared';
import {ComponentsModule} from '@shared/components/components.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ProjectEditComponent} from './project-edit/project-edit.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import {MatPaginatorModule} from '@angular/material/paginator';
import {NgScrollbarModule} from 'ngx-scrollbar';

@NgModule({
  declarations: [
    ProjectsSecretariatBoardComponent,
    ProjectSecretariatDetailComponent,
    ProjectEditComponent,
  ],
  imports: [
    CommonModule,
    ProjectsSecretariatRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatProgressBarModule,
    NgxExtendedPdfViewerModule,
    MatPaginatorModule,
    NgScrollbarModule
  ]
})
export class ProjectsSecretariatModule {
}
