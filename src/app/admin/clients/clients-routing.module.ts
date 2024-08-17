import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from 'app/authentication/page404/page404.component';
import {ClientsBoardComponent} from './clients-board/clients-board.component';
import {ClientProjectsComponent} from './client-projects/client-projects.component';

const routes: Routes = [

  {
    path: "board",
    component: ClientsBoardComponent,
  },

  {
    path: "projects-client/:id",
    component: ClientProjectsComponent,
  },

  {path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {
}
