import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from 'app/authentication/page404/page404.component';
import {ProjectSecretariatDetailComponent} from './project-secretariat-detail/project-secretariat-detail.component';
import {ProjectsSecretariatBoardComponent} from './projects-secretariat-board/projects-secretariat-board.component';

const routes: Routes = [

  {
    path: "board",
    component: ProjectsSecretariatBoardComponent,
  },

  {
    path: "detail/:id",
    component: ProjectSecretariatDetailComponent,
  },

  {path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsSecretariatRoutingModule {
}
