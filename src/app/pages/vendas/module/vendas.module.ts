import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficosModule } from '../../graficos/module/graficos.module';
import { GraficosComponent } from '../../graficos/component/graficos/graficos.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VendasRoutingModule,
    ReactiveFormsModule,
  ]
})
export class VendasModule { }
