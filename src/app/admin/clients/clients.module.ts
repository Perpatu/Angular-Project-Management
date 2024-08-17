import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientsRoutingModule} from './clients-routing.module';
import {ClientsBoardComponent} from './clients-board/clients-board.component';
import {ClientProjectsComponent} from './client-projects/client-projects.component';
import {ClientAddComponent} from './client-add/client-add.component';
import {ClientEditComponent} from './client-edit/client-edit.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '@shared';
import {ComponentsModule} from '@shared/components/components.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {NgxColorsModule} from 'ngx-colors';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    ClientsBoardComponent,
    ClientProjectsComponent,
    ClientAddComponent,
    ClientEditComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxColorsModule
  ]
})
export class ClientsModule {
}
