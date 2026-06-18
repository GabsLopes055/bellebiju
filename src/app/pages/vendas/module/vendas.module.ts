import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendasRoutingModule } from './vendas-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VendasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ]
})
export class VendasModule { }
