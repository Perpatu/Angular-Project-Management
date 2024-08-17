import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports:
    [
      CommonModule,
      SharedModule,
      MatTableModule
    ],
  declarations: [],
})
export class LayoutModule {
}
