import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {Page500Component} from './page500/page500.component';
import {Page404Component} from './page404/page404.component';
import {SigninComponent} from './signin/signin.component';
import {LockedComponent} from './locked/locked.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    Page500Component,
    Page404Component,
    SigninComponent,
    LockedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    SharedModule,
  ],
})
export class AuthenticationModule {
}
