import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from 'app/authentication/page404/page404.component';
import {UsersBoardComponent} from './users-board/users-board.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserCalendarComponent} from './user-calendar/user-calendar.component';

const routes: Routes = [

  {
    path: "board",
    component: UsersBoardComponent,
  },

  {
    path: "calendar/:id",
    component: UserCalendarComponent,
  },

  {
    path: "profile-user/:id",
    component: UserProfileComponent,
  },

  {path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
