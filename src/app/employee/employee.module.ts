import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {EmployeeRoutingModule} from './employee-routing.module';
import {SharedModule} from '@shared';
import {ComponentsModule} from '@shared/components/components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    DragDropModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [],
})
export class EmployeeModule {
}
