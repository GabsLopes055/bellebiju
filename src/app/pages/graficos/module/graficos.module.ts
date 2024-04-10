import { map } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficosRoutingModule } from './graficos-routing.module';
import { GraficosComponent } from '../component/graficos/graficos.component';


@NgModule({
  declarations: [
    // GraficosComponent
  ],
  imports: [
    CommonModule,
    GraficosRoutingModule
  ],
  exports: [
    // GraficosComponent
  ]
})
export class GraficosModule { }
