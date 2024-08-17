import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersBoardComponent} from './users-board/users-board.component';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from '@shared';
import {ComponentsModule} from '@shared/components/components.module';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {UserCalendarComponent} from './user-calendar/user-calendar.component';
import {FullCalendarModule} from '@fullcalendar/angular';

@NgModule({
  declarations: [
    UsersBoardComponent,
    UserAddComponent,
    UserEditComponent,
    UserProfileComponent,
    UserCalendarComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    FullCalendarModule
  ]
})
export class UsersModule {
}
