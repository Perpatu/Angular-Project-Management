import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from 'app/authentication/page404/page404.component';
import {ProjectsProductionBoardComponent} from './projects-production-board/projects-production-board.component';
import {ProjectProductionDetailComponent} from './project-production-detail/project-production-detail.component';

const routes: Routes = [

  {
    path: "board",
    component: ProjectsProductionBoardComponent,
  },

  {
    path: "detail/:id",
    component: ProjectProductionDetailComponent,
  },

  {path: "**", component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsProductionRoutingModule {
}
