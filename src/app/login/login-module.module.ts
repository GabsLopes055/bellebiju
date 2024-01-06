import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModuleRoutingModule } from './login-module-routing.module';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModuleRoutingModule,
    AngularMaterialModule,

  ]
})
export class LoginModuleModule { }
