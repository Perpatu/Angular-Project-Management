import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainComponent} from './main/main.component';
import {SharedModule} from '@shared';
import {ComponentsModule} from '@shared/components/components.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgScrollbarModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class DashboardModule {
}
