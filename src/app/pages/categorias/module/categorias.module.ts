import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { ListarCategoriasComponent } from '../component/listar-categorias/listar-categorias.component';
import { CreateCategoriaComponent } from '../component/create-categoria/create-categoria.component';
import { EditCategoriaComponent } from '../component/edit-categoria/edit-categoria.component';

@NgModule({
  declarations: [
    ListarCategoriasComponent,
    CreateCategoriaComponent,
    EditCategoriaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriasRoutingModule,
    AngularMaterialModule,
  ],
})
export class CategoriasModule {}
