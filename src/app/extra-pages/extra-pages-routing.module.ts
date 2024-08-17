import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BlankComponent} from "./blank/blank.component";

const routes: Routes = [
  {
    path: "blank",
    component: BlankComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {
}
